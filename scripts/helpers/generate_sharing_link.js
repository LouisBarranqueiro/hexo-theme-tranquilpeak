'use strict';

/**
 * Generate a sharing link
 */
hexo.extend.helper.register('generate_sharing_link', function(post, url) {
  return url.replace(/\{\{post\.(.+?)\}\}/g, function(match, $1) {
    return post[$1];
  });
});
