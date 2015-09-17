# react-youtube-player

[![Travis build status](http://img.shields.io/travis/gajus/react-youtube-player/master.svg?style=flat)](https://travis-ci.org/gajus/react-youtube-player)
[![NPM version](http://img.shields.io/npm/v/react-youtube-player.svg?style=flat)](https://www.npmjs.org/package/react-youtube-player)
[![Bountysource](https://img.shields.io/bountysource/team/mozilla-core/activity.svg)](https://www.bountysource.com/issues/26763180-write-test-cases-that-cover-the-use-of-the-api)

React component that encapsulates [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) and exposes player controls using the component properties.

## Implementation

`componentDidMount` callback is used to replace the rendered element with an `iframe` that loads a YouTube Player.

`componentWillReceiveProps` is used to detect when component properties change, compare them with the state of the YouTube Player and call YouTube IFrame Player API when necessary.

## Usage

```js
import YoutubePlayer from 'react-youtube-player';

/**
 * @typedef {String} YoutubePlayer~playbackState
 * @value 'unstarted' Stops and cancels loading of the current video. [stopVideo]{@link https://developers.google.com/youtube/iframe_api_reference#stopVideo}
 * @value 'playing' Plays the currently cued/loaded video. [playVideo]{@link https://developers.google.com/youtube/iframe_api_reference#playVideo}
 * @value 'paused' Pauses the currently playing video. [pauseVideo]{@link https://developers.google.com/youtube/iframe_api_reference#pauseVideo}
 */

/**
 * @property {String} videoId
 * @property {String|Number} width (default: '100%').
 * @property {String|Number} height (default: '100%').
 * @property {YoutubePlayer~playbackState} playbackState
 */
<YoutubePlayer
    videoId=''
    playbackState='unstarted'
/>
```

[`./example/`](./example/) demonstrates how to control a `react-youtube-player` component using property values that are controlled using user input.
