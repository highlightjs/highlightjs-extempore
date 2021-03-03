# highlightjs-extempore

`highlight.js` syntax definition for
[Extempore][1] source code. Because of the way
that Extempore works, it's really two languages---Scheme and xtlang.

For more about highlight.js, see <https://highlightjs.org/>

## Usage

Simply include the Highlight.js library in your webpage or Node app, then load this module.

### Static website or simple usage

Simply load the module after loading Highlight.js. You'll use the minified version found in the `dist` directory. This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/extempore.min.js"></script>
<script type="text/javascript">
  hljs.highlightAll();
</script>
>
```

## Using directly from the UNPKG CDN

```html
<script type="text/javascript"
  src="https://unpkg.com/highlightjs-extempore@latest/dist/extempore.min.js"></script>
```

- More info: <https://unpkg.com>

## With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlightjs');
var hljsExtempore = require('highlightjs-extempore');

hljs.registerLanguage("extempore", hljsExtempore);
hljs.highlightAll();
```

## License

`highlightjs-extempore` is released under the BSD License. See [LICENSE][2] file
for details.

### Author

Yuya Chiba([@cyblue9][3]) <cy.blue.9@gmail.com>

### Maintainer

Yuya Chiba([@cyblue9][3]) <cy.blue.9@gmail.com>

## Links

- The official site for the Highlight.js library is <https://highlightjs.org/>
- The Highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
- Learn more about extempore: <https://extemporelang.github.io/>

[1]:https://extemporelang.github.io/
[2]: https://github.com/highlightjs/highlightjs-extempore/blob/master/LICENSE
[3]: https://github.com/cyblue9
