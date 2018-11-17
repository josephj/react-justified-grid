import { cloneDeep, reduce } from 'lodash';
import { DefaultProps, Image, ProcessedImage } from './interfaces';

export function getRowHeight(
  images: Image[],
  width: number,
  gutter: number
): number {
  const realWidth: number = width - images.length * gutter + gutter;
  const ratio: number = images.reduce((sum: number, image: Image) => {
    sum += image.width / image.height;
    return sum;
  }, 0);

  return realWidth / ratio;
}

/**
 * Curate image list according to setting
 */
export const curateImageList = (
  images: Image[],
  width: number,
  setting: DefaultProps
): ProcessedImage[] => {
  const { gutter, rows, maxRowHeight, showIncompleteRow } = setting;
  const rowWidth = width;

  let imageList = cloneDeep(images);
  let processedImageList: ProcessedImage[] = [];
  let rowIndex = 0;
  let currentHeight: number = 0;

  while (imageList.length > 0 && rows > rowIndex) {
    let height: number = 0;
    let isFulfilled: boolean = false;
    let offset: number = 0;
    let selectedImages: Image[] = [];
    imageList.some(() => {
      selectedImages = imageList.slice(0, offset + 1);
      height = getRowHeight(selectedImages, rowWidth, gutter);
      isFulfilled = height <= maxRowHeight;
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
      if (showIncompleteRow) {
        processedImageList = updateProcessedImageList(
          processedImageList,
          selectedImages,
          maxRowHeight,
          currentHeight,
          rowIndex,
          gutter
        );
      }

      return processedImageList;
    }

    imageList = cloneDeep(images).slice(processedImageList.length);
    rowIndex += 1;
  }

  return processedImageList;
};

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
