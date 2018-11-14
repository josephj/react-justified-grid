import * as React from 'react';
import { shallow } from 'enzyme';
import JustifiedGrid from './index';

describe('<JustifiedGrid/>', () => {
  let props;
  let mountedJustifiedGrid;
  let defaultImages = [
    { src: 'http://foo.com/1.png', width: 640, height: 380 },
    { src: 'http://foo.com/2.png', width: 320, height: 480 },
    { src: 'http://foo.com/3.png', width: 500, height: 500 },
    { src: 'http://foo.com/4.png', width: 1024, height: 768 },
    { src: 'http://foo.com/5.png', width: 480, height: 640 },
    { src: 'http://foo.com/6.png', width: 1000, height: 800 },
    { src: 'http://foo.com/7.png', width: 600, height: 500 },
    { src: 'http://foo.com/8.png', width: 380, height: 380 },
    { src: 'http://foo.com/9.png', width: 200, height: 500 },
    { src: 'http://foo.com/10.png', width: 720, height: 640 }
  ];
  const justifiedGrid = () => {
    if (!mountedJustifiedGrid) {
      mountedJustifiedGrid = shallow(<JustifiedGrid {...props} />);
    }
    return mountedJustifiedGrid;
  };
  beforeEach(() => {
    props = {
      images: [],
      gutter: undefined,
      rows: undefined,
      maxRowHeight: undefined,
      style: undefined,
      showIncompleteRow: undefined
    };
    mountedJustifiedGrid = undefined;
  });

  it('always renders a div', () => {
    const divs = justifiedGrid().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('renders images', () => {
    props.images = [].concat(defaultImages);
    const imageEls = justifiedGrid().find('img');
    expect(imageEls.length).toBeGreaterThan(0);
  });

  it('has images with the same height', () => {
    props.images = [].concat(defaultImages);
    props.rows = 1;
    props.gutter = 0;
    props.width = 500;
    const img1 = justifiedGrid()
      .find('img')
      .first();
    const img2 = justifiedGrid()
      .find('img')
      .at(1);
    expect(img1.prop('height')).toEqual(img2.prop('height'));
  });

  it("doesn't handle the children props while it's a react element", () => {
    props.images = [].concat(defaultImages);
    props.children = <div class="foobar">Foo Bar</div>;
    expect(
      justifiedGrid()
        .find('.foobar')
        .exists()
    ).toBeFalsy();
  });

  it("handles the children props while it's a function", done => {
    const childrenMock = jest.fn();
    props.images = [{ src: 'http://foo.com/1.jpg', width: 100, height: 100 }];
    props.gutter = 0;
    props.width = 100;
    props.children = childrenMock;
    const spy = jest.spyOn(props, 'children');
    justifiedGrid();
    expect(spy).toHaveBeenCalled();
    setTimeout(() => {
      justifiedGrid().update();
      expect(childrenMock).toHaveBeenCalledWith([
        {
          src: 'http://foo.com/1.jpg',
          alt: undefined,
          width: 100,
          height: 100,
          rowOffset: 0,
          left: 0,
          top: 0,
          originalData: {
            src: 'http://foo.com/1.jpg',
            width: 100,
            height: 100
          }
        }
      ]);
      done();
    }, 500);
  });
});
