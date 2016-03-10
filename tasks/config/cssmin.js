var randToken = require('rand-token');

module.exports = function(grunt) {
  grunt.config.set('cssmin', {
    // Minify `style.css` file into `style.min.css`
    prod: {
      files: [{
        expand: true,
        cwd: 'source/assets/css',
        src: ['style.css'],
        dest: 'source/assets/css',
        ext: '-' + randToken.generate(60).toLocaleLowerCase() + '.min.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
