// Js files to inject in `layout/_partial/script.ejs`
var tranquilpeakJsFilesToInject = [
  'jquery.js',
  'jquery.fancybox.js',
  'thumbs.js',
  'tranquilpeak.js'
];

// Css files to inject in `layout/_partial/head.ejs`
var tranquilpeakCssFilesToInject = [
  'all.css',
  'jquery.fancybox.css',
  'thumbs.css',
  'tranquilpeak.css'
];

module.exports.tranquilpeakCssFilesToInject = tranquilpeakCssFilesToInject.map(function(path) {
  return 'source/assets/css/' + path;
});

module.exports.tranquilpeakJsFilesToInject = tranquilpeakJsFilesToInject.map(function(path) {
  return 'source/assets/js/' + path;
});
