'use strict';

var React         = require('react');
var JSON5         = require('json5');
var default_props = require('./props');

var FormGroup = React.createClass({
    getDefaultProps: function () {
        return {
            id: '',
            label: '',
            cols: '6',
            className: '',
            error: false
        }
    },
    
    render: function () {
        return (
            <div className={'form-group col-xs-' + this.props.cols + ' ' + this.props.className + (this.props.error ? ' has-danger' : '')}>
                {this.props.label != ''
                ? <label htmlFor={this.props.id}>{this.props.label}</label>
                : null}
                {this.props.children}
            </div>
        )
    }
});

var PropsForm = React.createClass({
    
    getDefaultProps: function () {
        return {
            onChange: function () {}
        }
    },
    
    getInitialState: function () {
        return default_props();
    },
    
    render: function () {
        return (
            <section>
                <h2>Demo</h2>
                <p>
                    Each of the component properties may be changed using this form.
                    Changing the values updates the preview below the form.
                </p>
                
                <FormGroup
                    id="form-input-base"
                    cols="12"
                    label="base">
                    <input
                        name="base"
                        type="text"
                        className="form-control form-control-sm"
                        id="form-input-base"
                        value={this.state.base}
                        onChange={this.onChange}/>
                    <p className="form-text text-muted">
                        Sets the base URL for the emoji images.
                        When hosting emoji images on your own server,
                        set this to <code>http://[your domain]/[path to emoji images]/</code>.
                        For example <code>http://yoursite.com/images/emoji</code>.
                    </p>
                </FormGroup>
                
                <FormGroup id="form-select-size" className="pad-right" label="size">
                    <select name="size" className="form-control form-control-sm" id="form-select-size"
                            value={this.state.size} onChange={this.onChange}>
                        <option>16</option>
                        <option>36</option>
                        <option>72</option>
                    </select>
                    <p className="form-text text-muted">
                        Determines the size of the emoji image.
                    </p>
                </FormGroup>
                
                <FormGroup id="form-select-ext" className="pad-left" label="ext">
                    <select name="ext" className="form-control form-control-sm" id="form-select-ext"
                            value={this.state.ext} onChange={this.onChange}>
                        <option>.png</option>
                        <option>.gif</option>
                        <option>.jpg</option>
                        <option>.bmp</option>
                        <option>.webp</option>
                        <option>.svg</option>
                    </select>
                    <p className="form-text text-muted">
                        Sets the emoji image file extension.
                    </p>
                </FormGroup>
                
                <FormGroup id="form-input-tag" className="pad-right" label="tag">
                    <input
                        name="tag"
                        type="text"
                        className="form-control form-control-sm"
                        id="form-input-tag"
                        value={this.state.tag}
                        onChange={this.onChange}/>
                    <p className="form-text text-muted">
                        Sets the container HTML tag.
                    </p>
                </FormGroup>
    
                <FormGroup id="form-input-img-title" className="pad-left" label="imgTitle">
                    <input
                        name="imgTitle"
                        type="text"
                        className="form-control form-control-sm"
                        id="form-input-img-title"
                        value={this.state.imgTitle}
                        onChange={this.onChange}/>
                    <p className="form-text text-muted">
                        Title attribute added to each <code>&lt;img&gt;</code> tag.
                    </p>
                </FormGroup>
                
                <FormGroup id="form-input-img-class-name" className="pad-right" label="imgClassName">
                    <input
                        name="imgClassName"
                        type="text"
                        className="form-control form-control-sm"
                        id="form-input-img-class-name"
                        value={this.state.imgClassName}
                        onChange={this.onChange}/>
                    <p className="form-text text-muted">
                        CSS class added to each <code>&lt;img&gt;</code> tag.
                    </p>
                </FormGroup>
                
                <FormGroup id="form-input-img-style" className="pad-left" label="imgStyle" error={this.state.imgStyleError}>
                    <input
                        name="imgStyle"
                        type="text"
                        className="form-control form-control-sm"
                        id="form-input-img-style"
                        value={this.state.imgStyle}
                        onChange={this.onChange}/>
                    <p className="form-text text-muted">
                        Styles added to each <code>&lt;img&gt;</code> tag.
                    </p>
                </FormGroup>
                
                <FormGroup id="form-textarea-text" cols="12" label="children">
                    <textarea
                        name="text"
                        className="form-control form-control-sm"
                        id="form-textarea-text"
                        value={this.state.text}
                        onChange={this.onChange} />
                    <p className="form-text text-muted">
                        Enter text containing unicode emoji that will be parsed by the component.
                        Unicode emoji codes can be found at <a href="https://twitter.github.io/twemoji/preview.html" target="_blank">twitter.github.io</a>.
                    </p>
                </FormGroup>
                
                <div className="form-group col-xs-12 text-xs-right">
                    <button className="btn btn-primary btn-reset" onClick={this.onReset}>Reset</button>
                </div>
                <div className="clearfix"></div>
            </section>
        )
    },
    
    onChange: function (e) {
        var update = JSON.parse(JSON.stringify(this.state));
        update.imgStyleError  = '';
        update[e.target.name] = e.target.value;
        
        if (e.target.name == 'imgStyle') {
            try {
                JSON5.parse(update.imgStyle);
            } catch (err) {
                setTimeout(function() {
                    this.setState({imgStyleError: false});
                }.bind(this), 2000);
                return this.setState({imgStyleError: true});
            }
        }
        
        this.setState(update);
        this.props.onChange(update);
    },
    
    onReset: function () {
        this.setState(default_props());
        this.props.onChange(default_props());
    }
});

module.exports = PropsForm;
