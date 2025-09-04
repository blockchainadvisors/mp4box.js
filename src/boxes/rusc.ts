// src/boxes/rusc.ts
import type { MultiBufferStream } from '#/buffer';
import { FullBox } from '#/box';

export class ruscBox extends FullBox {
  static override readonly fourcc = 'rusc' as const;
  box_name = 'SelectionRuleBox' as const;

  selection_rule_ID!: number;
  selection_rule_type!: number; // 0..3
  element_ID!: number;
  min_num_elements?: number;
  max_num_elements?: number;
  key_element_ID?: number;
  selection_rule_description!: string;

  parse(stream: MultiBufferStream) {
    this.parseFullHeader(stream);
    this.selection_rule_ID = stream.readUint16();
    this.selection_rule_type = stream.readUint8();
    this.element_ID = stream.readUint32();
    if (this.selection_rule_type === 0) {
      this.min_num_elements = stream.readUint16();
      this.max_num_elements = stream.readUint16();
    } else if (this.selection_rule_type === 1 || this.selection_rule_type === 3) {
      this.key_element_ID = stream.readUint32();
    }
    this.selection_rule_description = stream.readCString();
  }
}
