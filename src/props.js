'use strict';

module.exports = function() {
    return {
        base: 'https://twemoji.maxcdn.com',
        size: '16',
        ext: '.png',
        tag: 'span',
        imgClassName: 'my-emoji',
        imgStyle: "{marginRight: '0.25rem', verticalAlign: 'text-top'}",
        imgTitle: 'Emoji!',
        
        text: 'Welcome to the <strong>react-headzoo-emoji</strong> demo! 😀😜😎',
        imgStyleError: false
    }
};