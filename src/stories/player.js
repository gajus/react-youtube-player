import React from 'react';
import {
  storiesOf
} from '@kadira/storybook';
import YouTubePlayer from '..';

storiesOf('react-youtube-player', module)
  .add('component mounted with playbackState set to "unstarted"', () => {
    return <YouTubePlayer
      playbackState='unstarted'
      videoId='M7lc1UVf-VE'
    />;
  })
  .add('component mounted with playbackState set to "playing"', () => {
    return <YouTubePlayer
      playbackState='playing'
      videoId='M7lc1UVf-VE'
    />;
  })
  .add('component mounted with playbackState set to "paused"', () => {
    return <YouTubePlayer
      playbackState='paused'
      videoId='M7lc1UVf-VE'
    />;
  });
