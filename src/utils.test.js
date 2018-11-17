import { getRowHeight, curateImageList } from './utils';

describe('utils', () => {
  describe('#getRowHeight', () => {
    it('finds the height which can fit all images in one row', () => {
      let images = null;
      let result = null;

      // #1
      images = [{ src: '1.gif', width: 320, height: 320 }];
      result = getRowHeight(images, 300, 0);
      expect(result).toEqual(300);

      // #2
      images = [
        { src: '1.gif', width: 240, height: 480 },
        { src: '2.gif', width: 360, height: 240 }
      ];
      result = getRowHeight(images, 300, 0);
      expect(result).toEqual(150);
    });
  });

  describe('#curateImageList', () => {
    it('returns images array with updated viewport information', () => {
      const setting = {
        gutter: 0,
        rows: 1,
        maxRowHeight: 300,
        showIncompleteRow: false
      };

      let images;
      let result;

      // #1
      images = [{ src: '1.gif', width: 320, height: 320 }];
      result = curateImageList(images, 300, setting).map(
        ({ src, width, height, top, left }) => ({
          src,
          width,
          height,
          top,
          left
        })
      );
      expect(result).toEqual([
        { src: '1.gif', width: 300, height: 300, top: 0, left: 0 }
      ]);

      // #2
      images = [
        { src: '1.gif', width: 240, height: 480 },
        { src: '2.gif', width: 360, height: 240 }
      ];
      result = curateImageList(images, 300, setting).map(
        ({ src, width, height, top, left }) => ({
          src,
          width,
          height,
          top,
          left
        })
      );
      expect(result).toEqual([
        { src: '1.gif', width: 75, height: 150, top: 0, left: 0 },
        { src: '2.gif', width: 225, height: 150, top: 0, left: 75 }
      ]);
    });
  });
});
