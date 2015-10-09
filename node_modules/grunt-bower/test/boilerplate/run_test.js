var sh = require('shelljs');
var grunt = require('grunt');
grunt.task.loadNpmTasks('grunt-contrib-clean');
grunt.task.loadNpmTasks('grunt-bower');

var tests = [{
  name: 'basic',
  expected_output: 'public/js,public/js/lib,public/js/lib/css,public/js/lib/css/font-awesome.css,public/js/lib/dist,public/js/lib/dist/jquery.js,public/js/lib/fonts,public/js/lib/fonts/FontAwesome.otf,public/js/lib/fonts/fontawesome-webfont.eot,public/js/lib/fonts/fontawesome-webfont.svg,public/js/lib/fonts/fontawesome-webfont.ttf,public/js/lib/fonts/fontawesome-webfont.woff,public/js/lib/jquery-ui.js'
}, {
  name: 'test1',
  expected_output: 'public/js,public/js/lib,public/js/lib/FontAwesome.otf,public/js/lib/font-awesome.css,public/js/lib/fontawesome-webfont.eot,public/js/lib/fontawesome-webfont.svg,public/js/lib/fontawesome-webfont.ttf,public/js/lib/fontawesome-webfont.woff,public/js/lib/jquery-ui.js,public/js/lib/jquery.js'
}, {
  name: 'test2',
  expected_output: 'public/js,public/js/lib,public/js/lib/font-awesome,public/js/lib/font-awesome/css,public/js/lib/font-awesome/css/font-awesome.css,public/js/lib/font-awesome/fonts,public/js/lib/font-awesome/fonts/FontAwesome.otf,public/js/lib/font-awesome/fonts/fontawesome-webfont.eot,public/js/lib/font-awesome/fonts/fontawesome-webfont.svg,public/js/lib/font-awesome/fonts/fontawesome-webfont.ttf,public/js/lib/font-awesome/fonts/fontawesome-webfont.woff,public/js/lib/jquery,public/js/lib/jquery-ui,public/js/lib/jquery-ui/jquery-ui.js,public/js/lib/jquery/dist,public/js/lib/jquery/dist/jquery.js'
}, {
  name: 'test3',
  expected_output: 'public/js,public/js/lib,public/js/lib/font-awesome,public/js/lib/font-awesome/FontAwesome.otf,public/js/lib/font-awesome/font-awesome.css,public/js/lib/font-awesome/fontawesome-webfont.eot,public/js/lib/font-awesome/fontawesome-webfont.svg,public/js/lib/font-awesome/fontawesome-webfont.ttf,public/js/lib/font-awesome/fontawesome-webfont.woff,public/js/lib/jquery,public/js/lib/jquery-ui,public/js/lib/jquery-ui/accordion.min.js,public/js/lib/jquery-ui/autocomplete.min.js,public/js/lib/jquery-ui/button.min.js,public/js/lib/jquery/jquery.js'
}, {
  name: 'test4',
  expected_output: 'public/js,public/js/lib,public/js/lib/font-awesome,public/js/lib/font-awesome/FontAwesome.otf,public/js/lib/font-awesome/font-awesome.css,public/js/lib/font-awesome/fontawesome-webfont.eot,public/js/lib/font-awesome/fontawesome-webfont.svg,public/js/lib/font-awesome/fontawesome-webfont.ttf,public/js/lib/font-awesome/fontawesome-webfont.woff,public/js/lib/jquery,public/js/lib/jquery-ui,public/js/lib/jquery-ui/accordion.min.js,public/js/lib/jquery-ui/autocomplete.min.js,public/js/lib/jquery-ui/button.min.js,public/js/lib/jquery-ui/i18n,public/js/lib/jquery-ui/i18n/datepicker-af.min.js,public/js/lib/jquery-ui/i18n/datepicker-ar-DZ.min.js,public/js/lib/jquery-ui/i18n/datepicker-ca.min.js,public/js/lib/jquery/jquery.js'
}, {
  name: 'test5',
  expected_output: 'public/font-awesome.css,public/fonts,public/fonts/FontAwesome.otf,public/fonts/fontawesome-webfont.eot,public/fonts/fontawesome-webfont.svg,public/fonts/fontawesome-webfont.ttf,public/fonts/fontawesome-webfont.woff,public/jquery-ui.js,public/jquery.js'
}];

tests.forEach(function(test) {
  test_it(test.name);
  if(o() !== test.expected_output) {
    console.error('Test ' + test.name + ' failed.');
  } else {
    console.log('Test ' + test.name + ' succeed.');
  }
});

function test_it(test) {
  sh.exec('grunt clean bower:' + test, {silent: true});
}

function o() {
  return grunt.file.expand('public/**/*').sort().join();
}

function strip(s) {
  return s.replace(/^\s*|\s*$/g, '');
}
