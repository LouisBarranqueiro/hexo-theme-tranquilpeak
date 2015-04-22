module.exports = function(grunt) {
    // Link all assets (environment : production)
    grunt.registerTask('LinkAssetsProd', [
        'sails-linker:prodJs',
        'sails-linker:prodCss',
        'replace:linker'
    ]);
};