import React from 'react';
import {
    storiesOf
} from '@kadira/storybook';
import YouTubePlayer from './../';

storiesOf('react-youtube-player', module)
    .add('component mounted with playbackState set to "unstarted"', () => {
        return <YouTubePlayer
            height='360'
            playbackState='unstarted'
            videoId='M7lc1UVf-VE'
            width='640'
        />;
    })
    .add('component mounted with playbackState set to "playing"', () => {
        return <YouTubePlayer
            height='360'
            playbackState='playing'
            videoId='M7lc1UVf-VE'
            width='640'
        />;
    })
    .add('component mounted with playbackState set to "paused"', () => {
        return <YouTubePlayer
            height='360'
            playbackState='paused'
            videoId='M7lc1UVf-VE'
            width='640'
        />;
    });
