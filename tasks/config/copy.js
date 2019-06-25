var jsDestFolder = './source/assets/js/';
var cssDestFolder = './source/assets/css/';
var fontsDestFolder = './source/assets/fonts/';

var fancyboxPath = './node_modules/@fancyapps/fancybox';
var fontAwesomePath = './node_modules/@fortawesome/fontawesome-free';
var jqueryPath = './node_modules/jquery';
var gitmentPath = './node_modules/gitment';
var gitalkPath = './node_modules/gitalk';

module.exports = function(grunt) {
  grunt.config.set('copy', {
    // Copy all needed files by types
    dev: {
      files: [
        // fancybox
        {
          src: fancyboxPath + '/dist/jquery.fancybox.css',
          dest: cssDestFolder,
          flatten: true,
          expand: true
        },
        {
          src: fancyboxPath + '/dist/jquery.fancybox.js',
          dest: jsDestFolder,
          flatten: true,
          expand: true
        },
        {
          src: fancyboxPath + '/src/js/thumbs.js',
          dest: jsDestFolder,
          flatten: true,
          expand: true
        },
        {
          src: fancyboxPath + '/src/css/thumbs.css',
          dest: cssDestFolder,
          flatten: true,
          expand: true
        },
        // font-awesome
        {
          src: fontAwesomePath + '/css/all.css',
          dest: cssDestFolder,
          flatten: true,
          expand: true
        },
        {
          src: fontAwesomePath + '/webfonts/*',
          dest: fontsDestFolder,
          flatten: true,
          expand: true
        },
        // jquery
        {
          src: jqueryPath + '/dist/jquery.js',
          dest: jsDestFolder + 'jquery.js'
        },
        // gitment
        {
          src: gitmentPath + '/dist/gitment.browser.js',
          dest: jsDestFolder + 'gitment.js'
        },
        {
          src: gitmentPath + '/style/default.css',
          dest: cssDestFolder + 'gitment.css'
        },
        // gitalk
        {
          src: gitalkPath + '/dist/gitalk.js',
          dest: jsDestFolder + 'gitalk.js'
        },
        {
          src: gitalkPath + '/dist/gitalk.css',
          dest: cssDestFolder + 'gitalk.css'
        },
        {
          src: './node_modules/moment/min/moment-with-locales.js',
          dest: jsDestFolder + 'moment-with-locales.js'
        },
        {
          src: './node_modules/algoliasearch/dist/algoliasearch.js',
          dest: jsDestFolder + 'algoliasearch.js'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
