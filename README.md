React Emoji Component
=====================
React component wrapper for the [twemoji](https://github.com/twitter/twemoji) library
which converts unicode codepoints into emoji images.

[![Build Status](https://img.shields.io/travis/headzoo/react-headzoo-emoji/master.svg?style=flat-square)](https://travis-ci.org/headzoo/react-headzoo-emoji)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/headzoo/surf/master/LICENSE.md)

### Installation

`npm install --save react-headzoo-emoji`


### Usage

Wrap content where emoji should be converted into images. By default
the emoji are converted into images which are hosted from
[maxcdn.com](https://www.maxcdn.com/).

```jsx
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


### Test

```sh
npm run test
```

### Build

```sh
npm run build
```