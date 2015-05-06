module.exports = function(grunt) {
    // Build (environment : development)
    grunt.registerTask('build', [
        'clean:build',
        'bower:dev',
        'CompileAssets',
        'LinkAssets',
        'replace:cssFancybox'
    ]);
};