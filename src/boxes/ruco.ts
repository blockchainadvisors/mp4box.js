// src/boxes/ruco.ts
import type { MultiBufferStream } from '#/buffer';
import { ContainerBox } from '#/containerBox';

export class rucoBox extends ContainerBox {
  static override readonly fourcc = 'ruco' as const;
  box_name = 'RuleContainerBox' as const;
  subBoxNames = ['rusc','rumx'] as const;

  num_selection_rules!: number;
  num_mixing_rules!: number;

  parse(stream: MultiBufferStream) {
    this.num_selection_rules = stream.readUint16();
    this.num_mixing_rules = stream.readUint16();
    super.parse(stream);
  }
}
