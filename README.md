# react-google-photo-layout

Maybe react-fit-image-grid

> Rendering grid layout which keeps the ratio of all images, like the Google Photos.

[![NPM](https://img.shields.io/npm/v/react-google-photo-layout.svg)](https://www.npmjs.com/package/react-google-photo-layout) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-google-photo-layout
```

## Usage

Firstly, you need to provide an image list with dimension provided.

```js
const imageList = [{
  src: 'https://scontent.cdninstagram.com/vp/3fc240dca41408d36cc23f504fe1174e/5C66EC32/t51.2885-15/e35/s320x320/43817886_246662336018913_6991265436514516630_n.jpg',
  width: 320,
  height: 320,
  linkUrl: 'https://instagram.com'
}, {
  src: 'https://scontent.cdninstagram.com/vp/f1d729fe57fa4ddc7c18fa346609cdb8/5C838862/t51.2885-15/e35/s320x320/44348158_2491449144206376_3633417851169311676_n.jpg',
  width: 320,
  height: 167,
  linkUrl: 'https://instagram.com'
}, {
  src: 'https://scontent.cdninstagram.com/vp/b0f56148b7f7d06ff186a51853888b2f/5C84ACC0/t51.2885-15/e35/s320x320/44724241_2191160064490130_1438494317224719529_n.jpg',
  width: 320,
  height: 240,
  linkUrl: 'https://instagram.com'
}, {
  src: 'https://scontent.cdninstagram.com/vp/dcda7878c4a828f0c850b73dc5c6587d/5C728976/t51.2885-15/e35/p320x320/43158355_534503580355624_1875160473904621159_n.jpg',
  width: 320,
  height: 400,
  linkUrl: 'https://instagram.com'
}];
```

### Basic

```jsx
import React, {Component} from 'react'
import GooglePhotoLayout from 'react-google-photo-layout'

class ImageGallery extends Component {
  return (
    <GooglePhotoLayout
      imageList={imageList}
      numRows={3}
      maxRowHeight={64}
      gutterWidth={1}/>
  );
}
```

### Advanced

```jsx
import React, {Component} from 'react'
import GooglePhotoLayout from 'react-google-photo-layout'

class ImageGallery extends Component {
  render () {
    return (
      <GooglePhotoLayout imageList={imageList} numRows={3} maxRowHeight={64}>
        {(imageListWithViewport, metaData) => {
          const { totalHidden, totalUsed, totalUnused } = metaData;
          return (
            <React.Fragement>
              {imageListWithViewport.map((viewportData, sourceData) => {
                const { src, width, height, x, y } = viewportData;
                const { linkUrl } = sourceData;
                return (
                  <Link to={linkUrl}>
                    <img src={src} width={width} height={height} />
                  </Link>
                );
              })}
            </React.Fragment>
          );
        }}
      </GoolePhotoLayout>
    )
  }
}
```

## License

MIT © [josephj](https://github.com/josephj)
