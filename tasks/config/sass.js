module.exports = function(grunt) {
    grunt.config.set('sass', {
        // Compile `tranquilpeak.scss` file into `tranquilpeak.css`
        dev: {
            options: {
                sourcemap: 'none'
            },
            files:   [{
                expand: true,
                cwd:    'source/_css',
                src:    ['tranquilpeak.scss'],
                dest:   'source/assets/css/',
                ext:    '.css'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
};