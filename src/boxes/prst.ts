// src/boxes/prst.ts
import { FullBox } from '#/box';
import type { MultiBufferStream } from '#/buffer';

export class prstBox extends FullBox {
  static override readonly fourcc = 'prst' as const;
  box_name = 'PresetBox' as const;

  // IM AF fields (fill per spec):
  // preset_id: number; preset_type: number; // static/dynamic
  // elements: Array<{ id: number; is_group_ref: boolean; volume?: number /*8.8*/ }>;
  // name?: string;

  parse(stream: MultiBufferStream) {
    this.parseFullHeader(stream); /* TODO */
  }
  write(stream: MultiBufferStream) {
    // delete this after correct implementation
    this.parseFullHeader(stream);
    /* TODO */
  }
}
