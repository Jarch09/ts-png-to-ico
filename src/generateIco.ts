import { PNGWithMetadata } from './types';

// See ICO image format notes here:
// https://en.wikipedia.org/wiki/ICO_(file_format)

const headerSize = 6;
const directorySize = 16;

const bitMapSize = 40;
const colorMode = 0;

// directly from the ICO specification (see link above)
const createHeader = (numImages: number) => {
  const buf = Buffer.alloc(headerSize);

  buf.writeUInt16LE(0, 0); // must always be 0
  buf.writeUInt16LE(1, 2); // 1 means ICO file
  buf.writeUInt16LE(numImages, 4);

  return buf;
};

// directly from the ICO specification (see link above)
const createDirectory = (png: PNGWithMetadata, offset: number) => {
  const buf = Buffer.alloc(directorySize);

  // Must be <= 255
  const width = png.image.width == 256 ? 0 : png.image.width;
  const height = png.image.height == 256 ? 0 : png.image.height;
  const bpp = png.metadata.bpp * 8;
  const size = png.image.data.length + bitMapSize;

  // const bpp = png.

  buf.writeUInt8(width, 0);
  buf.writeUInt8(height, 1);
  buf.writeUInt8(0, 2); // color palette
  buf.writeUInt8(0, 3); // should always be 0
  buf.writeUInt16LE(1, 4);
  buf.writeUInt16LE(bpp, 6);
  buf.writeUInt32LE(size, 8);
  buf.writeUInt32LE(offset, 12);

  return buf;
};

const createBitmap = (png: PNGWithMetadata, compression) => {
  const buf = bufferAlloc(bitmapSize);

  buf.writeUInt32LE(constants.bitmapSize, 0);
  buf.writeInt32LE(data.width, 4);
  buf.writeInt32LE(data.height * 2, 8);
  buf.writeUInt16LE(1, 12);
  buf.writeUInt16LE(data.bpp * 8, 14);
  buf.writeUInt32LE(compression, 16);
  buf.writeUInt32LE(data.data.length, 20);
  buf.writeInt32LE(0, 24);
  buf.writeInt32LE(0, 28);
  buf.writeUInt32LE(0, 32);
  buf.writeUInt32LE(0, 36);

  return buf;
};

export async function generateIcoFromPNG(png: PNG);
