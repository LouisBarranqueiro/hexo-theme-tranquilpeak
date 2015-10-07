/*global module:false*/
module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('jit-grunt')(grunt, {});

  grunt.initConfig({
    bower: {
      basic: {
        dest: 'public/js/lib',
        options: {
          stripJsAffix: true
        }
      },
      test1: {
        dest: 'public/js/lib',
        options: {
          stripJsAffix: true,
          keepExpandedHierarchy: false,
          packageSpecific: {
            'font-awesome': {

            }
          }
        }
      },
      test2: {
        dest: 'public/js/lib',
        options: {
          stripJsAffix: true,
          expand: true,
          packageSpecific: {
            'font-awesome': {

            }
          }
        }
      },
      test3: {
        dest: 'public/js/lib',
        options: {
          expand: true,
          stripJsAffix: true,
          keepExpandedHierarchy: false,
          packageSpecific: {
            'jquery-ui': {
              files: [
                'ui/minified/*.js',
                'themes/base/**'
              ]
            }
          }
        }
      },
      test4: {
        dest: 'public/js/lib',
        options: {
          expand: true,
          stripJsAffix: true,
          keepExpandedHierarchy: false,
          packageSpecific: {
            'jquery-ui': {
              keepExpandedHierarchy: true,
              stripGlobBase: true,
              files: [
                'ui/minified/**'
              ]
            }
          }
        }
      },
      test5: {
        dest: 'public/',
        test_dest: 'foo',
        fonts_dest: 'public/fonts',
        options: {
          keepExpandedHierarchy: false,
        }
      }
    },
    clean: {
      things: 'public',
    },
  });

  grunt.registerTask('default', [
      'clean:things',
      'bower:basic'
  ]);
};

