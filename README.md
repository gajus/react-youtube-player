# react-youtube-player

[![Travis build status](http://img.shields.io/travis/gajus/react-youtube-player/master.svg?style=flat-square)](https://travis-ci.org/gajus/react-youtube-player)
[![NPM version](http://img.shields.io/npm/v/react-youtube-player.svg?style=flat-square)](https://www.npmjs.org/package/react-youtube-player)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

React component that encapsulates [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) and exposes player controls using the component properties.

## Implementation

`componentDidMount` callback is used to replace the rendered element with an `iframe` that loads a YouTube Player.

`componentWillReceiveProps` is used to detect when component properties change, compare them with the state of the YouTube Player and call YouTube IFrame Player API when necessary.

## Usage

```js
import YoutubePlayer from 'react-youtube-player';

/**
 * @typedef {string} YoutubePlayer~playbackState
 * @value 'unstarted' Stops and cancels loading of the current video. [stopVideo]{@link https://developers.google.com/youtube/iframe_api_reference#stopVideo}
 * @value 'playing' Plays the currently cued/loaded video. [playVideo]{@link https://developers.google.com/youtube/iframe_api_reference#playVideo}
 * @value 'paused' Pauses the currently playing video. [pauseVideo]{@link https://developers.google.com/youtube/iframe_api_reference#pauseVideo}
 */

/**
 * @property {string} videoId
 * @property {string|number} width (default: '100%').
 * @property {string|number} height (default: '100%').
 * @property {YoutubePlayer~playbackState} playbackState
 * @property {Object} configuration Configuration parameters to be passed to the YouTube Player (known as `playerVars` in the YouTube Player API for iframe Embeds, https://developers.google.com/youtube/player_parameters?playerVersion=HTML5#Parameters).
 */
<YoutubePlayer
    videoId=''
    playbackState='unstarted'
    configuration={
        {
            showinfo: 0,
            controls: 0
        }
    }
/>
```

## Demo

To run the demo:

```
npm install
npm run build
npm run demo
```
