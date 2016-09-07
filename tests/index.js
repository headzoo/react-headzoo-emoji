'use strict';

var React     = require('react');
var ReactDOM  = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var Emoji     = require('../src/index');

it('Plain text', () => {
    var emoji = TestUtils.renderIntoDocument(
        <Emoji>Hello World!</Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    
    expect(emoji_node.textContent).toEqual('Hello World!');
});

it('To maxcdn.com 16x16', () => {
    var emoji = TestUtils.renderIntoDocument(
        <Emoji size="16">Hello 😍World!</Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    var img = emoji_node.querySelectorAll('img');
    
    expect(img[0].src).toEqual('https://twemoji.maxcdn.com/16x16/1f60d.png');
});

it('To maxcdn.com 72x72', () => {
    var emoji = TestUtils.renderIntoDocument(
        <Emoji size="72">Hello 😍World!</Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    var img = emoji_node.querySelectorAll('img');
    
    expect(img[0].src).toEqual('https://twemoji.maxcdn.com/72x72/1f60d.png');
});

it('To /assets 16x16', () => {
    var emoji = TestUtils.renderIntoDocument(
        <Emoji size="16" base="/assets">Hello 😍World!</Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    var img = emoji_node.querySelectorAll('img');
    
    expect(img[0].src).toEqual('/assets/16x16/1f60d.png');
});

it('imgClassName', () => {
    var emoji = TestUtils.renderIntoDocument(
        <Emoji imgClassName="testing">Hello 😍World!</Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    var img = emoji_node.querySelectorAll('img');
    
    expect(img[0].getAttribute('class')).toEqual('testing');
});

it('imgStyle', () => {
    var emoji = TestUtils.renderIntoDocument(
        <Emoji imgStyle={{height: '32px', width: '32px'}}>Hello 😍World!</Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    var img = emoji_node.querySelectorAll('img');
    
    expect(img[0].getAttribute('style')).toEqual('height:32px;width:32px;');
});

it('imgTitle', () => {
    var emoji = TestUtils.renderIntoDocument(
        <Emoji imgTitle="Testing">Hello 😍World!</Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    var img = emoji_node.querySelectorAll('img');
    
    expect(img[0].getAttribute('title')).toEqual('Testing');
});

it('ext', () => {
    var emoji = TestUtils.renderIntoDocument(
        <Emoji ext=".gif">Hello 😍World!</Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    var img = emoji_node.querySelectorAll('img');
    
    expect(img[0].src).toEqual('https://twemoji.maxcdn.com/72x72/1f60d.gif');
});

it('tag', () => {
    var emoji = TestUtils.renderIntoDocument(
        <Emoji>Hello 😍World!</Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    
    expect(emoji_node.tagName).toEqual('SPAN');
    
    emoji = TestUtils.renderIntoDocument(
        <Emoji tag="div">Hello 😍World!</Emoji>
    );
    emoji_node = ReactDOM.findDOMNode(emoji);
    
    expect(emoji_node.tagName).toEqual('DIV');
});

it('onParse', () => {
    var calls = 0;
    var onParse = function() {
        calls++;
    };
    TestUtils.renderIntoDocument(
        <Emoji onParse={onParse}>Hello 😍😈World!</Emoji>
    );
    
    expect(calls).toEqual(2);
});

it('onComplete', () => {
    var calls  = 0;
    var images = 0;
    var onComplete = function(res) {
        calls++;
        images = res.length;
    };
    var emoji = TestUtils.renderIntoDocument(
        <Emoji onComplete={onComplete}>Hello 😍😈World! <img /></Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    
    expect(calls).toEqual(1);
    expect(images).toEqual(2);
    expect(emoji_node.getElementsByTagName('img').length).toEqual(3);
});

it('Expanded props', () => {
    var emoji = TestUtils.renderIntoDocument(
        <Emoji className="testing" style={{opacity: 1}} title="Testing">Hello 😍World!</Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    
    expect(emoji_node.getAttribute('class')).toEqual('testing');
    expect(emoji_node.getAttribute('style')).toEqual('opacity: 1;');
    expect(emoji_node.getAttribute('title')).toEqual('Testing');
});

it('Static methods', () => {
    var str = Emoji.parse('Hello 😍 World!');
    expect(str).toEqual('Hello <img class="emoji" draggable="false" alt="😍" src="https://twemoji.maxcdn.com72x72/1f60d.png"> World!');
    
    str = Emoji.fromCodePoint('1f1e8');
    expect(str).toEqual('🇨');
    
    str = Emoji.toCodePoint(str);
    expect(str).toEqual('1f1e8');
});

it('setGlobalProps', () => {
    Emoji.setGlobalProps({
        base: '/assets',
        size: 36,
        ext: '.gif'
    });
    var emoji = TestUtils.renderIntoDocument(
        <Emoji>Hello 😍World!</Emoji>
    );
    var emoji_node = ReactDOM.findDOMNode(emoji);
    var img = emoji_node.querySelectorAll('img');
    
    expect(img[0].src).toEqual('/assets/36x36/1f60d.gif');
});