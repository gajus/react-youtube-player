'use strict';

var _lodashLangIsString2 = require('lodash/lang/isString');

var _lodashLangIsString3 = _interopRequireDefault(_lodashLangIsString2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _youtubePlayer = require('youtube-player');

var _youtubePlayer2 = _interopRequireDefault(_youtubePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @property {String} videoId
 * @property {String|Number} width
 * @property {String|Number} height
 * @property {String} state ('play', 'pause', 'stop')
 */

var YouTubePlayer = (function (_React$Component) {
    _inherits(YouTubePlayer, _React$Component);

    function YouTubePlayer() {
        var _this = this;

        _classCallCheck(this, YouTubePlayer);

        _get(Object.getPrototypeOf(YouTubePlayer.prototype), 'constructor', this).apply(this, arguments);

        this.setRealPlaybackState = function (stateName) {
            _this.realPlaybackState = stateName;
        };

        this.getRealPlaybackState = function () {
            return _this.realPlaybackState;
        };

        this.bindEvent = function () {
            _this.player.on('stateChange', function (event) {
                _this.setRealPlaybackState(YouTubePlayer.stateNames[event.data]);

                // console.log('event', event.data, this.realPlaybackState);

                switch (_this.getRealPlaybackState()) {
                    case 'ended':
                        _this.props.onEnd();
                        break;

                    case 'playing':
                        _this.props.onPlay();
                        break;

                    case 'paused':
                        _this.props.onPause();
                        break;

                    case 'buffering':
                        _this.props.onBuffer();
                        break;
                }
            });

            _this.player.on('error', function (event) {
                _this.props.onError();
            });
        };

        this.diffState = function (prevProps, nextProps) {
            // console.log('prevProps', prevProps, 'nextProps', nextProps);

            if (_this.realPlaybackState !== nextProps.state && nextProps.state) {
                _this.setPlaybackState(nextProps.state);
            }

            if (prevProps.videoId !== nextProps.videoId && nextProps.videoId) {
                _this.cueVideoId(nextProps.videoId);
            }

            if (prevProps.width !== nextProps.width) {
                _this.setViewportWidth(nextProps.width);
            }

            if (prevProps.height !== nextProps.height) {
                _this.setViewportHeight(nextProps.height);
            }
        };

        this.setPlaybackState = function (stateName) {
            if (stateName === 'play') {
                _this.player.playVideo();
            } else if (stateName === 'pause') {
                _this.player.pauseVideo();
            } else {
                throw new Error('Invalid playback state ("' + stateName + '").');
            }
        };

        this.cueVideoId = function (videoId) {
            // console.log('videoId', videoId);

            if (!(0, _lodashLangIsString3['default'])(videoId)) {
                throw new Error('videoId parameter must be a string.');
            }

            _this.player.cueVideoById(videoId);
        };

        this.setViewportWidth = function (width) {
            if (!width) {
                _this.refs.player.style.removeProperty('width');
            } else {
                if (typeof width === 'number') {
                    width += 'px';
                }

                // console.log('set width', width);

                _this.refs.viewport.style.width = width;
            }
        };

        this.setViewportHeight = function (height) {
            if (!height) {
                _this.refs.player.style.removeProperty('height');
            } else {
                if (typeof height === 'number') {
                    height += 'px';
                }

                // console.log('set height', height);

                _this.refs.viewport.style.height = height;
            }
        };
    }

    _createClass(YouTubePlayer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.player = (0, _youtubePlayer2['default'])(this.refs.player);

            this.bindEvent();

            this.diffState({}, this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.diffState(this.props, nextProps);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
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
    }, {
        key: 'render',

        /**
         * @return {ReactElement}
         */
        value: function render() {
            var style = undefined;

            style = {
                width: '100%',
                height: '100%',
                display: 'block'
            };

            return _react2['default'].createElement(
                'div',
                { ref: 'viewport', style: style },
                _react2['default'].createElement('div', { ref: 'player', style: style })
            );
        }
    }], [{
        key: 'stateNames',
        value: {
            '-1': 'unstarted',
            0: 'ended',
            1: 'playing',
            2: 'paused',
            3: 'buffering',
            5: 'cued'
        },
        enumerable: true
    }, {
        key: 'propTypes',
        value: {
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
            onEnd: _react2['default'].PropTypes.func,
            onPlay: _react2['default'].PropTypes.func,
            onPause: _react2['default'].PropTypes.func,
            onBuffer: _react2['default'].PropTypes.func,

            // https://developers.google.com/youtube/iframe_api_reference#onError
            onError: _react2['default'].PropTypes.func
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
            width: '100%',
            height: '100%',
            state: undefined,
            onEnd: function onEnd() {},
            onPlay: function onPlay() {},
            onPause: function onPause() {},
            onBuffer: function onBuffer() {},
            onError: function onError() {}
        },
        enumerable: true
    }]);

    return YouTubePlayer;
})(_react2['default'].Component);

exports['default'] = YouTubePlayer;
module.exports = exports['default'];

/**
 * @return {String}
 */

/**
 * Used to map YouTube IFrame Player API events to the callbacks
 * defined using the component instance properties.
 *
 * @return {undefined}
 */

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

/**
 * @param {String} state
 * @return {undefined}
 */

/**
 *@param {String} videoId
 * @return {undefined}
 */

/**
 * Update element's width without calling the render method.
 *
 * @param {String|Number} width
 * @return {undefined}
 */

/**
 * Update element's height without calling the render method.
 *
 * @param {String|Number} height
 * @return {undefined}
 */