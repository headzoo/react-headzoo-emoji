React Emoji Component
=====================
React component wrapper for the [twemoji](https://github.com/twitter/twemoji) library
which converts unicode emoji codepoints into emoji images.

A demo is available at http://headzoo.io/react-headzoo-emoji.

[![Build Status](https://img.shields.io/travis/headzoo/react-headzoo-emoji/master.svg?style=flat-square)](https://travis-ci.org/headzoo/react-headzoo-emoji)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/headzoo/surf/master/LICENSE.md)

### Installation

`npm install --save react-headzoo-emoji`


### Usage

Wrap content where emoji should be converted into images. By default
the emoji are converted into images which are hosted from
[maxcdn.com](https://www.maxcdn.com/).

```jsx
var React = require('react');
var Emoji = require('react-headzoo-emoji');

var Component = React.createClass({
    render: function() {
        return (
            <div>
                <Emoji>
                    Hello, World! 😀
                </Emoji>
            </div>
        )
    }
});
```

Will produce the following HTML.

```html
<div>
    <span>
        Hello, World! <img src="https://twemoji.maxcdn.com/72x72/1f600.png" class="emoji" alt="😀" />
    </span>
</div>
```


### Properties

`size`         Default = 72, Possible values: 16, 36, and 72  
The emoji images are available in three sizes: 16x16, 36x36, and 72x72. The
value of this prop determines which size to use.

```jsx
<Emoji size={16}>
    Hello, World! 😀
</Emoji>
```


`base`         Default = 'https://twemoji.maxcdn.com'  
Changes the base URL for the emoji images. Can be an absolute URL or a
path.

```jsx
<Emoji base="http://yoursite.com/images/emoji">
    Hello, World! 😀
</Emoji>
```


`ext`          Default = '.png', Possible values: '.png', '.gif', '.jpg', '.jpeg', '.bmp', '.webp', '.svg', '.svgz'  
Specifies the file extension for self hosted emoji images.

```jsx
<Emoji ext=".gif">
    Hello, World! 😀
</Emoji>
```


`tag`          Default = 'SPAN'  
By default the component wraps it's children in a `<span>` tag, but any
tag may be used.

```jsx
<Emoji tag="div">
    Hello, World! 😀
</Emoji>
```


`imgClassName` Default = 'emoji'  
Specifies the name of a CSS class which will be added to each created `<img>`
tag.

```jsx
<Emoji imgClassName="site-emoji">
    Hello, World! 😀
</Emoji>
```

Outputs.

```html
<span>
    Hello, World! <img src="https://twemoji.maxcdn.com/72x72/1f600.png" class="site-emoji" alt="😀" />
</span>
```

Note: Use the `className` property to specify the CSS class added to the `<span>`
container.


`imgStyle`     Default = {}  
Specifies CSS styles which will be applied to each created `<img>` tag.

```jsx
<Emoji imgStyle={{paddingTop: '1rem', width: '16px', height: '16px'}}>
    Hello, World! 😀
</Emoji>
```

Outputs.

```html
<span>
    Hello, World! <img src="https://twemoji.maxcdn.com/72x72/1f600.png" style="padding-top:1rem;width:16px;height:16px;" class="emoji" alt="😀" />
</span>
```


`imgTitle`     Default = ''  
Specifies the title that will be added to each created `<img>` tag.

```jsx
<Emoji imgTitle="Emoji">
    Hello, World! 😀
</Emoji>
```

Outputs.

```html
<span>
    Hello, World! <img src="https://twemoji.maxcdn.com/72x72/1f600.png" title="Emoji" class="emoji" alt="😀" />
</span>
```


`onParse`      Default = function(){}  
While the component parses it's children, it calls this function for each
unicode codepoint it finds. The callback receives an object with the following
properties: `icon`, `base`, `size`, and `ext`. Altering the values in the
callback changes the parsed output. The `icon` value contains the hex value
of the codepoint, which is also used as the image filename, sans extension.


`onComplete`   Default = function(){}  
Called when parsing is finished. The callback receives an array of DOM
nodes for each `<img>` that was created. Provides the chance to alter
the images further, add event listeners, etc. Always called when parsing
finishes, even when no emoji were found.


`onError`      Default = function(){}  
Called each time an emoji image fails to load. The callback receives
an object describing the error.

Any other properties are added to the `<span>` container.

```jsx
<Emoji className="emoji-wrapper" imgClassName="site-emoji" style={{opacity: 0.8}} imgStyle={{width: '16px', height: '16px'}}>
    Hello, World! 😀
</Emoji>
```

Outputs.

```html
<span class="emoji-wrapper" style="opacity: 0.8;">
    Hello, World! <img src="https://twemoji.maxcdn.com/72x72/1f600.png" style="width:16px;height:16px;" class="site-emoji" alt="😀" />
</span>
```


### Global Properties

The component includes the `setGlobalProps()` method, which is used to change
the default props used on each component. For instance rather than setting the
`base` prop on every component instance (a value which may change in the
future) you can instead set it once in your bootstrap process use `setGlobalProps()`.

```jsx
var Emoji = require('react-headzoo-emoji');

Emoji.setGlobalProps({
    base: 'http://yoursite.com/images/emoji'
});
```

### Test

```sh
npm run test
```

### Build

```sh
npm run build
```