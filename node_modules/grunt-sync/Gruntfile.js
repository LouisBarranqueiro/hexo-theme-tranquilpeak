/*global module:false*/
module.exports = function (grunt) {
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    files: ['Gruntfile.js', 'tasks/**/*.js', 'test/*.js'],

    watch: {
      all: {
        files: '<%= files %>'
      }
    },

    simplemocha: {
      all: {
        src: 'test/*.js'
      }
    },

    jshint: {
      all: '<%= files %>'
    },

    sync: grunt.file.readJSON('sync.json'),

    complexity: grunt.file.readJSON('complexity.json')
  });
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'simplemocha', 'complexity']);

  // Used for testing only, you shouldn't add this to your code:
  grunt.loadTasks('tasks');

};
