// Js files to inject in `layout/_partial/script.ejs`
var tranquilPeakJsFilesToInject = [
    'jquery.js',
    'jquery.fancybox.js',
    'jquery.fancybox-thumbs.js',
    'tranquil-peak.js'
];

// Css files to inject in `layout/_partial/head.ejs`
var tranquilPeakCssFilesToInject = [
    'font-awesome.css',
    'jquery.fancybox.css',
    'jquery.fancybox-thumbs.css',
    'tranquil-peak.css'
];

module.exports.tranquilPeakCssFilesToInject = tranquilPeakCssFilesToInject.map(function(path) {
    return 'source/assets/css/' + path;
});

module.exports.tranquilPeakJsFilesToInject = tranquilPeakJsFilesToInject.map(function(path) {
    return 'source/assets/js/' + path;
});