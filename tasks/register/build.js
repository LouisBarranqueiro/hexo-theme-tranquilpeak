module.exports = function(grunt) {
    // Build (environment : development)
    grunt.registerTask('Build', [
        'clean:build',
        'bower:dev',
        'SyncAssets',
        'LinkAssets',
        'replace:cssFancybox',
        'replace:cssTranquilpeak'
    ]);
};