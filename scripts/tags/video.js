(function() {
  'use strict';
  
  /**
   * search index in an array with a regex
   * @param {Array} array
   * @param {Regex} regex
   * @param {Number} startpos
   * @return {Number}
   */
  function reIndexOf(array, regex) {
    for (var i in this) {
      if (array[i].toString().match(regex)) {
        return i;
      }
    }
    return -1;
  }

  var rPath = new RegExp(
    '((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?' +
    '[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
    '((?:\\/[\\+~%\\/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)' +
    '#?(?:[.!\\/\\w]*))|^[A-Za-z0-9_\\/-]+\\.\\w{2,4})');
  var rClass = /^[_a-zA-Z0-9-]+$/;
  var rSize = /^\d+(?:|\.\d+)(?:px|%)?$/;
  var captionClass = 'caption';
  var noCaptionClass = 'nocaption';
  var clearClass = 'clear';
  var autoplayClass = 'autoplay';
  var loopClass = 'loop';
  var mutedClass = 'muted';
  var noControlsClass = 'nocontrols';
  /**
   * Video tag
   *
   * Syntax:
   *     {% video [classes] /path/to/video
   *     [width%] [title text] %}
   * E.g:
   *     {% video http://example.com/video145.mp4
   *     100% "A beautiful sunrise" %}
   */
  hexo.extend.tag.register('video', function(args) {
    var original;
    var poster = '';
    var width = '';
    var height = '';
    var classes = [];
    var html = '';
    var clear = '';
    // Get CSS classes
    while (args.length && rClass.test(args[0])) {
      classes.push(args.shift());
    }
    
    // Get path of original video
    original = args.shift();

    // Get path of poster image
    if (args.length && rPath.test(args[0])) {
      poster = args.shift();
    }
    
    // Get width of video
    if (args.length && rSize.test(args[0])) {
      width = args.shift();
    }
    
    // Get height of video
    if (args.length && rSize.test(args[0])) {
      height = args.shift();
    }
    
    // Get title of video
    var title = args.join(' ');

    // Build the video HTML structure
    //var noautoplay = classes.contains
    var video = '<video';
    if (classes.indexOf(autoplayClass) >= 0){
      video += ' autoplay';
    }
    if (classes.indexOf(loopClass) >= 0){
      video += ' loop';
    }
    if (classes.indexOf(mutedClass) >= 0){
      video += ' muted';
    }
    if (classes.indexOf(noControlsClass) === -1){
      video += ' controls';
    }
    if (poster !== ''){
      video += ' poster="' + poster + '"';
    }
    // add size
    video += ' style="';
    if (width || height) {
      // add width
      if (width) {
        video += 'width:' + width + ';';
      }
      // add height
      if (height) {
        video += 'height:' + height + ';';
      }
    }
    else{
      video += 'width:100%;';
    }
    video += '" alt="' + title + '">\n';
    video += '<source src="' + original + '" type="video/mp4">\n';
    video += '<p>Your browser doesn\'t support HTML5 Video :/</p>';
    video += '</video>';

    // Build div to retrieve normal flow of document
    if (classes.indexOf(clearClass) >= 0) {
      clear = '<div style="clear:both;"></div>';
      // remove `clear` class of `classes` to not be attached on the main div
      classes.splice(classes.indexOf(clearClass), 1);
    }
    
    // Build HTML structure
    html += '<div';
    var placement = "left";
    if (classes.indexOf('right') >= 0){
      placement = "right"
    }
    if (classes.indexOf('center') >= 0){
      placement = "center"
    }
    let pos = ' style="text-align:' + placement + '"';
    html += pos;
    html += '>';
    html += video;
    
    // Add caption
    if (title && classes.indexOf(noCaptionClass) === -1) {
      html += '<span class="' + captionClass + '">';
      html += title + '';
      html += '</span>';
    }
    
    html += '</div>';
    // add `clear` div
    html += clear;
    return html;
  });
})();
