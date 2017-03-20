import {
  configure
} from '@kadira/storybook';

const loadStories = () => {
  // eslint-disable-next-line import/no-unassigned-import global-require
  require('../dist/stories/player');
};

configure(loadStories, module);
