import {
    configure
} from '@kadira/storybook';

const loadStories = () => {
    require('./../dist/stories/player.js');
};

configure(loadStories, module);
