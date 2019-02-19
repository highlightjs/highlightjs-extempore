# highlightjs-xtlang

[![Greenkeeper badge](https://badges.greenkeeper.io/highlightjs/highlightjs-xtlang.svg)](https://greenkeeper.io/)

`highlight.js` syntax definition for
[Extempore](https://extemporelang.github.io/) source code. Because of the way
that Extempore works, it's really two languages---Scheme and xtlang.

For more about highlight.js, see <https://highlightjs.org/>

## Usage

Currently there is a [problem with
highlight.js](https://github.com/highlightjs/highlight.js/pull/1888), we can not
use this repository independently.

Therefore, we need to copy [highlight.js
source](https://github.com/highlightjs/highlight.js/blob/master/src/highlight.js)
and [highlightjs-xtlang
source](https://github.com/highlightjs/highlightjs-xtlang/blob/master/xtlang.js)
to path/js/hightlight/ . Please refer to
[here](https://github.com/extemporelang/extemporelang.github.io/tree/master/js/highlight)
for specific usage.

Alternately, you can [see how Ben does it on his
blog](http://benswift.me/blog/2019/01/17/highlight-js-with-xtlang-support/).

## License

`highlightjs-xtlang` is released under the BSD License. See [LICENSE][1] file
for details.

[1]: https://github.com/highlightjs/highlightjs-xtlang/blob/master/LICENSE
