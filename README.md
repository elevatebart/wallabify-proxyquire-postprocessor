# wallabify-proxyquire-postprocessor
prepackaging of the solution to the [proxyquire issue of wallabify](https://github.com/wallabyjs/wallabify/issues/2)

If you want to contribute or report bugs [GitHub](https://github.com/elevatebart/wallabify-proxyquire-postprocessor)

###Example of use
``` js
var wallabyProxyquirePostprocessor = require('wallabify-proxyquire-postprocessor')({
    // browserify options, such as
      debug: true,
      plugin: ['proxyquire-universal'],
    },
    function (b) {
        // we don't need anything but proxyquireify transform
        return b.transform(require('proxyquireify/lib/transform'));
    },
    // IMPORTANT: list all variables that you assign like var proxyquire = require('proxyquireify')(require);
    ['proxyquire']
);