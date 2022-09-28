import { generateIcoFromPNGs } from './generateIco';
import { parseAllBuffersToPngs } from './parsePng';
import { resizeLargestPng } from './resizePng';

interface Options {
  /**
   * Should the images be resized? (true = YES)
   */
  readonly resize: boolean;
  /**
   * Standard size options (in pixels)
   */
  readonly sizes: number[];
}
type PartialOptions = { [P in keyof Options]?: Options[P] };

// default image sizes (in pixels)
const defaultSizes = [16, 24, 32, 48, 64, 128, 256];

/**
 * Tranform 1 or more PNG buffers into an ICO file
 *
 * @param imageBuffers  one or multiple image buffers
 * @param options       resizing options
 * @returns             Promise<Buffer> - buffered ICO file
 */
export async function generateIco(
  imageBuffers: Buffer | Buffer[],
  options: PartialOptions = {}
): Promise<Buffer> {
  let images: Buffer[];

  // structure images as array
  if (Array.isArray(imageBuffers)) {
    images = imageBuffers;
  } else {
    images = [imageBuffers];
  }

  // get options
  const opts: Options = { resize: false, sizes: defaultSizes, ...options };

  // resize images first, then make ICO
  if (opts.resize) {
    return resizeLargestPng(images, opts.sizes)
      .then(parseAllBuffersToPngs)
      .then(generateIcoFromPNGs);
  }

  // make ICO directly
  return parseAllBuffersToPngs(images).then(generateIcoFromPNGs);
}

export default generateIco;
