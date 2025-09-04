// src/boxes/prst.ts
import type { MultiBufferStream } from '#/buffer';
import { FullBox } from '#/box';

export class prstBox extends FullBox {
  static override readonly fourcc = 'prst' as const;
  box_name = 'PresetBox' as const;

  preset_ID!: number;
  num_preset_elements!: number;
  preset_element_ID!: number[];
  preset_type!: number; // 0=static track,1=static object,2=dynamic track,3=dynamic object
  preset_global_volume!: number; // quantised per spec

  static_track_volumes?: number[];

  num_input_channel?: number[];     // for object types
  output_channel_type?: number;     // 0/1/2 etc. per spec
  object_matrix?: number[][][];     // [elem][in][out] -> uint8

  updates?: { sample: number; volumes: number[] | number[][][] }[];

  preset_name!: string;

  parse(stream: MultiBufferStream) {
    this.parseFullHeader(stream);
    this.preset_ID = stream.readUint8();
    this.num_preset_elements = stream.readUint8();
    this.preset_element_ID = Array.from({ length: this.num_preset_elements }, () => stream.readUint32());
    this.preset_type = stream.readUint8();
    this.preset_global_volume = stream.readUint8();

    if (this.preset_type === 0) {
      this.static_track_volumes = Array.from({ length: this.num_preset_elements }, () => stream.readUint8());
    } else if (this.preset_type === 1) {
      this.num_input_channel = Array.from({ length: this.num_preset_elements }, () => stream.readUint8());
      this.output_channel_type = stream.readUint8();
      const num_out = this.resolveNumOut(this.output_channel_type);
      this.object_matrix = this.num_input_channel.map(nIn =>
        Array.from({ length: nIn }, () =>
          Array.from({ length: num_out }, () => stream.readUint8()),
        ),
      );
    } else if (this.preset_type === 2 || this.preset_type === 3) {
      const num_updates = stream.readUint16();
      const isObject = this.preset_type === 3;
      let num_out: number | undefined;

      if (isObject) {
        this.num_input_channel = Array.from({ length: this.num_preset_elements }, () => stream.readUint8());
        this.output_channel_type = stream.readUint8();
        num_out = this.resolveNumOut(this.output_channel_type);
      }

      this.updates = Array.from({ length: num_updates }, () => {
        const sample = stream.readUint16();
        if (!isObject) {
          const volumes = Array.from({ length: this.num_preset_elements }, () => stream.readUint8());
          return { sample, volumes };
        } else {
          const volumes = this.num_input_channel!.map(nIn =>
            Array.from({ length: nIn }, () =>
              Array.from({ length: num_out! }, () => stream.readUint8()),
            ),
          );
          return { sample, volumes };
        }
      });
    }

    this.preset_name = stream.readCString();
  }

  private resolveNumOut(outputChannelType?: number): number {
    // Simple mapping per common IMAF profiles; extend if you add more types.
    switch (outputChannelType) {
      case 0: return 1;
      case 1: return 2;
      case 2: return 5; // e.g. 5.0
      default: return 2;
    }
  }
}