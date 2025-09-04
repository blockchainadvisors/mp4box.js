import type { ISOFile } from '#/isofile';

const IMAF_BRAND_RE = /^im(0[1-4]|1[12]|21)$/;

export function detectImafBrand(file: ISOFile): string | undefined {
  if (!file?.ftyp) return undefined;
  const brands = [file.ftyp.major_brand, ...(file.ftyp.compatible_brands || [])];
  const match = brands.find(b => IMAF_BRAND_RE.test(b));
  return match ?? undefined;
}

/** True if the file signals any IMAF brand in ftyp. */
export function isImaf(file: ISOFile): boolean {
  return detectImafBrand(file) !== undefined;
}
