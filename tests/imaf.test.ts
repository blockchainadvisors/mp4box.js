// tests/imaf.spec.ts
import { createFile } from '../entries/all';
import { isImaf } from '../src/utils/imaf';
import type { MP4BoxBuffer } from '../src/mp4boxbuffer'; // <-- important

function makeBox(type: string, payload: Uint8Array): Uint8Array {
  const size = 8 + payload.byteLength;
  const buf = new Uint8Array(size);
  const dv = new DataView(buf.buffer);
  dv.setUint32(0, size);
  buf[4] = type.charCodeAt(0);
  buf[5] = type.charCodeAt(1);
  buf[6] = type.charCodeAt(2);
  buf[7] = type.charCodeAt(3);
  buf.set(payload, 8);
  return buf;
}

it('parses IMAF containers if present', () => {
  // ftyp 'im01'
  const ftypPayload = new Uint8Array([
    0x69, 0x6d, 0x30, 0x31, 0x00, 0x00, 0x00, 0x00, 0x69, 0x6d, 0x30, 0x31,
  ]);
  const ftyp = makeBox('ftyp', ftypPayload);

  // moov → grco(0), prco(0,0), ruco(0,0)
  const grco = makeBox('grco', new Uint8Array([0x00, 0x00]));
  const prco = makeBox('prco', new Uint8Array([0x00, 0x00]));
  const ruco = makeBox('ruco', new Uint8Array([0x00, 0x00, 0x00, 0x00]));
  const moovPayload = new Uint8Array(grco.length + prco.length + ruco.length);
  moovPayload.set(grco, 0);
  moovPayload.set(prco, grco.length);
  moovPayload.set(ruco, grco.length + prco.length);
  const moov = makeBox('moov', moovPayload);

  // Concatenate
  const fileBuf = new Uint8Array(ftyp.length + moov.length);
  fileBuf.set(ftyp, 0);
  fileBuf.set(moov, ftyp.length);

  // MP4Box requires ArrayBuffer with a fileStart property
  const ab = fileBuf.buffer as MP4BoxBuffer;
  ab.fileStart = 0;

  const iso = createFile();
  iso.appendBuffer(ab);
  iso.flush();

  console.log('Brands:', iso.ftyp?.major_brand, iso.ftyp?.compatible_brands);
  console.log('grco box:', iso.moov?.grcos?.[0]);
  console.log('prco box:', iso.moov?.prcos?.[0]);
  console.log('ruco box:', iso.moov?.rucos?.[0]);

  expect(isImaf(iso)).toBe(true);
  expect(iso.moov?.grcos?.[0]?.num_groups).toBe(0);
  expect(iso.moov?.prcos?.[0]?.num_preset).toBe(0);
  expect(iso.moov?.rucos?.[0]?.num_selection_rules).toBe(0);
});
