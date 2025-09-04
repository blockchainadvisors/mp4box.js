import type { MultiBufferStream } from '#/buffer';
import { ContainerBox } from '#/containerBox';

export class prcoBox extends ContainerBox {
    static override readonly fourcc = 'prco' as const;
    box_name = 'PresetContainerBox' as const;
    subBoxNames = ['prst'] as const;

    num_preset!: number;
    default_preset_ID!: number;

    parse(stream: MultiBufferStream) {
        this.num_preset = stream.readUint8();
        this.default_preset_ID = stream.readUint8();
        super.parse(stream);
    }
}
