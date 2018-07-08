module.exports = function(grunt) {
  grunt.config.set('replace', {
    // Replace `EJS_ENDTAG` string to resolve a problem of ejs escaping with sails-linker
    linker: {
      overwrite: true,
      src: [
        'layout/_partial/head.ejs',
        'layout/_partial/script.ejs'
      ],
      replacements: [{
        from: 'EJS_ENDTAG',
        to: '%>'
      }]
    },
    // Modify url of images in fancybox.css to resolve images path.
    // Impossible to use an other plugin to do that
    // because in the bower fancybox packages, css files and images are in the same folder
    // and that not the case in assets folder.
    cssFancybox: {
      overwrite: true,
      src: [
        'source/assets/css/jquery.fancybox.css'
      ],
      replacements: [{
        from: 'url(\'',
        to: 'url(\'../images/'
      }]
    },
    cssFontAwesome: {
      overwrite: true,
      src: [
        'source/assets/css/all.css'
      ],
      replacements: [{
        from: 'url(../webfonts/',
        to: 'url(../fonts/'
      }]
    },
    // Modify url of images and fonts in tranquilpeak.css to resolve images and fonts path.
    cssTranquilpeak: {
      overwrite: true,
      src: [
        'source/assets/css/tranquilpeak.css'
      ],
      replacements: [{
        from: /url\(\"[.\/]+_images\//,
        to: 'url\(\"..\/images\/'
      }, {
        from: /url\(\'[.\/]+_images\//,
        to: 'url\(\'..\/images\/'
      }, {
        from: /url\(\"[.\/]+_fonts\//,
        to: 'url\(\"..\/fonts\/'
      }, {
        from: /url\(\'[.\/]+_fonts\//,
        to: 'url\(\'..\/fonts\/'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-text-replace');
};

