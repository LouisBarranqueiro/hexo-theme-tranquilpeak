module.exports = function(grunt) {
    grunt.config.set('sync', {
        // Synchronize images
        dev: {
            files: [
                {
                    cwd:  'source/_images',
                    src:  ['**/*'],
                    dest: 'source/assets/images'
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-sync');
};