module.exports = function(grunt) {
    grunt.config.set('sass', {
        // Compile `tranquil-peak.scss` file into `tranquil-peak.css`
        dev: {
            options: {
                sourcemap: 'none'
            },
            files:   [
                {
                    expand: true,
                    cwd:    'source/_css',
                    src:    ['tranquil-peak.scss'],
                    dest:   'source/assets/css/',
                    ext:    '.css'
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
};