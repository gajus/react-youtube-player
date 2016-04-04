import React from 'react';
import {
    storiesOf,
    action
} from '@kadira/storybook';
import YouTubePlayer from './../';

storiesOf('react-youtube-player', module)
    .add('component mounted with playbackState set to "unstarted"', () => (
        <YouTubePlayer
            videoId='M7lc1UVf-VE'
            width='640'
            height='360'
            playbackState='unstarted'
        />
    ))
    .add('component mounted with playbackState set to "playing"', () => (
        <YouTubePlayer
            videoId='M7lc1UVf-VE'
            width='640'
            height='360'
            playbackState='playing'
        />
    ))
    .add('component mounted with playbackState set to "paused"', () => (
        <YouTubePlayer
            videoId='M7lc1UVf-VE'
            width='640'
            height='360'
            playbackState='paused'
        />
    ));
