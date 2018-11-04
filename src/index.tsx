import * as React from 'react';
import { isFunction, cloneDeep, debounce } from 'lodash';
import {
  Props,
  State,
  DefaultProps,
  ProcessedImage,
  PropsWithDefaults
} from './interfaces';
import { getRowHeight, updateProcessedImageList } from './utils';

class JustifiedGrid extends React.Component<Props, State> {
  private wrapperEl: HTMLDivElement | null;
  public static defaultProps: DefaultProps = {
    gutter: 1,
    rows: 3,
    maxRowHeight: 100
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      images: [],
      gridHeight: 0
    };
  }
  debounceResizeHandler = ():void => {
    debounce(this.handleWindowResize, 300);
  }
  handleWindowResize = ():void => {
    this.sync();
  };
  componentDidMount() {
    this.sync();

    window.addEventListener('resize', this.debounceResizeHandler);
  }
  componentDidUpdate() {
    this.sync();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceResizeHandler);
  }
  process(): ProcessedImage[] {
    const { gutter, images, rows, maxRowHeight } = this
      .props as PropsWithDefaults;
    const rowWidth = this.wrapperEl ? this.wrapperEl.offsetWidth : 0;
    let imageList = cloneDeep(images);
    let processedImageList: ProcessedImage[] = [];
    let rowIndex = 0;
    let currentHeight: number = 0;

    while (imageList.length > 0 && rows > rowIndex) {
      let height: number = 0;
      let isFulfilled: boolean = false;
      let offset: number = 0;
      imageList.some(() => {
        const selectedImages = imageList.slice(0, offset + 1);
        height = getRowHeight(selectedImages, rowWidth, gutter);
        isFulfilled = height < maxRowHeight;
        if (!isFulfilled) {
          offset += 1;
          return false;
        }
        processedImageList = updateProcessedImageList(
          processedImageList,
          selectedImages,
          height,
          currentHeight,
          rowIndex,
          gutter
        );
        currentHeight += height + gutter;
        return true;
      });

      if (!isFulfilled) {
        return processedImageList;
      }

      imageList = cloneDeep(images).slice(processedImageList.length);
      rowIndex += 1;
    }

    return processedImageList;
  }
  sync() {
    const images: ProcessedImage[] = this.process();
    const lastImage: ProcessedImage = images[images.length - 1];
    const gridHeight: number = lastImage.top + lastImage.height;

    this.setState({ images, gridHeight });
  }
  render() {
    const { images, gridHeight } = this.state;
    const { images: originalImages, maxRowHeight, children, ...otherProps } = this.props;

    if (isFunction(children)) {
      return (
        <div
          ref={el => (this.wrapperEl = el)}
          style={{ position: 'relative', height: gridHeight }}
          {...otherProps}>
          {children(images)}
        </div>
      );
    }

    return (
      <div
        ref={el => (this.wrapperEl = el)}
        style={{ position: 'relative', height: gridHeight }}
        {...otherProps}>
        {images.map((image: ProcessedImage, i) => {
          return (
            <div
              key={i}
              data-offset={i}
              data-row-offset={image.rowOffset}
              style={{
                position: 'absolute',
                top: image.top,
                left: image.left
              }}>
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default JustifiedGrid;
