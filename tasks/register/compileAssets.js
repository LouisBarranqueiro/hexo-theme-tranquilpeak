module.exports = function(grunt) {
    // Compile assets all assets (css and js)
    grunt.registerTask('CompileAssets', [
        'sass:dev',
        'concat:devJs'
    ]);
};