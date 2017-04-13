var wallabify = require('wallabify');
var proxyquireify = require('proxyquireify');

function makePrelude(variableNames) {

    var prelude = require('fs').readFileSync(require('path').join(__dirname, '/../proxyquireify/lib/prelude.js')).toString();
    require('proxyquireify/lib/find-dependencies');
    require.cache[require.resolve('proxyquireify/lib/find-dependencies')].exports = function(src) {
        if (!/require\(.+proxyquireify.+\)/.test(src)) return [];
        var hash = variableNames
            .map(function(name) {
                return require('proxyquireify/node_modules/detective')(src, {
                    word: name
                });
            })
            .reduce(function(acc, arr) {
                arr.forEach(function(x) {
                    acc[x] = true;
                });
                return acc;
            }, {});
        return Object.keys(hash);
    };
    return prelude;
}

module.exports = function(browserifyOpts, arg2, arg3){
    var variableNames, initializer;
    if(typeof arg2 === 'object' && arg3 === undefined){
        variableNames = arg2;
        initializer = function (b) {
            // we don't need anything but proxyquireify transform
            return b.transform(require('proxyquireify/lib/transform'));
        }
    }else if(typeof arg2 === 'function' && typeof arg3 === 'object'){
        initializer = function(b){
            return arg2(b).transform(require('proxyquireify/lib/transform'));
        };
        variableNames = arg3;
    }
    browserifyOpts.prelude = makePrelude(variableNames);
    return wallabify(browserifyOpts, initializer);
};
