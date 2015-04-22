module.exports = function(grunt) {
    // Build (environment : development)
    grunt.registerTask('Build', [
        'clean:build',
        'bower:dev',
        'CompileAssets',
        'LinkAssets',
        'replace:cssFancybox'
    ]);
};