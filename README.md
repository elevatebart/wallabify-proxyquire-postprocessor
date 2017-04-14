# wallabify-proxyquire-postprocessor
prepackaging of the solution to the [proxyquire issue of wallabify](https://github.com/wallabyjs/wallabify/issues/2)

If you want to contribute or report bugs [GitHub](https://github.com/elevatebart/wallabify-proxyquire-postprocessor)

### Example
``` js
var wallabyProxyquirePostprocessor = require('wallabify-proxyquire-postprocessor')({
    // browserify options, such as
      debug: true,
      plugin: ['proxyquire-universal'],
    },
    // you may also pass an initializer function to chain other
    // browserify options, such as transformers
    b => b.exclude('mkdirp').transform(require('babelify')),
    // IMPORTANT: list all variables that you assign like var proxyquire = require('proxyquireify')(require);
    ['proxyquire']
);
```

### Sample

Go check out the sample. Follow the link.
[Sample](https://github.com/elevatebart/sample-wallabify-proxiquire)
