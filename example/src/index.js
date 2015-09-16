import React from 'react';
import ReactDOM from 'react-dom';
import YouTubePlayer from 'react-youtube-player';

class Parent extends React.Component {
    constructor () {
        super();

        this.state = {};

        /* setInterval(() => {
            let state;

            state = {
                ...this.state,
                data: {
                    random: Math.random()
                }
            };

            this.setState(state);
        }, 500); */

        window.setState = (state) => {
            this.setState({
                state: state
            });
        };

        window.setVideoId = (id) => {
            this.setState({
                videoId: id
            });
        };

        window.setWidth = (width) => {
            this.setState({
                width: width
            });
        };

        window.setHeight = (height) => {
            this.setState({
                height: height
            });
        };
    }

    render () {
        return <YouTubePlayer
            videoId={this.state.videoId}
            width={this.state.width}
            height={this.state.height}
            state={this.state.state}
        />;
    }
}

ReactDOM.render(<Parent />, document.getElementById('app'));
