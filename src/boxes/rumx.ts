// src/boxes/rumx.ts
import { FullBox } from '#/box';
import type { MultiBufferStream } from '#/buffer';

export class rumxBox extends FullBox {
  static override readonly fourcc = 'rumx' as const;
  box_name = 'MixingRuleBox' as const;

  // IM AF fields: upper/lower volume bounds, equivalence groups, limits, etc.

  parse(stream: MultiBufferStream) {
    this.parseFullHeader(stream); /* TODO */
  }
  write(stream: MultiBufferStream) {
    // delete this after correct implementation
    this.parseFullHeader(stream);
    /* TODO */
  }
}
