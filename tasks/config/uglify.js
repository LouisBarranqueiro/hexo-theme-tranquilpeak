var randToken = require('rand-token');

module.exports = function(grunt) {
  var website = {};
  var token = randToken.generate(60).toLocaleLowerCase();
  website['source/assets/js/script-' + token + '.min.js'] = ['source/assets/js/script.js'];
  grunt.config.set('uglify', {
    // Minify `script.js` file into `script.min.js`
    prod: {
      options: {
        mangle: {
          except: [
            'jQuery',
            'fancybox'
          ]
        }
      },
      files: website
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
