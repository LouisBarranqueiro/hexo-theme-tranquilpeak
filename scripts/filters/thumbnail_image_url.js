(function() {
  'use strict';

  /**
   * Check if url is a remote url or not
   * @param {String} url
   * @returns {*|boolean}
   */
  function isRemoteUrl(url) {
    return url && url.indexOf('//') >= 0;
  }

  /**
   * Resolve url based on `hexo.config.root`
   * @param {String} path
   * @returns {*}
   */
  function urlFor(path) {
    var root = hexo.config.root;
    path = path || '/';

    if (isRemoteUrl(path)) {
      return path;
    }

    if (path[0] !== '/') {
      return root + path;
    }

    return path;
  }

  /**
   * Determine thumbnail image url for a post,
   * it add a property `thumbnailImageUrl` to the post object
   */
  hexo.extend.filter.register('before_post_render', function(post) {
    var theme = hexo.theme.config;

    /**
     * Generate thumbnail image url based on thumbnail image, cover image or photos
     * @param {Object} post
     * @returns {String|null}
     */
    function genThumbnailImageUrl(post) {
      var rPhoto = /([\w:\-\/._#]+) *(["|'](.+)["|'])*/;

      // use thumbnail image
      if (theme.thumbnail_image && post.thumbnailImage && post.thumbnailImage.length) {
        if (isRemoteUrl(post.thumbnailImage)) {
          return post.thumbnailImage;
        }

        return urlFor(post.permalink + post.thumbnailImage);
      }

      // Define third images (cover image and first photo) as thumbnail image
      if (theme.thumbnail_image && (post.autoThumbnailImage === true ||
        (theme.auto_thumbnail_image === true && post.autoThumbnailImage !== false))) {
        // use photos
        if (post.photos && post.photos.length) {
          if (isRemoteUrl(post.photos[0])) {
            return post.photos[0].match(rPhoto)[1];
          }

          return urlFor(post.permalink + post.photos[0].match(rPhoto)[1]);
        }

        // use cover image
        if (post.coverImage && post.coverImage.length) {
          if (isRemoteUrl(post.coverImage)) {
            return post.coverImage;
          }

          return urlFor(post.permalink + post.coverImage);
        }
      }
      return null;
    }

    post.thumbnailImageUrl = genThumbnailImageUrl(post);
    return post;
  });
})();
