import React, { Component } from 'react';
import JustifiedGrid from 'react-justified-grid';
import mockData from './mockData';

export default class App extends Component {
  render() {
    return (
      <div
        style={{
          width: '800px',
          position: 'relative'
        }}>
        <JustifiedGrid
          images={mockData}
          rows={5}
          maxRowHeight={64}
          showIncompleteRow={true}
        />
        <hr />
        <JustifiedGrid images={mockData} rows={2} maxRowHeight={128}>
          {processedImages => (
            <React.Fragment>
              {processedImages.map((image, i) => {
                const { alt, src, width, height, left, top } = image;
                return (
                  <a
                    key={i}
                    href="https://stackla.com"
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
      </div>
    );
  }
}
