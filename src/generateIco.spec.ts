import { describe, expect, test } from '@jest/globals';
import * as FileType from 'file-type';

import { generateIcoFromPNGs } from './generateIco';
import { parseBufferToPng } from './parsePng';
import {
  getTestImage16x16,
  getTestImage24x24,
  getTestImage32x32,
} from './testUtils';

describe('generateIcoFromPNGs', () => {
  test('single png', async () => {
    expect.assertions(1);

    const testImages = [getTestImage16x16()];

    return Promise.all(testImages.map(async (i) => await parseBufferToPng(i)))
      .then(generateIcoFromPNGs)
      .then(async (ico) => {
        expect(await FileType.fromBuffer(ico)).toEqual({
          ext: 'ico',
          mime: 'image/x-icon',
        });
      });
  });

  test('multiple pngs', async () => {
    expect.assertions(1);

    const testImages = [
      getTestImage16x16(),
      getTestImage24x24(),
      getTestImage32x32(),
    ];

    return Promise.all(testImages.map(async (i) => await parseBufferToPng(i)))
      .then(generateIcoFromPNGs)
      .then(async (ico) => {
        expect(await FileType.fromBuffer(ico)).toEqual({
          ext: 'ico',
          mime: 'image/x-icon',
        });
      });
  });
});
