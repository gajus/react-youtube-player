// @flow

import React, {
  PureComponent
} from 'react';
import YoutubePlayer from 'youtube-player';

type PlaybackStateNameType = 'playing' | 'paused' | 'unstarted';

type ConfigurationType = {|
  +autoplay: 0 | 1,
  +cc_load_policy: 0 | 1,
  +color: 'red' | 'white',
  +controls: 0 | 1 | 2,
  +disablekb: 0 | 1,
  +enablejsapi: 0 | 1,
  +end: number,
  +fs: 0 | 1,
  +hl: string,
  +iv_load_policy: 1 | 3,
  +list: 'search' | 'user_uploads' | 'playlist',
  +listType: 'playlist' | 'search' | 'user_uploads',
  +loop: 0 | 1,
  +modestbranding: 0 | 1,
  +origin: string,
  +playlist: string,
  +playsinline: 0 | 1,
  +rel: 0 | 1,
  +showinfo: 0 | 1,
  +start: number,
  +theme: 'dark' | 'light'
|};

type PropsType = {|
  +videoId: string,

  /**
   * @property configuration Configuration parameters to be passed to the YouTube Player (known as `playerVars` in the YouTube Player API for iframe Embeds, https://developers.google.com/youtube/player_parameters?playerVersion=HTML5#Parameters).
   */
  +configuration: ConfigurationType,

  /**
   * @value 'unstarted' Stops and cancels loading of the current video. [stopVideo]{@link https://developers.google.com/youtube/iframe_api_reference#stopVideo}
   * @value 'playing' Plays the currently cued/loaded video. [playVideo]{@link https://developers.google.com/youtube/iframe_api_reference#playVideo}
   * @value 'paused' Pauses the currently playing video. [pauseVideo]{@link https://developers.google.com/youtube/iframe_api_reference#pauseVideo}
   */
  +playbackState: string,

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
  onBuffer: Function,

  // https://developers.google.com/youtube/iframe_api_reference#onStateChange
  onEnd: Function,

  // https://developers.google.com/youtube/iframe_api_reference#onError
  onError: Function,
  onPause: Function,
  onPlay: Function,
  onCued: Function,
  onUnstarted: Function
|};

class ReactYoutubePlayer extends PureComponent {
  props: PropsType;

  // eslint-disable-next-line no-useless-constructor
  constructor (props: PropsType) {
    super(props);
  }

  static stateNames = {
    '-1': 'unstarted',
    0: 'ended',
    1: 'playing',
    2: 'paused',
    3: 'buffering',
    5: 'cued'
  };

  static defaultProps = {
    configuration: {},
    onBuffer: () => {},
    onCued: () => {},
    onEnd: () => {},
    onError: () => {},
    onPause: () => {},
    onPlay: () => {},
    onUnstarted: () => {},
    playbackState: 'unstarted'
  };

  componentDidMount () {
    this.player = YoutubePlayer(this.refPlayer, {
      height: '100%',
      playerVars: this.props.configuration,
      width: '100%'
    });

    this.bindEvent();

    this.diffState({}, this.props);
  }

  componentWillUnmount () {
    this.player.destroy();
  }

  componentWillReceiveProps (nextProps) {
    this.diffState(this.props, nextProps);
  }

  shouldComponentUpdate (): boolean {
    return false;
  }

  /**
   * State set using 'state' property can change, e.g.
   * 'playing' will change to 'ended' at the end of the video.
   * Read playback state reflects the current player state
   * and is used to compare against the video player properties.
   */
  setRealPlaybackState = (stateName: string): void => {
    this.realPlaybackState = stateName;
  };

  getRealPlaybackState = (): string => {
    return this.realPlaybackState;
  };

  /**
   * Used to map YouTube IFrame Player API events to the callbacks
   * defined using the component instance properties.
   */
  bindEvent = (): void => {
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
      } else if (realPlaybackState === 'cued') {
        this.props.onCued(event);
      } else if (realPlaybackState === 'unstarted') {
        this.props.onUnstarted(event);
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
   */
  diffState = (prevProps: $Shape<PropsType>, nextProps: $Shape<PropsType>): void => {
    if (prevProps.videoId !== nextProps.videoId && nextProps.videoId) {
      this.cueVideoId(nextProps.videoId);
    }

    if (this.realPlaybackState !== nextProps.playbackState && nextProps.playbackState) {
      this.setPlaybackState(nextProps.playbackState);
    }
  };

  setPlaybackState = (stateName: PlaybackStateNameType): void => {
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

  cueVideoId = (videoId: string): void => {
    this.player.cueVideoById(videoId);
  };

  render () {
    const style = {
      display: 'block',
      height: '100%',
      width: '100%'
    };

    return <div
      ref={(element) => {
        this.refViewport = element;
      }} style={style}>
      <div
        ref={(element) => {
          this.refPlayer = element;
        }} style={style}
      />
    </div>;
  }
}

export default ReactYoutubePlayer;
