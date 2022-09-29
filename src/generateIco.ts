import { PNGWithMetadata } from './types';

// See ICO image format notes here:
// https://en.wikipedia.org/wiki/ICO_(file_format)
//
// ICO consists of header + 1 directory per image +
// the underlying image(s) - these are either device-independent bitmaps (DIB)
// or PNG
//
// Other reference on data schema:
// https://gist.github.com/TheVice/e5b39ee9e6249015d2594da4b4a31872

const icoHeaderSize = 6;
const icodirectorySize = 16;
const dibHeaderSize = 40;

// directly from the ICO specification (see link above)
const createICONDIR = (numImages: number): Buffer => {
  const buf = Buffer.alloc(icoHeaderSize);

  buf.writeUInt16LE(0, 0); // must always be 0
  buf.writeUInt16LE(1, 2); // 1 means ICO file
  buf.writeUInt16LE(numImages, 4);

  return buf;
};

// directly from the ICO specification (see link above)
const createICONDIRENTRY = (png: PNGWithMetadata, offset: number): Buffer => {
  const buf = Buffer.alloc(icodirectorySize);

  // width, height ust be <= 255
  const width = png.image.width == 256 ? 0 : png.image.width;
  const height = png.image.height == 256 ? 0 : png.image.height;
  const bpp = png.metadata.bpp * 8;
  const size = png.image.data.length + dibHeaderSize;

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

// Create the DIB info header
const createDIBInfoHeader = (png: PNGWithMetadata): Buffer => {
  const buf = Buffer.alloc(dibHeaderSize);

  buf.writeUInt32LE(dibHeaderSize, 0);
  buf.writeInt32LE(png.image.width, 4);
  buf.writeInt32LE(png.image.height * 2, 8);
  buf.writeUInt16LE(1, 12);
  buf.writeUInt16LE(png.metadata.bpp * 8, 14);
  buf.writeUInt32LE(0, 16);
  buf.writeUInt32LE(png.image.data.length, 20);
  buf.writeInt32LE(0, 24);
  buf.writeInt32LE(0, 28);
  buf.writeUInt32LE(0, 32);
  buf.writeUInt32LE(0, 36);

  return buf;
};

// Store image pixel array
const createDIBPixelArray = (png: PNGWithMetadata): Buffer => {
  const bpp = png.metadata.bpp;
  const numCols = png.image.width * bpp;
  const numRows = png.image.height * numCols;
  const end = numRows - numCols;

  const buf = Buffer.alloc(png.image.data.length);

  for (let r = 0; r < numRows; r += numCols) {
    for (let c = 0; c < numCols; c += bpp) {
      let pos = r + c;

      const red = png.image.data.readUint8(pos);
      const green = png.image.data.readUint8(pos + 1);
      const blue = png.image.data.readUint8(pos + 2);
      const alpha = png.image.data.readUint8(pos + 3);

      pos = end - r + c;

      buf.writeUint8(blue, pos);
      buf.writeUint8(green, pos + 1);
      buf.writeUint8(red, pos + 2);
      buf.writeUint8(alpha, pos + 3);
    }
  }

  return buf;
};

/**
 * Generate an ICO buffer from the provided list of PNGs
 *
 * @param pngs   provided list of PNGs
 * @returns      ICO image buffer
 */
export function generateIcoFromPNGs(pngs: PNGWithMetadata[]): Buffer {
  const numImages = pngs.length;

  // create ICO header
  const header = createICONDIR(numImages);
  const bufArray = [header];

  let len = header.length;
  let offset = icoHeaderSize + icodirectorySize * numImages;

  // create ICO directory for each image
  for (let i = 0; i < numImages; i++) {
    const png = pngs[i];
    const icoDir = createICONDIRENTRY(png, offset);
    bufArray.push(icoDir);

    len += icoDir.length;
    offset += png.image.data.length + dibHeaderSize;
  }

  // create info header & pixel map for each image
  for (let i = 0; i < numImages; i++) {
    const png = pngs[i];

    const infoHeader = createDIBInfoHeader(png);
    const pixelArray = createDIBPixelArray(png);
    bufArray.push(infoHeader, pixelArray);

    len += infoHeader.length + pixelArray.length;
  }

  return Buffer.concat(bufArray, len);
}
