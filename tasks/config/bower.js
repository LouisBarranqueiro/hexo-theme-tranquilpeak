
module.exports = function(grunt) {
  grunt.config.set('bower', {
    // Copy all needed files by types
    dev: {
      /* eslint-disable camelcase */
      dest: 'source/assets/images',
      js_dest: 'source/assets/js',
      css_dest: 'source/assets/css',
      fonts_dest: 'source/assets/fonts',
      /* eslint-enable camelcase */
      options: {
        expand: false,
        keepExpandedHierarchy: false,
        packageSpecific: {
          fancybox: {
            files: [
              'source/blank.gif',
              'source/fancybox_loading.gif',
              'source/fancybox_loading@2x.gif',
              'source/fancybox_overlay.png',
              'source/fancybox_sprite.png',
              'source/fancybox_sprite@2x.png',
              'source/jquery.fancybox.js',
              'source/jquery.fancybox.css',
              'source/helpers/jquery.fancybox-thumbs.css',
              'source/helpers/jquery.fancybox-thumbs.js'
            ]
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower');
};
