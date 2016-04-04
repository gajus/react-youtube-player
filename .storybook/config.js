import {
    configure
} from '@kadira/storybook';

const loadStories = () => {
    require('./../src/stories/player.js');
};

configure(loadStories, module);
