// var jsdom = require('mocha-jsdom')
var jsdom = require('jsdom');

// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {userAgent: 'node.js'}
// var $ = require('jquery')
import React from 'react'
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import reactYoutubePlayer from '../../src';
import { shallow } from 'enzyme';


var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Todo-item component', function(){
  
    beforeEach(function() {
          const wrapper = shallow( <reactYoutubePlayer
              videoId='M7lc1UVf-VE'
              width='640'
              height='360'
              playbackState='unstarted'/>);
    });


  it('reactYoutubePlayer should be isDOMComponent"', function() {
       this.renderedComponent = TestUtils.renderIntoDocument(
      <reactYoutubePlayer
            videoId='M7lc1UVf-VE'
            width='640'
            height='360'
            playbackState='unstarted'/>
    );
    expect(TestUtils.isDOMComponent(this.renderedComponent)).to.equal(true)
  });

    it('General Tests', () => {
    const wrapper = shallow( <reactYoutubePlayer
              videoId='M7lc1UVf-VE'
              width='640'
              height='360'
              playbackState='unstarted'/>);
    expect(wrapper.props().videoId).to.equal('M7lc1UVf-VE');
    expect(wrapper.props().playbackState).to.equal('unstarted');
  });

    it('ReactVideoPlayer playing', () => {
    const wrapper = shallow( <reactYoutubePlayer
        videoId='M7lc1UVf-VE'
        width='640'
        height='360'
        playbackState='playing'/>);
    expect(wrapper.props().playbackState).to.equal('playing');
    // expect(wrapper.props().playbackState).to.equal('unstarted');
  });


    // expect(box.props.className).toEqual("invitation-list-container");
  

});