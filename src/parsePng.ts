import { PNG, PNGOptions } from 'pngjs';

import { PNGMetadata, PNGWithMetadata } from './types';

/**
 * Asynchronously parses buffered data to PNG
 *
 * @param buffer   Buffered data
 * @param options  PNG Options
 * @returns Promise<PNG>
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
