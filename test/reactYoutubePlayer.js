// @flow

/* eslint-disable max-nested-callbacks */

// import assert from 'assert';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import ReactYoutubePlayer from '../../src';
//
// let player, playerComponent;
//
// const dom = document.createElement('div');
//
// dom.id = 'dom';
//
// describe('creating the player', () => {
//   before(() => {
//     document.body.appendChild(dom);
//   });
//
//   it('should render a Youtube player', (done) => {
//     playerComponent = ReactDOM.render(
//       <ReactYoutubePlayer
//         playbackState='unstarted'
//         videoId='bHQqvYy5KYo'
//       />,
//       dom, done
//     );
//     player = playerComponent.player;
//   });
//
//   it('should properly create the player', function (done) {
//     this.slow(2000);
//
//     setTimeout(() => {
//       const iframes = Array.from(document.getElementsByTagName('iframe'))
//         .filter((iframe) => {
//           return iframe.src.indexOf('youtube') !== -1;
//         });
//
//       assert.equal(iframes.length, 1);
//       done();
//     }, 500);
//   });
// });
//
// describe('using the player', () => {
//   it('should allow for playing the video', function (done) {
//     this.slow(3000);
//     this.timeout(5000);
//     playerComponent.setPlaybackState('playing');
//     player.on('stateChange', () => {
//       player.getPlayerState().then((state) => {
//         // 1 == 'playing'
//         if (state === 1) {
//           done();
//         }
//
//         return state;
//       })
//       .catch((err) => {
//         done(null, err);
//       });
//     });
//   });
//
//   it('should allow for pausing the video', (done) => {
//     playerComponent.setPlaybackState('paused');
//     player.on('stateChange', () => {
//       player.getPlayerState().then((state) => {
//         // 1 == 'playing'
//         if (state === 2) {
//           done();
//         }
//
//         return state;
//       })
//       .catch((err) => {
//         done(null, err);
//       });
//     });
//   });
//
//   it('should allow for changing the currently playing videos', function (done) {
//     this.slow(200);
//     playerComponent.cueVideoId('M7lc1UVf-VE');
//     let finished;
//
//     finished = false;
//     player.on('stateChange', () => {
//       player.getVideoUrl().then((url) => {
//         if (url.indexOf('M7lc1UVf-VE') !== -1 && !finished) {
//           finished = true;
//           done();
//         }
//
//         return url;
//       })
//       .catch((err) => {
//         done(null, err);
//       });
//     });
//   });
// });
