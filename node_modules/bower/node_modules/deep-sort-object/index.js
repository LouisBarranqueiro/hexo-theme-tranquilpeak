'use strict';

var isPlainObject = require('mout/lang/isPlainObject');

function defaultSortFn(a, b) {
    return a.localeCompare(b);
}

function sort(src, comparator) {
    var out;

    if (Array.isArray(src)) {
        return src.map(function (item) {
            return sort(item, comparator);
        });
    }

    if (isPlainObject(src)) {
        out = {};

        Object.keys(src).sort(comparator || defaultSortFn).forEach(function (key) {
            out[key] = sort(src[key], comparator);
        });

        return out;
    }

    return src;
}

module.exports = sort;
