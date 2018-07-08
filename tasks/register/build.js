module.exports = function(grunt) {
  // Build (environment : development)
  grunt.registerTask('build', [
    'clean:build',
    'copy:dev',
    'syncAssets',
    'linkAssets',
    'replace:cssFancybox',
    'replace:cssFontAwesome',
    'replace:cssTranquilpeak'
  ]);
};
