# ts-png-to-ico

Convert PNG to ICO in memory.

This repo serves as a replacement for [https://github.com/kevva/to-ico](https://github.com/kevva/to-ico).


## Why this repo?

There are a bunch of other *PNG to ICO* tools and repos out there. Many of them, however, are woefully out of date and unmaintained. This is a modern TypeScript version with updated dependencies and full test coverage.


## Install

```
yarn add ts-png-to-ico
```


## Utilization

### Basic

```js
import fs from 'fs';
import pngToIco from 'ts-png-to-ico';

const pngBuf = fs.readFileSync('some-image.png');
const icoBuf = await pngToIco(pngBuf);

const icoFile = fs.writeFileSync('app.ico', icoBuf);
```

### Multiple Images

```js
import fs from 'fs';
import pngToIco from 'ts-png-to-ico';

const pngBuf = fs.readFileSync('some-image.png');
const smallerPngBuf = fs.readFileSync('smaller-image.png');
const icoBuf = await pngToIco([pngBuf, smallerPngBuf]);

const icoFile = fs.writeFileSync('app.ico', icoBuf);
```

### Options

- `resize` **boolean**: should inputted PNGs be resized?
- `sizes` **number[]**: list of valid image sizes

```js
import fs from 'fs';
import pngToIco from 'ts-png-to-ico';

const icoOptions = {
  resize: true,
  sizes: [20, 25, 100, 200],
}

const pngBuf = fs.readFileSync('some-image.png');
const icoBuf = await pngToIco(pngBuf, icoOptions);

const icoFile = fs.writeFileSync('app.ico', icoBuf);
```

## License

[MIT License](https://github.com/Jarch09/ts-png-to-ico/blob/main/LICENSE)
