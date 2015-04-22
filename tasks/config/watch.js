module.exports = function(grunt) {
    grunt.config.set('watch', {
        // Watch assets to detect changes and launch `SyncAssets` task
        assets: {
            files: ['source/_*/**/*'],
            tasks: ['SyncAssets']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};