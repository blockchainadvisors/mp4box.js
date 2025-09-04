// src/boxes/rumx.ts
import type { MultiBufferStream } from '#/buffer';
import { FullBox } from '#/box';

export class rumxBox extends FullBox {
  static override readonly fourcc = 'rumx' as const;
  box_name = 'MixingRuleBox' as const;

  mixing_rule_ID!: number;
  mixing_rule_type!: number; // 0..3
  element_ID!: number;
  min_volume_raw?: number; // int16 (8.8)
  max_volume_raw?: number; // int16 (8.8)
  key_element_ID?: number;
  mixing_rule_description!: string;

  get min_volume() { return this.min_volume_raw! / 256; }
  get max_volume() { return this.max_volume_raw! / 256; }

  parse(stream: MultiBufferStream) {
    this.parseFullHeader(stream);
    this.mixing_rule_ID = stream.readUint16();
    this.mixing_rule_type = stream.readUint8();
    this.element_ID = stream.readUint32();
    if (this.mixing_rule_type === 3) { // LIMITS
      this.min_volume_raw = stream.readInt16();
      this.max_volume_raw = stream.readInt16();
    } else {
      this.key_element_ID = stream.readUint32();
    }
    this.mixing_rule_description = stream.readCString();
  }
}