import React from 'react';
import YoutubePlayer from 'youtube-player';
import _ from 'lodash';
import isNumeric from 'is-numeric';

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
        /* eslint-disable camelcase, id-match */
        configuration: React.PropTypes.shape({
            autoplay: React.PropTypes.oneOf([0, 1]),
            cc_load_policy: React.PropTypes.oneOf([0, 1]),
            color: React.PropTypes.oneOf(['red', 'white']),
            controls: React.PropTypes.oneOf([0, 1, 2]),
            disablekb: React.PropTypes.oneOf([0, 1]),
            enablejsapi: React.PropTypes.oneOf([0, 1]),
            end: React.PropTypes.number,
            fs: React.PropTypes.oneOf([0, 1]),
            hl: React.PropTypes.string,
            iv_load_policy: React.PropTypes.oneOf([1, 3]),
            list: React.PropTypes.oneOf(['search', 'user_uploads', 'playlist']),
            listType: React.PropTypes.oneOf(['playlist', 'search', 'user_uploads']),
            loop: React.PropTypes.oneOf([0, 1]),
            modestbranding: React.PropTypes.oneOf([0, 1]),
            origin: React.PropTypes.string,
            playlist: React.PropTypes.string,
            playsinline: React.PropTypes.oneOf([0, 1]),
            rel: React.PropTypes.oneOf([0, 1]),
            showinfo: React.PropTypes.oneOf([0, 1]),
            start: React.PropTypes.number,
            theme: React.PropTypes.oneOf(['dark', 'light'])
        }),
        /* eslint-enable camelcase, id-match */

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

        onBuffer: React.PropTypes.func,

        // https://developers.google.com/youtube/iframe_api_reference#onStateChange
        onEnd: React.PropTypes.func,
        // https://developers.google.com/youtube/iframe_api_reference#onError
        onError: React.PropTypes.func,

        onPause: React.PropTypes.func,
        onPlay: React.PropTypes.func
    };

    static defaultProps = {
        configuration: {},
        height: '100%',
        onBuffer: () => {},
        onEnd: () => {},
        onError: () => {},
        onPause: () => {},
        onPlay: () => {},
        playbackState: 'unstarted',
        width: '100%'
    };

    componentDidMount () {
        this.player = YoutubePlayer(this.refPlayer, {
            playerVars: this.props.configuration
        });

        this.bindEvent();

        this.diffState({}, this.props);
    }

    componentWillReceiveProps (nextProps) {
        this.diffState(this.props, nextProps);
    }

    shouldComponentUpdate () {
        return false;
    }

    /**
     * State set using 'state' property can change, e.g.
     * 'playing' will change to 'ended' at the end of the video.
     * Read playback state reflects the current player state
     * and is used to compare against the video player properties.
     *
     * @param {string} stateName
     * @returns {undefined}
     */
    setRealPlaybackState = (stateName) => {
        this.realPlaybackState = stateName;
    };

    /**
     * @returns {string}
     */
    getRealPlaybackState = () => {
        return this.realPlaybackState;
    };

    /**
     * Used to map YouTube IFrame Player API events to the callbacks
     * defined using the component instance properties.
     *
     * @returns {undefined}
     */
    bindEvent = () => {
        this.player.on('stateChange', (event) => {
            this.setRealPlaybackState(ReactYoutubePlayer.stateNames[event.data]);

            const realPlaybackState = this.getRealPlaybackState();

            if (realPlaybackState === 'ended') {
                this.props.onEnd(event);
            } else if (realPlaybackState === 'playing') {
                this.props.onPlay(event);
            } else if (realPlaybackState === 'paused') {
                this.props.onPause(event);
            } else if (realPlaybackState === 'buffering') {
                this.props.onBuffer(event);
            }
        });

        this.player.on('error', (event) => {
            this.props.onError(event);
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
     * @returns {undefined}
     */
    diffState = (prevProps, nextProps) => {
        // console.log('prevProps', prevProps, 'nextProps', nextProps);

        if (this.realPlaybackState !== nextProps.playbackState && nextProps.playbackState) {
            this.setPlaybackState(nextProps.playbackState);
        }

        if (prevProps.videoId !== nextProps.videoId && nextProps.videoId) {
            this.cueVideoId(nextProps.videoId);
        }

        // console.log('prevProps.width !== nextProps.width', prevProps.width !== nextProps.width);

        if (prevProps.width !== nextProps.width) {
            this.setViewportWidth(nextProps.width);
        }

        if (prevProps.height !== nextProps.height) {
            this.setViewportHeight(nextProps.height);
        }
    };

    /**
     * @param {string} stateName
     * @returns {undefined}
     */
    setPlaybackState = (stateName) => {
        if (stateName === 'playing') {
            this.player.playVideo();
        } else if (stateName === 'paused') {
            this.player.pauseVideo();
        } else if (stateName === 'unstarted') {
            this.player.stopVideo();
        } else {
            throw new Error('Invalid playback state ("' + stateName + '").');
        }
    };

    /**
     * @param {string} videoId
     * @returns {undefined}
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
     * @param {string|number} width
     * @returns {undefined}
     */
    setViewportWidth = (width) => {
        this.setDimension('width', width);
    };

    /**
     * Update element's height without calling the render method.
     *
     * @param {string|number} height
     * @returns {undefined}
     */
    setViewportHeight = (height) => {
        this.setDimension('height', height);
    };

    /**
     * @param {string} name
     * @param {string|number} size
     * @returns {undefined}
     */
    setDimension = (name, size) => {
        let formattedSize;

        if (size) {
            formattedSize = size;

            if (isNumeric(formattedSize)) {
                formattedSize += 'px';
            }

            this.refViewport.style[name] = formattedSize;
        } else {
            this.refPlayer.style.removeProperty(name);
        }
    };

    render () {
        const style = {
            display: 'block',
            height: '100%',
            width: '100%'
        };

        return <div ref={(element) => { this.refViewport = element; }} style={style}>
            <div ref={(element) => { this.refPlayer = element; }} style={style}></div>
        </div>;
    }
}

export default ReactYoutubePlayer;
