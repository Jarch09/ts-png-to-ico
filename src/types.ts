import { PNG } from 'pngjs';

// ColorType - see here for more info:
// https://www.w3.org/TR/PNG-Chunks.html
export enum ColorType {
  // Grayscale - each pixel is a grayscale sample
  Grayscale = 0,
  // RGB - each pixel is a R,G,B triple
  RGB = 2,
  // PaletteIndex - each pixel is a palette index
  PaletteIndex = 3,
  // GrayscaleAlpha - each pixel is a grayscale sample, followed by an alpha sample
  GrayscaleAlpha = 4,
  // RGBAlpha - each pixel is an R,G,B triple followed by an alpha sample
  RGBAlpha = 6,
}

// PNGMetadata - PNG metadata
export interface PNGMetadata {
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  readonly interlace: boolean;
  // Color - is it RGB color type?
  readonly color: boolean;
  // Alpha - is it GrayscaleAlpha color type?
  readonly alpha: boolean;
  // Bits per pixel
  readonly bpp: number;
  // Type of color
  readonly colorType: ColorType;
}

// PNGWithMetadata - png image with accompanying metadata
export interface PNGWithMetadata {
  image: PNG;
  metadata: PNGMetadata;
}
