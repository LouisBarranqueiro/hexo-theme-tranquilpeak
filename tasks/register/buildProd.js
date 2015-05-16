module.exports = function(grunt) {
    // Build (environment : production)
    grunt.registerTask('BuildProd', [
        'clean:build',
        'bower:dev',
        'SyncAssets',
        'replace:cssFancybox',
        'replace:cssTranquilpeak',
        'concat',
        'cssmin',
        'uglify',
        'LinkAssetsProd'
    ]);
};