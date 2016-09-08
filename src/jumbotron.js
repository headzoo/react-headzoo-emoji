'use strict';

var React  = require('react');

var Jumbotron = React.createClass({
    render: function () {
        return (
            <div className="jumbotron">
                <h1 className="page-title">Emoji React Component</h1>
                <code className="code-npm-install">npm i --save react-headzoo-emoji</code>
                <p className="lead">
                    React component wrapper for the <a href="https://github.com/twitter/twemoji">twemoji</a> library
                    which converts unicode emoji into Twitter image emoji.
                    <img src="https://twemoji.maxcdn.com/36x36/1f603.png" className="emoji" alt="😃" />
                </p>
                <p>
                    <a href="https://github.com/headzoo/react-headzoo-emoji" className="btn btn-primary btn-project">
                        <img src="images/github.png" alt="Github" />
                        <span>Project on Github</span>
                    </a>
                    <a href="https://www.npmjs.com/package/react-headzoo-emoji" className="btn btn-primary btn-project">
                        <img src="images/npm.png" alt="npm" />
                        <span>Project on npm</span>
                    </a>
                </p>
            </div>
        )
    }
});

module.exports = Jumbotron;
