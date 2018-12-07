import * as React from 'react';
import { assign, isEqual, isFunction, debounce } from 'lodash';
import {
  Props,
  State,
  DefaultProps,
  ProcessedImage,
  PropsWithDefaults
} from './interfaces';
import { curateImageList } from './utils';

class JustifiedGrid extends React.Component<Props, State> {
  private wrapperEl: HTMLDivElement | null;
  private debounceResizeHandler: any;
  static readonly displayName = 'JustifiedGrid';
  public static defaultProps: DefaultProps = {
    gutter: 1,
    rows: 3,
    maxRowHeight: 100,
    style: {},
    showIncompleteRow: false
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      images: [],
      gridHeight: 0
    };
    this.debounceResizeHandler = debounce(this.handleWindowResize, 300);
  }
  handleWindowResize = (): void => {
    this.sync();
  };
  componentDidMount() {
    this.sync();

    window.addEventListener('resize', this.debounceResizeHandler);
  }
  componentDidUpdate(prevProps: Props) {
    if (!isEqual(this.props, prevProps)) {
      this.sync();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceResizeHandler);
  }
  process(): ProcessedImage[] {
    const {
      gutter,
      images,
      rows,
      maxRowHeight,
      showIncompleteRow,
      width,
      style
    } = this.props as PropsWithDefaults;
    const wrapperWidth = (this.wrapperEl) ? this.wrapperEl.offsetWidth : 0;
    const rowWidth = width || wrapperWidth;
    return curateImageList(images, rowWidth, {
      gutter,
      rows,
      maxRowHeight,
      showIncompleteRow,
      style
    });
  }
  sync() {
    const images: ProcessedImage[] = this.process();

    if (!images.length) {
      this.setState({ images, gridHeight: 0 });
      return;
    }

    const lastImage: ProcessedImage = images[images.length - 1];
    const gridHeight: number = lastImage.top + lastImage.height;
    this.setState({ images, gridHeight });
  }
  render() {
    const { images, gridHeight } = this.state;
    const {
      rows,
      gutter,
      style,
      images: originalImages,
      showIncompleteRow,
      maxRowHeight,
      children,
      width,
      ...otherProps
    } = this.props;

    let defaultStyle: any = { position: 'relative', height: `${gridHeight}px` };
    if (width) defaultStyle.width = `${width}px`;

    if (isFunction(children)) {
      return (
        <div
          ref={el => (this.wrapperEl = el)}
          style={assign(defaultStyle, style)}
          {...otherProps}>
          {children(images)}
        </div>
      );
    }

    return (
      <div
        ref={el => (this.wrapperEl = el)}
        style={assign(defaultStyle, style)}
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

export { curateImageList };

export default JustifiedGrid;
