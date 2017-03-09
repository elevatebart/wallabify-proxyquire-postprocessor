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

module.exports = function(browserifyOpts, initializer, variableNames){
    browserifyOpts.prelude = makePrelude(variableNames);
    return wallabify(browserifyOpts, initializer);
};