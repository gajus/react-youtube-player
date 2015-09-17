import React from 'react';
import ReactDOM from 'react-dom';
import YouTubePlayer from 'react-youtube-player';

class Parent extends React.Component {
    constructor () {
        super();

        this.state = {
            playbackState: 'unstarted',
            videoId: 'M7lc1UVf-VE',
            width: 640,
            height: 360
        };
    }

    handleVideoIdChange = (event) => {
        this.setState({
            videoId: event.target.value
        });
    };

    handleWidthChange = (event) => {
        this.setState({
            width: event.target.value
        });
    };

    handleHeightChange = (event) => {
        this.setState({
            height: event.target.value
        });
    };

    handlePlayVideo = () => {
        this.setState({
            playbackState: 'playing'
        });
    }

    handlePauseVideo = () => {
        this.setState({
            playbackState: 'paused'
        });
    }

    render () {
        console.log(`this.state.playbackState`, this.state.playbackState);

        return <div>
            <YouTubePlayer
                videoId={this.state.videoId}
                width={this.state.width}
                height={this.state.height}
                playbackState={this.state.playbackState}
            />

            <div>
                <label>Video Id</label>
                <input type='text' value={this.state.videoId} onChange={this.handleVideoIdChange} />
            </div>

            <div>
                <label>Player Width</label>
                <input type='text' value={this.state.width} onChange={this.handleWidthChange} />
            </div>

            <div>
                <label>Player Height</label>
                <input type='text' value={this.state.height} onChange={this.handleHeightChange} />
            </div>

            <button onClick={this.handlePlayVideo}>Play</button>
            <button onClick={this.handlePauseVideo}>Pause</button>
        </div>;
    }
}

ReactDOM.render(<Parent />, document.getElementById('app'));
