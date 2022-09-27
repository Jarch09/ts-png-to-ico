import { describe, expect, test } from '@jest/globals';

import { parseBufferToPng } from './parsePng';
import { resizeLargestPng, resizePng } from './resizePng';
import {
  getTestImage16x16,
  getTestImage24x24,
  getTestImage128x128,
} from './testUtils';

describe('resizePng', () => {
  test('specify only target width', async () => {
    expect.assertions(2);

    const testData = getTestImage128x128();

    return resizePng(testData, { width: 100 })
      .then(parseBufferToPng)
      .then((png) => {
        expect(png.image.width).toBe(100);
        expect(png.image.height).toBe(100);
      });
  });

  test('specify only target height', async () => {
    expect.assertions(2);

    const testData = getTestImage128x128();

    return resizePng(testData, { height: 100 })
      .then(parseBufferToPng)
      .then((png) => {
        expect(png.image.width).toBe(100);
        expect(png.image.height).toBe(100);
      });
  });

  test('specify target width, height', async () => {
    expect.assertions(2);

    const testData = getTestImage128x128();

    return resizePng(testData, { width: 90, height: 100 })
      .then(parseBufferToPng)
      .then((png) => {
        expect(png.image.width).toBe(90);
        expect(png.image.height).toBe(100);
      });
  });
});

test('resizeLargestPng', async () => {
  expect.assertions(11);

  const testImages = [
    getTestImage16x16(),
    getTestImage128x128(),
    getTestImage24x24(),
    getTestImage16x16(),
  ];

  const sizes = [10, 20, 25, 50, 100, 150, 200];

  return resizeLargestPng(testImages, sizes)
    .then((bufs) =>
      Promise.all(bufs.map(async (b) => await parseBufferToPng(b)))
    )
    .then((pngs) => {
      expect(pngs.length).toBe(5);

      expect(pngs[0].image.width).toBe(10);
      expect(pngs[0].image.height).toBe(10);

      expect(pngs[1].image.width).toBe(20);
      expect(pngs[1].image.height).toBe(20);

      expect(pngs[2].image.width).toBe(25);
      expect(pngs[2].image.height).toBe(25);

      expect(pngs[3].image.width).toBe(50);
      expect(pngs[3].image.height).toBe(50);

      expect(pngs[4].image.width).toBe(100);
      expect(pngs[4].image.height).toBe(100);
    });
});
