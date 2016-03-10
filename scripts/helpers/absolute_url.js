'use strict';

var regRoot = new RegExp(hexo.config.root);

/**
 * Return an absolute URL
 * @param url
 * @returns {String}
 */
hexo.extend.helper.register('absolute_url', function(url) {
  // check if url is remote
  if (this.is_remote_url(url)) {
    return url;
  }
  // generate an URL from the one given
  url = this.url_for(url);
  // remove `root` part
  url = url.replace(regRoot, '/');
  // prepend with `config.url` set in Hexo configuration file
  return hexo.config.url + url;
});
