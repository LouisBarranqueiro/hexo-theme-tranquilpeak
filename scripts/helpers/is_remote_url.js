'use strict';

/**
 * Check if url is remote
 */
hexo.extend.helper.register('is_remote_url', function(url) {
  return url && url.indexOf('//') >= 0;
});
