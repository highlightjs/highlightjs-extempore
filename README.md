# highlightjs-xtlang

`Highlight.js` syntax definition for xtlang.

For more about Highlight.js , see https://highlightjs.org/

The xtlang is language used in Extempore(https://extemporelang.github.io/).
This is a mixture of Scheme and xtlang, really.

## Usage

Simply include the `Highlight.js ` script package in your webpage or node app, load up this module and apply it to `hljs`.

If you're not using a build system and just want to embed this in your webpage:

```html
<script type="text/javascript" src="/path/to/highlight.pack.js"></script>
<script type="text/javascript" src="/path/to/highlightjs-xtlang/xtlang.js"></script>
<script type="text/javascript">
    hljs.registerLanguage('xtlang', window.hljsDefineXtlang);
    hljs.initHighlightingOnLoad();
</script>
```

If you're using webpack / rollup / browserify / node:

```javascript
var hljs = require('highlightjs');
var hljsDefineXtlang = require('highlightjs-xtlang');

hljsDefineXtlang(hljs);
hljs.initHighlightingOnLoad();
```

## License

```highlightjs-xtlang``` is released under the BSD License. See [LICENSE][1] file for details.

[1]: https://github.com/highlightjs/highlightjs-xtlang/blob/master/LICENSE
