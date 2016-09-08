'use strict';
// http://headzoo.io/react-headzoo-emoji/

var React         = require('react');
var ReactDOM      = require('react-dom');
var JSON5         = require('json5');
var hljs          = require('highlight.js');
var Emoji         = require('react-headzoo-emoji');
var PropsForm     = require('./props_form');
var Jumbotron     = require('./jumbotron');
var formatter     = require('./formatter');
var default_props = require('./props');

var Demo = React.createClass({
    
    getInitialState: function() {
        return {
            html: '',
            prop_options: default_props()
        }
    },
    
    componentDidMount: function() {
        this.setState({html: this.refs.emoji.innerHTML});
        hljs.initHighlightingOnLoad();
    },
    
    componentWillUpdate: function() {
        this.refs.log_complete.innerHTML = '';
        this.refs.log_parse.innerHTML    = '';
        this.refs.log_error.innerHTML    = '';
    },
    
    /**
     * @returns {XML}
     */
    render: function() {
        var props    = this.state.prop_options;
        var imgStyle = JSON5.parse(props.imgStyle);
        
        var usage = `var React = require('react');
var Emoji = require('react-headzoo-emoji');
        
var YourComponent = React.createClass({
        render: function() {
            return (
                <Emoji>
                    Hello, World! 😀
                </Emoji>
            )
        }
});`;

        var output = formatter.formatHTML(
            `<span>Hello, World! <img src="https://twemoji.maxcdn.com/72x72/1f600.png" class="emoji" alt="😀" /></span>`
        );
        
        return (
            <div>
                <div className="container">
                    <Jumbotron />
                    
                    <section>
                        <h2>About</h2>
                        <p>
                            Provides a configurable <code>&lt;Emoji&gt;</code> component which scans its children
                            for <a href="http://unicode.org/emoji/charts/full-emoji-list.html">unicode emoji
                            codepoints</a> (the type used in tweets, gmail, etc) and converts them into images hosted
                            on <a href="https://twemoji.maxcdn.com">twemoji.maxcdn.com</a>.
                        </p>
                    </section>
                    
                    <section>
                        <h2>Usage</h2>
                        <p>
                            Import the component and wrap any content you want parsed.
                        </p>
                        
                        <div className="form-text text-muted">
                            The component searches its children for emoji unicode codepoints.
                        </div>
                        <pre className="tall">
                            <code>
                                {usage}
                            </code>
                        </pre>
                        
                        <div className="form-text text-muted">
                            And converts them into images.
                        </div>
                        <pre>
                            <code>
                                {output}
                            </code>
                        </pre>
                    </section>
                    
                    <PropsForm onChange={this._onPropsChange} />
                    
                    <section>
                        <h2>Preview</h2>
                        <p>
                            Here's what you created.
                        </p>
                        
                        <div className="form-group">
                            <div className="form-text text-muted">
                                React code generated from the property values you chose.
                            </div>
                            <pre className="hljs tall" dangerouslySetInnerHTML={this._createCodeComponent()} />
    
                            <div className="form-text text-muted">
                                Which produces this HTML.
                            </div>
                            <pre className="hljs tall" dangerouslySetInnerHTML={this._createCodeHTML()} />
                            
                            <div className="form-text text-muted">
                                Which looks like this in a browser.
                            </div>
                            <div ref="emoji" className="hljs parsed-output">
                                <Emoji
                                    dangerouslySetInnerHTML={this._createCodeText()}
                                    base={props.base}
                                    size={props.size}
                                    ext={props.ext}
                                    tag={props.tag}
                                    imgClassName={props.imgClassName}
                                    imgStyle={imgStyle}
                                    imgTitle={props.imgTitle}
                                    onComplete={this._onComplete}
                                    onParse={this._onParse}
                                    onError={this._onError}>
                                </Emoji>
                            </div>
                        </div>
                    </section>
                    
                    <h2>Event Callbacks</h2>
                    <p>
                        The component has three callback properties. As you change the demo properties, the logs
                        will update to reflect the arguments passed to each callback.
                    </p>
    
                    <section>
                        <h6>onParse</h6>
                        <p className="form-text text-muted">
                            The onParse event is fired for each unicode emoji found. The callback receives an object
                            detailing the emoji. Provides a chance to alter the emoji details before rendering.
                        </p>
                        <pre ref="log_parse" className="hljs logs"></pre>
                    </section>
                    
                    <section>
                        <h6>onComplete</h6>
                        <p className="form-text text-muted">
                            The onComplete event is fired when parsing is finished. The callback receives an array
                            of <code>&lt;img&gt;</code> DOM nodes for each emoji that was parsed. Provides the chance to alter the
                            images further, add event listeners, etc.
                        </p>
                        <pre ref="log_complete" className="hljs logs"></pre>
                    </section>
    
                    <section>
                        <h6>onError</h6>
                        <p className="form-text text-muted">
                            The onError event is fired for each emoji image that fails to load. Try changing the
                            <code>base</code> property to a non-existent domain, and watch the errors pile up!
                        </p>
                        <pre ref="log_error" className="hljs logs"></pre>
                    </section>
                </div>
                
                <footer className="footer">
                    <p>
                        <small>
                            <a href="https://github.com/headzoo/react-headzoo-emoji/tree/gh-pages">Demo site source code</a>
                        </small>
                    </p>
                    <p>&copy; Sean Hickey 2016</p>
                </footer>
            </div>
        )
    },
    
    _onPropsChange: function(new_props) {
        this.setState({prop_options: new_props});
        setTimeout(function() {
            this.setState({html: this.refs.emoji.innerHTML});
        }.bind(this), 250);
    },
    
    _onComplete: function(images) {
        if (this.refs.log_complete) {
            var html = this.refs.log_complete.innerHTML;
            for(var i = 0; i < images.length; i++) {
                html += '<div>HTMLImageElement {src: "' + images[i].src + '"}' + '</div>';
            }
            this.refs.log_complete.innerHTML = html;
        }
    },
    
    _onParse: function(options) {
        if (this.refs.log_parse) {
            this.refs.log_parse.innerHTML = this.refs.log_parse.innerHTML + '<div>' + JSON.stringify(options) + '</div>';
        }
    },
    
    _onError: function(err) {
        if (this.refs.log_error) {
            this.refs.log_error.innerHTML = this.refs.log_error.innerHTML + '<div>Failed to load ' + err.target.src + '</div>';
        }
    },
    
    _createCodeComponent: function() {
        var props = this.state.prop_options;
        var code  = formatter.removeExtraWhitespace(`<Emoji
                        base="${props.base}"
                        size="${props.size}"
                        ext="${props.ext}"
                        tag="${props.tag}"
                        imgTitle="${props.imgTitle}"
                        imgClassName="${props.imgClassName}"
                        imgStyle=${'{' + props.imgStyle + '}'}>
                        
                        ${this.state.prop_options.text}
                    </Emoji>`);
        
        return {
            __html: hljs.highlight('html', code, true).value
        };
    },
    
    _createCodeHTML: function() {
        var html = formatter.formatHTML(this.state.html)
            .replace(/draggable="false" /g, '');
        
        return {
            __html: hljs.highlight('html', html, true).value
        };
    },
    
    _createCodeText: function() {
        return {
            __html: this.state.prop_options.text
        };
    }
});

ReactDOM.render(
    <Demo />,
    document.getElementById('mount')
);