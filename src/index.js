import React from 'react';
import YouTubePlayerFactory from 'youtube-player';

/**
 * @property {String} videoId
 * @property {String|Number} width
 * @property {String|Number} height
 * @property {String} state ('play', 'pause', 'stop')
 */
class YouTubePlayer extends React.Component {
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
        state: 'stop',
        onEnd: () => {},
        onPlay: () => {},
        onPause: () => {},
        onBuffer: () => {},
        onError: () => {}
    };

    componentDidMount () {
        this.player = YouTubePlayerFactory(this.refs.player);

        this.bindEvent();

        this.diffState({}, this.props);
    }

    componentWillReceiveProps (nextProps) {
        this.diffState(this.props, nextProps);
    }

    shouldComponentUpdate () {
        // console.log('shouldComponentUpdate', 'this.props', this.props);

        // @todo Logic to detect whether style properties (width, height) have changed.

        // this.setStyle(this.props.width, this.props.height);

        return false;
    }

    /**
     *
     */
    bindEvent = () => {
        this.player.on('stateChange', (event) => {
            if (event.data === 0) {
                this.props.onEnd();
            } else if (event.data === 1) {
                this.props.onPlay();
            } else if (event.data === 2) {
                this.props.onPause();
            } else if (event.data === 3) {
                this.props.onBuffer();
            }
        });

        this.player.on('error', (event) => {
            this.props.onError();
        });
    };

    /**
     * @param {Object} prevProps
     * @param {Object} nextProps
     */
    diffState = (prevProps, nextProps) => {
        console.log(prevProps, nextProps);

        if (prevProps.state !== nextProps.state) {
            this.setPlaybackState(nextProps.state);
        }

        if (prevProps.videoId !== nextProps.videoId) {
            this.setVideoId(nextProps.videoId);
        }

        if (prevProps.width !== nextProps.width || this.props.height !== nextProps.height) {
            this.setStyle(nextProps.width, nextProps.height);
        }
    };

    /**
     * @param {String} state ('play', 'pause', 'stop')
     * @return {undefined}
     */
    setPlaybackState = (state) => {
        if (state === 'play') {
            this.player.playVideo();
        } else if (state === 'pause') {
            this.player.pauseVideo();
        } else if (state === 'stop') {
            this.player.stopVideo();
        } else {
            throw new Error('Unknown playback state (' + state + ').');
        }
    };

    /**
     * @param {String} videoId
     * @return {undefined}
     */
    setVideoId = (videoId) => {
        this.player.cueVideoById(videoId);
    };

    /**
     * Update element styles without calling the render method.
     *
     * @param {String|Number} width
     * @param {String|Number} height
     * @return {undefined}
     */
    setStyle = (width, height) => {
        // console.log('this.refs.player', this.refs.player, 'width', width, 'height', height);

        if (!width) {
            this.refs.player.style.removeProperty('width');
        } else {
            if (typeof width === 'number') {
                width += 'px';
            }

            // console.log('set width', width);

            this.refs.viewport.style.width = width;
        }

        if (!this.props.height) {
            this.refs.player.style.removeProperty('height');
        } else {
            if (typeof height === 'number') {
                height += 'px';
            }

            // console.log('set height', height);

            this.refs.viewport.style.height = height;
        }
    }

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

export default YouTubePlayer;
