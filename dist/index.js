'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _youtubePlayer = require('youtube-player');

var _youtubePlayer2 = _interopRequireDefault(_youtubePlayer);

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

        this.bindEvent = function () {
            _this.player.on('stateChange', function (event) {
                if (event.data === 0) {
                    _this.props.onEnd();
                } else if (event.data === 1) {
                    _this.props.onPlay();
                } else if (event.data === 2) {
                    _this.props.onPause();
                } else if (event.data === 3) {
                    _this.props.onBuffer();
                }
            });

            _this.player.on('error', function (event) {
                _this.props.onError();
            });
        };

        this.diffState = function (prevProps, nextProps) {
            console.log(prevProps, nextProps);

            if (prevProps.state !== nextProps.state) {
                _this.setPlaybackState(nextProps.state);
            }

            if (prevProps.videoId !== nextProps.videoId) {
                _this.setVideoId(nextProps.videoId);
            }

            if (prevProps.width !== nextProps.width || _this.props.height !== nextProps.height) {
                _this.setStyle(nextProps.width, nextProps.height);
            }
        };

        this.setPlaybackState = function (state) {
            if (state === 'play') {
                _this.player.playVideo();
            } else if (state === 'pause') {
                _this.player.pauseVideo();
            } else if (state === 'stop') {
                _this.player.stopVideo();
            } else {
                throw new Error('Unknown playback state (' + state + ').');
            }
        };

        this.setVideoId = function (videoId) {
            _this.player.cueVideoById(videoId);
        };

        this.setStyle = function (width, height) {
            // console.log('this.refs.player', this.refs.player, 'width', width, 'height', height);

            if (!width) {
                _this.refs.player.style.removeProperty('width');
            } else {
                if (typeof width === 'number') {
                    width += 'px';
                }

                // console.log('set width', width);

                _this.refs.viewport.style.width = width;
            }

            if (!_this.props.height) {
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

            // @todo Logic to detect whether style properties (width, height) have changed.

            // this.setStyle(this.props.width, this.props.height);

            return false;
        }

        /**
         *
         */
    }, {
        key: 'render',
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
            state: 'stop',
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
 * @param {Object} prevProps
 * @param {Object} nextProps
 */

/**
 * @param {String} state ('play', 'pause', 'stop')
 * @return {undefined}
 */

/**
 * @param {String} videoId
 * @return {undefined}
 */

/**
 * Update element styles without calling the render method.
 *
 * @param {String|Number} width
 * @param {String|Number} height
 * @return {undefined}
 */