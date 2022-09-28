import { PNG, PNGOptions } from 'pngjs';

import { PNGMetadata, PNGWithMetadata } from './types';

/**
 * Asynchronously parses buffered data to PNG
 *
 * @param buffer   Buffered data
 * @param options  PNG Options
 * @returns        Promise<PNGWithMetadata>
 */
export async function parseBufferToPng(
  buffer: Buffer,
  options?: PNGOptions
): Promise<PNGWithMetadata> {
  return new Promise((resolve, reject) => {
    const image = new PNG(options);
    let pngMetadata: PNGMetadata;

    image.on('metadata', (metadata: PNGMetadata) => {
      pngMetadata = metadata;
    });

    image.parse(buffer, (err: Error, data: PNG) => {
      if (err == null) {
        resolve({
          image,
          metadata: pngMetadata,
        });
      } else {
        reject(err);
      }
    });
  });
}

/**
 * Asynchronously parses buffered image data to PNGs
 *
 * @param buffers   Multiple image buffers
 * @param options   PNG Options
 * @returns         Promise<PNGWithMetadata[]>
 */
export async function parseAllBuffersToPngs(
  buffers: Buffer[],
  options?: PNGOptions
): Promise<PNGWithMetadata[]> {
  return Promise.all(
    buffers.map(async (b) => await parseBufferToPng(b, options))
  );
}
