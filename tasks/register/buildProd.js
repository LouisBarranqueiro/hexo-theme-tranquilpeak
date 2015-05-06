module.exports = function(grunt) {
    // Build (environment : production)
    grunt.registerTask('buildProd', [
        'clean:build',
        'bower:dev',
        'CompileAssets',
        'concat',
        'cssmin',
        'uglify',
        'LinkAssetsProd',
        'replace:cssFancybox'
    ]);
};