# react-justified-grid

> Grid layout which keeps proportion of all images. 

This library helps you to make layout like Google Photos easily. 

[![NPM](https://img.shields.io/npm/v/react-justified-grid.svg)](https://www.npmjs.com/package/react-justified-grid)
[![Travis](https://travis-ci.org/josephj/react-justified-grid.svg?branch=master)](https://travis-ci.org/josephj/react-justified-grid.svg?branch=master)

Storybook - [https://josephj.github.io/react-justified-grid/](https://josephj.github.io/react-justified-grid/)

![Example](https://cdn-std.dprcdn.net/files/acc_139047/sqkEbI)

## Install

npm
```bash
npm install --save react-justified-grid
```

yarn
```bash
yarn add react-justified-grid
```
## Usage

Firstly, you need to provide an image list with dimension provided.

```js
const imageList = [{
  src: 'https://scontent.cdninstagram.com/vp/3fc240dca41408d36cc23f504fe1174e/5C66EC32/t51.2885-15/e35/s320x320/43817886_246662336018913_6991265436514516630_n.jpg',
  width: 320,
  height: 320
}, {
  src: 'https://scontent.cdninstagram.com/vp/f1d729fe57fa4ddc7c18fa346609cdb8/5C838862/t51.2885-15/e35/s320x320/44348158_2491449144206376_3633417851169311676_n.jpg',
  width: 320,
  height: 167
}, {
  src: 'https://scontent.cdninstagram.com/vp/b0f56148b7f7d06ff186a51853888b2f/5C84ACC0/t51.2885-15/e35/s320x320/44724241_2191160064490130_1438494317224719529_n.jpg',
  width: 320,
  height: 240
}, {
  src: 'https://scontent.cdninstagram.com/vp/dcda7878c4a828f0c850b73dc5c6587d/5C728976/t51.2885-15/e35/p320x320/43158355_534503580355624_1875160473904621159_n.jpg',
  width: 320,
  height: 400
}];
```

### Basic

```jsx
import React, {Component} from 'react'
import JustifiedGrid from 'react-justified-grid'

class MyImageGallery extends Component {
  return (
    <JustifiedGrid
      images={images}
      rows={3}
      maxRowHeight={64}
      gutter={1}/>
  );
}
```

### Advanced

You can use ✨ **render props** ✨ (a.k.a children as function) to customize according to your needs.

```jsx
import React, {Component, Fragement} from 'react';
import Link from 'react-router-dom';
import JustifiedGrid from 'react-justified-grid';

class MyImageGallery extends Component {
  render () {
    return (
      <JustifiedGrid images={images} rows={3} maxRowHeight={64}>
        {processedImages => {
          return (
            <Fragement>
              {processedImages.map(image => {
                const { src, width, height, left, top, originalData } = image;
                return (
                  <Link to={originalData.linkUrl}>
                    <img src={src} width={width} height={height} />
                  </Link>
                );
              })}
            </Fragement>
          );
        }}
      </JustifiedGrid>
    )
  }
}
```

## License

MIT © [josephj](https://github.com/josephj)
