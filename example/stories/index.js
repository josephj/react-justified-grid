import React from 'react';
import { storiesOf } from '@storybook/react';
import JustifiedGrid from 'react-justified-grid';
import mockData from '../src/mockData';

storiesOf('JustifiedGrid', module)
  .add('Default', () => <JustifiedGrid images={mockData} />)
  .add('Set rows = 1', () => <JustifiedGrid images={mockData} rows={1} />)
  .add('Set gutter = 5', () => <JustifiedGrid images={mockData} gutter={5} />)
  .add('Set showIncompleteRow', () => (
    <JustifiedGrid
      images={mockData}
      maxRowHeight={64}
      rows={10}
      showIncompleteRow={true}
    />
  ))
  .add('Empty state', () => (
    <JustifiedGrid images={[]}>
      {images => {
        if (!images.length) {
          return <div>Nothing</div>;
        }
      }}
    </JustifiedGrid>
  ))
  .add('Render prop', () => (
    <JustifiedGrid images={mockData}>
      {processedImages => (
        <React.Fragment>
          {processedImages.map((image, i) => {
            const { alt, src, width, height, left, top } = image;
            return (
              <a
                key={i}
                href="http://josephj.com"
                style={{
                  position: 'absolute',
                  left: left,
                  top: top
                }}>
                <img src={src} width={width} height={height} alt={alt} />
              </a>
            );
          })}
        </React.Fragment>
      )}
    </JustifiedGrid>
  ));
