// src/boxes/grco.ts
import { ContainerBox } from '#/containerBox';
import { grupBox } from '#/boxes/grup';

export class grcoBox extends ContainerBox {
  static override readonly fourcc = 'grco' as const;
  box_name = 'GroupContainerBox' as const;
  // children: one or more 'grup' boxes
  // ContainerBox.parse already handles children; set subBoxNames:
  grups?: Array<grupBox>;
  subBoxNames = ['grup'] as const;
}
