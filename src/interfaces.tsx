export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProcessedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  rowOffset: number;
  left: number;
  top: number;
  originalData: Image;
}

export interface Props {
  images: Image[];
  gutter?: number;
  rows?: number;
  maxRowHeight?: number;
  children?: (imageList: ProcessedImage[]) => React.ReactNode;
}

export interface DefaultProps {
  gutter: number;
  rows: number;
  maxRowHeight: number;
}

export interface State {
  images: ProcessedImage[];
  gridHeight: number;
}

export type PropsWithDefaults = Props & DefaultProps;
