(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react/lib/CSSPropertyOperations"), require("twemoji"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react/lib/CSSPropertyOperations", "twemoji"], factory);
	else if(typeof exports === 'object')
		exports["react-headzoo-emoji"] = factory(require("react"), require("react/lib/CSSPropertyOperations"), require("twemoji"));
	else
		root["react-headzoo-emoji"] = factory(root["react"], root["react/lib/CSSPropertyOperations"], root["twemoji"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var React = __webpack_require__(1);
	var CSSPropertyOperations = __webpack_require__(2);
	var twemoji = __webpack_require__(3);

	/**
	 * @type {string[]}
	 */
	var IMG_EXTENSIONS = ['.png', '.gif', '.jpg', '.jpeg', '.bmp', '.webp', '.svg', '.svgz'];

	/**
	 *
	 * @type {{size: number, base: string, ext: string, tag: string, imgClassName: string, imgStyle: {}, imgTitle: string, onParse: null, onComplete: null, onError: Function}}
	 */
	var global_props = {
	    size: 72,
	    base: 'https://twemoji.maxcdn.com',
	    ext: '.png',
	    tag: 'SPAN',
	    imgClassName: 'emoji',
	    imgStyle: {},
	    imgTitle: '',
	    onParse: null,
	    onComplete: null,
	    onError: function onError() {}
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
	    var pre_images = [],
	        pre_length = 0;

	    if (opts.complete && opts.complete.length > 0) {
	        var images = element.getElementsByTagName('img');
	        pre_length = images.length;
	        for (var i = 0; i < pre_length; i++) {
	            pre_images.push(images[i]);
	        }
	    }

	    var parsed = twemoji.parse(element, {
	        size: parseInt(opts.size),
	        base: opts.base.replace(/\/$/, ''),
	        ext: opts.ext,
	        className: opts.imgClassName,
	        callback: opts.callback,
	        attributes: opts.attributes,
	        onerror: opts.onerror
	    });

	    if (opts.complete) {
	        if (opts.complete.length == 0) {
	            opts.complete();
	        } else {
	            var new_images = [];
	            var post_images = element.getElementsByTagName('img');
	            var post_length = post_images.length;
	            if (post_length > pre_length) {
	                for (var _i = 0; _i < post_length; _i++) {
	                    if (pre_length == 0) {
	                        new_images.push(post_images[_i]);
	                    } else {
	                        for (var y = 0; y < pre_length; y++) {
	                            if (post_images[_i].outerHTML !== pre_images[y].outerHTML) {
	                                new_images.push(post_images[_i]);
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
	    displayName: 'Emoji',

	    statics: {
	        setGlobalProps: setGlobalProps,
	        getGlobalProps: getGlobalProps,
	        parse: parse,
	        fromCodePoint: fromCodePoint,
	        toCodePoint: toCodePoint
	    },

	    propTypes: {
	        size: React.PropTypes.oneOf([16, 36, 72, '16', '36', '72']),
	        base: React.PropTypes.string.isRequired,
	        tag: React.PropTypes.string,
	        imgClassName: React.PropTypes.string,
	        imgStyle: React.PropTypes.object,
	        imgTitle: React.PropTypes.string,
	        ext: React.PropTypes.oneOf(IMG_EXTENSIONS).isRequired,
	        onParse: React.PropTypes.func,
	        onComplete: React.PropTypes.func,
	        onError: React.PropTypes.func
	    },

	    componentDidMount: function componentDidMount() {
	        this.key = 0;
	        this._parse();
	    },

	    componentWillUpdate: function componentWillUpdate() {
	        // Further calls to twemoji.parse() will fail unless we change the
	        // component key with each update.
	        this.key++;
	    },


	    componentDidUpdate: function componentDidUpdate() {
	        this._parse();
	    },

	    /**
	     *
	     * @returns {{size: number}}
	     */
	    getDefaultProps: function getDefaultProps() {
	        return global_props;
	    },

	    /**
	     * @returns {XML}
	     */
	    render: function render() {
	        var props = ObjectOmit(this.props, ObjectKeys(Emoji.propTypes));
	        props.ref = "root";
	        props.key = this.key;

	        return React.createElement(this.props.tag, props, this.props.children);
	    },

	    /**
	     * @private
	     */
	    _parse: function _parse() {
	        parse(this.refs.root, {
	            size: parseInt(this.props.size),
	            base: this.props.base.replace(/\/$/, ''),
	            ext: this.props.ext,
	            imgClassName: this.props.imgClassName,
	            callback: this._callback,
	            attributes: this._attributes,
	            complete: this.props.onComplete,
	            onerror: this.props.onError
	        });
	    },

	    /**
	     * @param {string} icon
	     * @param {Object} options
	     * @returns {*}
	     * @private
	     */
	    _callback: function _callback(icon, options) {
	        var opts = {
	            icon: icon,
	            base: options.base,
	            size: options.size,
	            ext: options.ext
	        };
	        if (this.props.onParse) {
	            if (this.props.onParse(opts) === false) {
	                return false;
	            }
	        }

	        return opts.base + '/' + opts.size + '/' + opts.icon + opts.ext;
	    },

	    /**
	     * @returns {{}}
	     * @private
	     */
	    _attributes: function _attributes() {
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

	var HAS_ENUM_BUG = !{ toString: null }.propertyIsEnumerable('toString');
	var DONT_ENUM = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
	var DONT_ENUM_LENGTH = DONT_ENUM.length;

	/**
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function ObjectKeys(obj) {
	    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
	        throw new TypeError('ObjectKeys called on non-object');
	    }

	    var result = [],
	        prop,
	        i;
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
	    var new_obj = {},
	        key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            if (props.indexOf(key) === -1) {
	                new_obj[key] = obj[key];
	            }
	        }
	    }

	    return new_obj;
	}

	module.exports = Emoji;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;