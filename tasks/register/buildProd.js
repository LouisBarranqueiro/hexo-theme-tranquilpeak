module.exports = function(grunt) {
    // Build (environment : production)
    grunt.registerTask('BuildProd', [
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