module.exports = function(grunt) {
  grunt.config.set('clean', {
    // Delete the `assets` folder
    build: ['source/assets']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
