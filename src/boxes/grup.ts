// src/boxes/grup.ts
import type { MultiBufferStream } from '#/buffer';
import { FullBox } from '#/box';

export class grupBox extends FullBox {
    static override readonly fourcc = 'grup' as const;
    box_name = 'GroupBox' as const;

    group_ID!: number;
    num_elements!: number;
    element_ID!: number[];
    group_activation_mode!: number;
    group_activation_elements_number?: number;
    group_reference_volume_raw!: number; // int16 (8.8 fixed)
    group_name!: string;
    group_description!: string;

    get group_reference_volume() { return this.group_reference_volume_raw / 256; }

    parse(stream: MultiBufferStream) {
        this.parseFullHeader(stream);
        this.group_ID = stream.readUint32();
        this.num_elements = stream.readUint16();
        this.element_ID = Array.from({ length: this.num_elements }, () => stream.readUint32());
        this.group_activation_mode = stream.readUint8();
        if (this.group_activation_mode === 2) {
            this.group_activation_elements_number = stream.readUint16();
        }
        this.group_reference_volume_raw = stream.readInt16();
        this.group_name = stream.readCString();
        this.group_description = stream.readCString();
    }
}
