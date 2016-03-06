module.exports = function(grunt) {
  // Build (environment : development)
  grunt.registerTask('build', [
    'clean:build',
    'bower:dev',
    'syncAssets',
    'linkAssets',
    'replace:cssFancybox',
    'replace:cssTranquilpeak'
  ]);
};
