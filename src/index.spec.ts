import { describe, expect, test } from '@jest/globals';
import * as FileType from 'file-type';

import generateIco from './index';
import {
  getTestImage24x24,
  getTestImage32x32,
  getTestImage64x64,
} from './testUtils';

describe('generateIco', () => {
  test('input = 1 image buffer', async () => {
    expect.assertions(1);

    return generateIco(getTestImage64x64()).then(async (ico) => {
      expect(await FileType.fromBuffer(ico)).toEqual({
        ext: 'ico',
        mime: 'image/x-icon',
      });
    });
  });

  test('input = 2 image buffers', async () => {
    expect.assertions(1);

    const images = [getTestImage24x24(), getTestImage32x32()];

    return generateIco(images).then(async (ico) => {
      expect(await FileType.fromBuffer(ico)).toEqual({
        ext: 'ico',
        mime: 'image/x-icon',
      });
    });
  });

  test('input = 3 image buffers', async () => {
    expect.assertions(1);

    const images = [
      getTestImage24x24(),
      getTestImage32x32(),
      getTestImage64x64(),
    ];

    return generateIco(images).then(async (ico) => {
      expect(await FileType.fromBuffer(ico)).toEqual({
        ext: 'ico',
        mime: 'image/x-icon',
      });
    });
  });

  test('input = 3 image buffers + resizing', async () => {
    expect.assertions(1);

    const images = [
      getTestImage24x24(),
      getTestImage32x32(),
      getTestImage64x64(),
    ];

    return generateIco(images, { resize: true, sizes: [10, 25, 50] }).then(
      async (ico) => {
        expect(await FileType.fromBuffer(ico)).toEqual({
          ext: 'ico',
          mime: 'image/x-icon',
        });
      }
    );
  });
});
