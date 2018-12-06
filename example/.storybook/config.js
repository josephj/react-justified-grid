import { addDecorator, configure } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

addDecorator(
  withInfo({
    inline: true,
    header: false,
    source: true,
    maxPropObjectKeys: 100,
    maxPropArrayLength: 100,
    maxPropStringLength: 100
  })
);
addDecorator(
  withOptions({
    name: 'Justified Grid',
    url: 'https://github.com/josephj/react-justified-grid',
    showAddonPanel: false
  })
);

configure(loadStories, module);
