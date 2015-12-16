'use strict';

/**
 * Resolve asset URL
 * @param url
 * @param from
 * @returns {String}
 */
hexo.extend.helper.register('resolve_asset_url', function(from, url) {
    // resolve asset url with `from` url if url is not remote
    if (from !== null && !this.is_remote_url(url)) {
        // remove .html at the end of url
        if (from.indexOf('.html') >= 0) {
            from = from.replace('.html', '/')
        }
        // add `/` at end of `from` url
        else if (from.length !== from.lastIndexOf('/') + 1) {
            from += '/'
        }
        // remove `/` that prepend `url` url
        if (url.indexOf('/') === 0) {
            url = url.substr(1);
        }
        return this.absolute_url(from + url);
    }
    else {
        return url;
    }
});