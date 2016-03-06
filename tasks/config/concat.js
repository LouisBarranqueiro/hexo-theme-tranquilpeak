module.exports = function(grunt) {
  grunt.config.set('concat', {
    // Concat all javascript file into `tranquilpeak.js`
    devJs: {
      src: ['source/_js/**/*.js'],
      dest: 'source/assets/js/tranquilpeak.js',
      options: {
        separator: ';'
      }
    },
    // Concat all stylesheets file into `style.css`
    prodCss: {
      src: ['source/assets/css/*.css'],
      dest: 'source/assets/css/style.css'
    },
    // Concat all javascript file in `script.js`
    prodJs: {
      src: require('../pipeline').tranquilpeakJsFilesToInject,
      dest: 'source/assets/js/script.js',
      options: {
        separator: ';'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
