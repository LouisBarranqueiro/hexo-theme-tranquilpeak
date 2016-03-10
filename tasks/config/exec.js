module.exports = function(grunt) {
  grunt.config.set('exec', {
    eslint: {
      cmd: 'eslint .'
    }
  });

  grunt.loadNpmTasks('grunt-exec');
};
