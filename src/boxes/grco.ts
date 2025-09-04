// src/boxes/grco.ts
import type { MultiBufferStream } from '#/buffer';
import { ContainerBox } from '#/containerBox';

export class grcoBox extends ContainerBox {
  static override readonly fourcc = 'grco' as const;
  box_name = 'GroupContainerBox' as const;
  subBoxNames = ['grup'] as const;

  num_groups!: number;

  parse(stream: MultiBufferStream) {
    this.num_groups = stream.readUint16();
    // Parse child grup boxes
    super.parse(stream);
  }
}