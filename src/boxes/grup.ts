// src/boxes/grup.ts
import { FullBox } from '#/box';
import type { MultiBufferStream } from '#/buffer';

export class grupBox extends FullBox {
  static override readonly fourcc = 'grup' as const;
  box_name = 'GroupBox' as const;

  // IM AF fields (fill per spec):
  // group_id: number; activation_mode: number; reference_volume: number (8.8);
  // name?: string; description?: string;
  // elements: Array<{ is_group_ref: boolean; id: number }>; // track_ID or group_ID+flag

  parse(stream: MultiBufferStream) {
    this.parseFullHeader(stream);
    // TODO: parse fields per 23000-12
  }
  write(stream: MultiBufferStream) {
    // delete this after correct implementation
    this.parseFullHeader(stream);
    // TODO: write fields per 23000-12
  }
}
