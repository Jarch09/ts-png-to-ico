import sizeOf from 'image-size';
import * as jimp from 'jimp';

type ResizeOptions =
  | {
      width: number;
      height?: number;
    }
  | {
      width?: number;
      height: number;
    }
  | {
      width: number;
      height: number;
    };

/**
 * Resize the provided PNG image buffer
 *
 * @param imageBuffer   PNG image buffer
 * @param options       Resize options { width?: number, height?: number }
 * @returns             Promise<Image Buffer>
 */
export async function resizePng(
  imageBuffer: Buffer,
  options: ResizeOptions
): Promise<Buffer> {
  const image = await jimp.read(imageBuffer);

  if (typeof options.width !== 'number') {
    options.width = Math.trunc(
      image.bitmap.width * ((options.height as number) / image.bitmap.height)
    );
  }
  if (typeof options.height !== 'number') {
    options.height = Math.trunc(
      image.bitmap.height * (options.width / image.bitmap.width)
    );
  }

  return image
    .resize(options.width, options.height)
    .getBufferAsync(jimp.MIME_PNG);
}

/**
 * This method performs the following steps:
 * 1) Iterate through provided images and select the biggest one
 * 2) Then copy & resize the largest image (from step 1) to match all standard sizes
 *
 * @param images     Array of PNG image buffers
 * @param imageSizes List of standard image sizes
 * @returns          Promise<Image Buffer[]>
 */
export async function resizeLargestPng(
  images: Buffer[],
  imageSizes: number[]
): Promise<Buffer[]> {
  // get current sizing for array of image buffers & reduce to largest image
  const largestImage = images
    .map((i) => {
      const { width, height } = sizeOf(i);

      return {
        image: i,
        width,
        height,
      };
    })
    .reduce(
      (a, b) => {
        if (typeof a.width !== 'number') {
          return b;
        }
        if (typeof b.width !== 'number') {
          return a;
        }
        if (a.width > b.width) {
          return a;
        } else {
          return b;
        }
      },
      { width: 0, height: 0, image: Buffer.alloc(0) }
    );

  // now resize the remaining largest image (identified above)
  return Promise.all(
    imageSizes
      .filter((s) => s <= (largestImage.width as number))
      .map((targetSize) => {
        return resizePng(largestImage.image, {
          width: targetSize,
          height: targetSize,
        });
      })
  );
}
