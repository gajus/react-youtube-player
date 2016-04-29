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
     this.renderedComponent = TestUtils.renderIntoDocument(
        <reactYoutubePlayer
              videoId='M7lc1UVf-VE'
              width='640'
              height='360'
              playbackState='unstarted'/>
      );

    });

    // this.renderedDOM = () => React.findDOMNode(this.renderedComponent);


  it('reactYoutubePlayer should be isDOMComponent"', function() {
    expect(TestUtils.isDOMComponent(this.renderedComponent)).to.equal(true)
     // let box = TestUtils.findRenderedDOMComponentWithTag(this.renderedComponent, "div");
     //  console.log(box.props.playbackState)
  });

    it('renders three <Foo /> components', () => {
    const wrapper = shallow( <reactYoutubePlayer
              videoId='M7lc1UVf-VE'
              width='640'
              height='360'
              playbackState='unstarted'/>);
    expect(wrapper.props().videoId).to.equal('M7lc1UVf-VE');
  });


    // expect(box.props.className).toEqual("invitation-list-container");
  

});