// src/imaf/builders.ts
import type { ISOFile } from '#/isofile';
import { metaBox } from '#/boxes/meta';
import { moovBox, trakBox } from '#/boxes/defaults';
import type { Box } from '#/box';

/**
 * Add a file-level Meta box (album-level MPEG-7).
 * We just append it as a top-level box; writers preserve order.
 */
export function addFileLevelMeta(file: ISOFile & { boxes: Array<Box> }, mpeg7Xml: string): void {
  const m = new metaBox();
  m.setMpeg7(mpeg7Xml, 'Album');
  file.boxes.push(m);
}

/**
 * Add a movie-level Meta box (song-level MPEG-7) inside moov.
 */
export function addMovieLevelMeta(moov: moovBox, mpeg7Xml: string): void {
  const m = new metaBox();
  m.setMpeg7(mpeg7Xml, 'Song');
  moov.metas.push(m);
}

/**
 * Add a track-level Meta box (track-level MPEG-7) inside trak.
 */
export function addTrackLevelMeta(trak: trakBox, mpeg7Xml: string): void {
  const m = new metaBox();
  m.setMpeg7(mpeg7Xml, 'Track');
  trak.metas.push(m);
}
