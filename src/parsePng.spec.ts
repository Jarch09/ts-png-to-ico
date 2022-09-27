import { expect, test } from '@jest/globals';

import { ColorType, parseBufferToPng } from './parsePng';
import { getTestImage16x16 } from './testUtils';

test('parseBufferToPng', async () => {
  expect.assertions(4);

  const testData = getTestImage16x16();

  return parseBufferToPng(testData).then((png) => {
    expect(png.image.height).toBe(16);
    expect(png.image.width).toBe(16);
    expect(png.metadata.bpp).toBe(4);
    expect(png.metadata.colorType).toBe(ColorType.RGBAlpha);
  });
});
