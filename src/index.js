import React from 'react';
import YoutubePlayer from 'youtube-player';
import _ from 'lodash';
import isNumeric from 'is-numeric';

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
class ReactYoutubePlayer extends React.Component {
    static stateNames = {
        '-1': 'unstarted',
        0: 'ended',
        1: 'playing',
        2: 'paused',
        3: 'buffering',
        5: 'cued'
    };

    static propTypes = {
        // https://developers.google.com/youtube/iframe_api_reference#onReady
        // onReady: React.PropTypes.func,

        // https://developers.google.com/youtube/iframe_api_reference#onStateChange
        // onStateChange: React.PropTypes.func,

        // https://developers.google.com/youtube/iframe_api_reference#onPlaybackQualityChange
        // onPlaybackQualityChange: React.PropTypes.func,

        // https://developers.google.com/youtube/iframe_api_reference#onPlaybackRateChange
        // onPlaybackRateChange: React.PropTypes.func,

        // https://developers.google.com/youtube/iframe_api_reference#onApiChange
        // onApiChange: React.PropTypes.func,

        // https://developers.google.com/youtube/iframe_api_reference#onStateChange
        onEnd: React.PropTypes.func,
        onPlay: React.PropTypes.func,
        onPause: React.PropTypes.func,
        onBuffer: React.PropTypes.func,

        // https://developers.google.com/youtube/iframe_api_reference#onError
        onError: React.PropTypes.func
    };

    static defaultProps = {
        width: '100%',
        height: '100%',
        playbackState: 'unstarted',
        onEnd: () => {},
        onPlay: () => {},
        onPause: () => {},
        onBuffer: () => {},
        onError: () => {}
    };

    componentDidMount () {
        this.player = YoutubePlayer(this.refs.player);

        this.bindEvent();

        this.diffState({}, this.props);
    }

    componentWillReceiveProps (nextProps) {
        this.diffState(this.props, nextProps);
    }

    shouldComponentUpdate () {
        // console.log('shouldComponentUpdate', 'this.props', this.props);

        return false;
    }

    /**
     * State set using 'state' property can change, e.g.
     * 'playing' will change to 'ended' at the end of the video.
     * Read playback state reflects the current player state
     * and is used to compare against the video player properties.
     *
     * @param {String} stateName
     * @return {undefined}
     */
    setRealPlaybackState = (stateName) => {
        this.realPlaybackState = stateName;
    };

    /**
     * @return {String}
     */
    getRealPlaybackState = () => {
        return this.realPlaybackState;
    };

    /**
     * Used to map YouTube IFrame Player API events to the callbacks
     * defined using the component instance properties.
     *
     * @return {undefined}
     */
    bindEvent = () => {
        this.player.on('stateChange', (event) => {
            this.setRealPlaybackState(ReactYoutubePlayer.stateNames[event.data]);

            // console.log('event', event.data, this.realPlaybackState);

            switch (this.getRealPlaybackState()) {
                case 'ended':
                    this.props.onEnd();
                break;

                case 'playing':
                    this.props.onPlay();
                break;

                case 'paused':
                    this.props.onPause();
                break;

                case 'buffering':
                    this.props.onBuffer();
                break;
            }
        });

        this.player.on('error', (event) => {
            this.props.onError();
        });
    };

    /**
     * The complexity of the ReactYoutubePlayer is that it attempts to combine
     * stateless properties with stateful player. This function is comparing
     * the last known property value of a state with the last known state of the player.
     * When these are different, it initiates an action that changes the player state, e.g.
     * when the current "state" property is "play" and the last known player state is "pause",
     * then setPlaybackState method will be called.
     *
     * @param {Object} prevProps
     * @param {Object} nextProps
     */
    diffState = (prevProps, nextProps) => {
        console.log('prevProps', prevProps, 'nextProps', nextProps);

        if (this.realPlaybackState !== nextProps.playbackState && nextProps.playbackState) {
            this.setPlaybackState(nextProps.playbackState);
        }

        if (prevProps.videoId !== nextProps.videoId && nextProps.videoId) {
            this.cueVideoId(nextProps.videoId);
        }

        console.log('prevProps.width !== nextProps.width', prevProps.width !== nextProps.width);

        if (prevProps.width !== nextProps.width) {
            this.setViewportWidth(nextProps.width);
        }

        if (prevProps.height !== nextProps.height) {
            this.setViewportHeight(nextProps.height);
        }
    };

    /**
     * @param {String} state
     * @return {undefined}
     */
    setPlaybackState = (stateName) => {
        if (stateName === 'playing') {
            this.player.playVideo();
        } else if (stateName === 'paused') {
            this.player.pauseVideo();
        } else if (stateName === 'unstarted') {

        } else {
            throw new Error('Invalid playback state ("' + stateName + '").');
        }
    };

    /**
     *@param {String} videoId
     * @return {undefined}
     */
    cueVideoId = (videoId) => {
        // console.log('videoId', videoId);

        if (!_.isString(videoId)) {
            throw new Error('videoId parameter must be a string.');
        }

        this.player.cueVideoById(videoId);
    };

    /**
     * Update element's width without calling the render method.
     *
     * @param {String|Number} width
     * @return {undefined}
     */
    setViewportWidth = (width) => {
        if (!width) {
            this.refs.player.style.removeProperty('width');
        } else {
            if (isNumeric(width)) {
                width += 'px';
            }

            console.log('set width', width);

            this.refs.viewport.style.width = width;
        }
    };

    /**
     * Update element's height without calling the render method.
     *
     * @param {String|Number} height
     * @return {undefined}
     */
    setViewportHeight = (height) => {
        if (!height) {
            this.refs.player.style.removeProperty('height');
        } else {
            if (isNumeric(height)) {
                height += 'px';
            }

            // console.log('set height', height);

            this.refs.viewport.style.height = height;
        }
    };

    /**
     * @return {ReactElement}
     */
    render () {
        let style;

        style = {
            width: '100%',
            height: '100%',
            display: 'block'
        };

        return <div ref='viewport' style={style}>
            <div ref='player' style={style}></div>
        </div>;
    }
}

export default ReactYoutubePlayer;
