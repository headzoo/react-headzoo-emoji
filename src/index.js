'use strict';

const React                 = require('react');
const CSSPropertyOperations = require('react/lib/CSSPropertyOperations');
const twemoji               = require('twemoji');

/**
 * @type {string[]}
 */
const IMG_EXTENSIONS = ['.png', '.gif', '.jpg', '.jpeg', '.bmp', '.webp', '.svg', '.svgz'];

/**
 *
 * @type {{size: number, base: string, ext: string, tag: string, imgClassName: string, imgStyle: {}, imgTitle: string, onParse: null, onComplete: null, onError: Function}}
 */
var global_props = {
    size         : 72,
    base         : 'https://twemoji.maxcdn.com',
    ext          : '.png',
    tag          : 'SPAN',
    imgClassName : 'emoji',
    imgStyle     : {},
    imgTitle     : '',
    onParse      : null,
    onComplete   : null,
    onError      : function() {}
};

/**
 * Sets prop values which are applied to all emoji elements
 *
 * @param {Object} props
 */
function setGlobalProps(props) {
    ObjectAssign(global_props, props);
}

/**
 * Returns the global properties
 *
 * @returns {{size: number, base: string, ext: string, imgClassName: string, imgStyle: {}, imgTitle: string, onParse: null}}
 */
function getGlobalProps() {
    return global_props;
}

/**
 * Parses the given string or DOM element
 *
 * @param {string|HTMLElement} element The source to parse and enrich with emoji
 * @param {object}             [opts]  Parse options
 * @returns {string|HTMLElement}
 */
function parse(element, opts) {
    opts = ObjectAssign({}, global_props, opts);
    let pre_images = [],
        pre_length = 0;
    
    if (opts.complete && opts.complete.length > 0) {
        let images = element.getElementsByTagName('img');
        pre_length = images.length;
        for(let i = 0; i < pre_length; i++) {
            pre_images.push(images[i]);
        }
    }
    
    let parsed = twemoji.parse(element, {
        size       : parseInt(opts.size),
        base       : opts.base.replace(/\/$/, ''),
        ext        : opts.ext,
        className  : opts.imgClassName,
        callback   : opts.callback,
        attributes : opts.attributes,
        onerror    : opts.onerror
    });
    
    if (opts.complete) {
        if (opts.complete.length == 0) {
            opts.complete();
        } else {
            let new_images  = [];
            let post_images = element.getElementsByTagName('img');
            let post_length = post_images.length;
            if (post_length > pre_length) {
                for (let i = 0; i < post_length; i++) {
                    if (pre_length == 0) {
                        new_images.push(post_images[i]);
                    } else {
                        for (let y = 0; y < pre_length; y++) {
                            if (post_images[i].outerHTML !== pre_images[y].outerHTML) {
                                new_images.push(post_images[i]);
                            }
                        }
                    }
                }
            }
            
            opts.complete(new_images);
        }
    }
    
    return parsed;
}

/**
 * For given an HEX codepoint, returns UTF16 surrogate pairs
 *
 * @param {string} codepoint Generic codepoint, i.e. '1F4A9'
 * @returns {string}
 */
function fromCodePoint(codepoint) {
    return twemoji.convert.fromCodePoint(codepoint);
}

/**
 * For given UTF16 surrogate pairs, returns the equivalent HEX codepoint
 *
 * @param {string} surrogates Generic utf16 surrogates pair, i.e. \uD83D\uDCA9
 * @param {string} [sep]      Optional separator for double code points, default='-'
 * @returns {string}
 */
function toCodePoint(surrogates, sep) {
    return twemoji.convert.toCodePoint(surrogates, sep);
}

/**
 * Element which parses utf8 emoji found in the element children
 *
 * @type {*|{}}
 */
