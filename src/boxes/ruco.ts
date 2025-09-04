// src/boxes/ruco.ts
import { ContainerBox } from '#/containerBox';
import { ruscBox } from '#/boxes/rusc';
import { rumxBox } from '#/boxes/rumx';

export class rucoBox extends ContainerBox {
  static override readonly fourcc = 'ruco' as const;
  box_name = 'RuleContainerBox' as const;
  ruscs?: Array<ruscBox>;
  rumxs?: Array<rumxBox>;
  subBoxNames = ['rusc', 'rumx'] as const;
}
