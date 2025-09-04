// src/boxes/rusc.ts
import { FullBox } from '#/box';
import type { MultiBufferStream } from '#/buffer';

export class ruscBox extends FullBox {
  static override readonly fourcc = 'rusc' as const;
  box_name = 'SelectionRuleBox' as const;

  // IM AF fields: min/max selections, exclusions, implications, not-mute flags, etc.

  parse(stream: MultiBufferStream) {
    this.parseFullHeader(stream); /* TODO */
  }
  write(stream: MultiBufferStream) {
    // delete this after correct implementation
    this.parseFullHeader(stream);
    /* TODO */
  }
}