var Emoji = React.createClass({
    statics: {
        setGlobalProps,
        getGlobalProps,
        parse,
        fromCodePoint,
        toCodePoint
    },
    
    propTypes: {
        size         : React.PropTypes.oneOf([16, 36, 72, '16', '36', '72']),
        base         : React.PropTypes.string.isRequired,
        tag          : React.PropTypes.string,
        imgClassName : React.PropTypes.string,
        imgStyle     : React.PropTypes.object,
        imgTitle     : React.PropTypes.string,
        ext          : React.PropTypes.oneOf(IMG_EXTENSIONS).isRequired,
        onParse      : React.PropTypes.func,
        onComplete   : React.PropTypes.func,
        onError      : React.PropTypes.func
    },
    
    componentDidMount: function() {
        this.key = 0;
        this._parse();
    },
    
    componentWillUpdate() {
        // Further calls to twemoji.parse() will fail unless we change the
        // component key with each update.
        this.key++;
    },
    
    componentDidUpdate: function() {
        this._parse();
    },
    
    /**
     *
     * @returns {{size: number}}
     */
    getDefaultProps: function() {
        return global_props
    },
    
    /**
     * @returns {XML}
     */
    render: function () {
        var props = ObjectOmit(this.props, ObjectKeys(Emoji.propTypes));
        props.ref = "root";
        props.key = this.key;
        
        return React.createElement(this.props.tag, props, this.props.children);
    },
    
    /**
     * @private
     */
    _parse: function() {
        parse(this.refs.root, {
            size         : parseInt(this.props.size),
            base         : this.props.base.replace(/\/$/, ''),
            ext          : this.props.ext,
            imgClassName : this.props.imgClassName,
            callback     : this._callback,
            attributes   : this._attributes,
            complete     : this.props.onComplete,
            onerror      : this.props.onError
        });
    },
    
    /**
     * @param {string} icon
     * @param {Object} options
     * @returns {*}
     * @private
     */
    _callback: function(icon, options) {
        var opts = {
            icon : icon,
            base : options.base,
            size : options.size,
            ext  : options.ext
        };
        if (this.props.onParse) {
            if (this.props.onParse(opts) === false) {
                return false;
            }
        }
        
        return `${opts.base}/${opts.size}/${opts.icon}${opts.ext}`;
    },
    
    /**
     * @returns {{}}
     * @private
     */
    _attributes: function() {
        var attribs = {};
        if (this.props.imgTitle) {
            attribs.title = this.props.imgTitle;
        }
        if (this.props.imgStyle) {
            attribs.style = CSSPropertyOperations.createMarkupForStyles(this.props.imgStyle, null);
        }
        
        return attribs;
    }
});

const HAS_ENUM_BUG = !({ toString: null }).propertyIsEnumerable('toString');
const DONT_ENUM = [
    'toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'constructor'
];
const DONT_ENUM_LENGTH = DONT_ENUM.length;

/**
 * @param {Object} obj
 * @returns {Array}
 */
function ObjectKeys(obj) {
    if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('ObjectKeys called on non-object');
    }
    
    var result = [], prop, i;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            result.push(prop);
        }
    }
    if (HAS_ENUM_BUG) {
        for (i = 0; i < DONT_ENUM_LENGTH; i++) {
            if (obj.hasOwnProperty(DONT_ENUM[i])) {
                result.push(DONT_ENUM[i]);
            }
        }
    }
    
    return result;
}

/**
 * @param {Object} target
 * @returns {*}
 */
function ObjectAssign(target) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    
    target = Object(target);
    var index, source, key;
    for (index = 1; index < arguments.length; index++) {
        source = arguments[index];
        if (source != null) {
            for (key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    
    return target;
}

/**
 * @param {Object} obj
 * @param {Array} props
 * @returns {{}}
 */
function ObjectOmit(obj, props) {
    var new_obj = {}, key;
    for(key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (props.indexOf(key) === -1) {
                new_obj[key] = obj[key];
            }
        }
    }
    
    return new_obj;
}

module.exports = Emoji;
