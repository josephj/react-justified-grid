import * as React from 'react';
import { mount } from 'enzyme';
import JustifiedGrid from './index';

describe('<JustifiedGrid/>', () => {
  it('should render an <div/> tag', () => {
    const renderedComponent = mount(<JustifiedGrid images={[]}/>);
    expect(renderedComponent.find('div').length).toEqual(1);
  });

});
