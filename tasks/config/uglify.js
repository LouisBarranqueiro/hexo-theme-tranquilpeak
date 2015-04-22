module.exports = function(grunt) {
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
            files:   {
                'source/assets/js/script.min.js': ['source/assets/js/script.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};