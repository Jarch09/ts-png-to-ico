import { expect, test } from '@jest/globals';

import { parseAllBuffersToPngs, parseBufferToPng } from './parsePng';
import { getTestImage16x16, getTestImage24x24 } from './testUtils';
import { ColorType } from './types';

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

test('parseAllBuffersToPngs', async () => {
  expect.assertions(5);

  const testData = [getTestImage16x16(), getTestImage24x24()];

  return parseAllBuffersToPngs(testData).then((pngs) => {
    expect(pngs.length).toBe(2);
    expect(pngs[0].image.height).toBe(16);
    expect(pngs[0].image.width).toBe(16);

    expect(pngs[1].image.height).toBe(24);
    expect(pngs[1].image.width).toBe(24);
  });
});
