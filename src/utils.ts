import { reduce } from 'lodash';
import { Image, ProcessedImage } from './interfaces';

export function getRowHeight(
  imageList: Image[],
  rowWidth: number,
  gutterWidth: number
): number {
  const realWidth: number =
    rowWidth - imageList.length * gutterWidth + gutterWidth;
  const ratio: number = imageList.reduce((sum: number, image: Image) => {
    sum += image.width / image.height;
    return sum;
  }, 0);

  return realWidth / ratio;
}

export function updateProcessedImageList(
  processImageList: ProcessedImage[],
  selectedImages: Image[],
  rowHeight: number,
  currentHeight: number,
  rowIndex: number,
  gutterWidth: number
): ProcessedImage[] {
  let currentWidth: number = 0;
  processImageList = reduce(
    selectedImages,
    (result, imageItem, i) => {
      const ratio: number = rowHeight / imageItem.height;
      const width: number = imageItem.width * ratio;
      const left: number = i === 0 ? 0 : currentWidth;
      const top: number = currentHeight;
      currentWidth += width + gutterWidth;

      result.push({
        src: imageItem.src,
        alt: imageItem.alt,
        width,
        height: rowHeight,
        rowOffset: rowIndex,
        left,
        top,
        originalData: imageItem
      });

      return result;
    },
    processImageList
  );

  return processImageList;
}
