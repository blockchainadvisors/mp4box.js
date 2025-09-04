// src/boxes/prco.ts
import { ContainerBox } from '#/containerBox';
import { prstBox } from '#/boxes/prst';

export class prcoBox extends ContainerBox {
  static override readonly fourcc = 'prco' as const;
  box_name = 'PresetContainerBox' as const;
  prsts?: Array<prstBox>;
  subBoxNames = ['prst'] as const;
}
