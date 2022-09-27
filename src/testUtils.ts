const fs = require('fs');
const path = require('path');

const PROJECT_DIR = path.join(__dirname, '/../');
const TEST_IMAGES_DIR = path.join(PROJECT_DIR, 'test-images/');

const TEST_IMAGE_16 = path.join(TEST_IMAGES_DIR, '16x16.png');
const TEST_IMAGE_24 = path.join(TEST_IMAGES_DIR, '24x24.png');
const TEST_IMAGE_32 = path.join(TEST_IMAGES_DIR, '32x32.png');
const TEST_IMAGE_48 = path.join(TEST_IMAGES_DIR, '48x48.png');
const TEST_IMAGE_64 = path.join(TEST_IMAGES_DIR, '64x64.png');
const TEST_IMAGE_128 = path.join(TEST_IMAGES_DIR, '128x128.png');
const TEST_IMAGE_256 = path.join(TEST_IMAGES_DIR, '256x256.png');

export const getTestImage16x16 = (): Buffer => fs.readFileSync(TEST_IMAGE_16);
export const getTestImage24x24 = (): Buffer => fs.readFileSync(TEST_IMAGE_24);
export const getTestImage32x32 = (): Buffer => fs.readFileSync(TEST_IMAGE_32);
export const getTestImage48x48 = (): Buffer => fs.readFileSync(TEST_IMAGE_48);
export const getTestImage64x64 = (): Buffer => fs.readFileSync(TEST_IMAGE_64);
export const getTestImage128x128 = (): Buffer =>
  fs.readFileSync(TEST_IMAGE_128);
export const getTestImage256x256 = (): Buffer =>
  fs.readFileSync(TEST_IMAGE_256);
