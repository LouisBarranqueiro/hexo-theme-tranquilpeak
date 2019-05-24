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
    let i = 0;
    while (i < array.length) {
      if (array[i].toString().match(regex)) {
        return i;
      }
      i++;
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
  var rFigClass = /(^fig-\d{2,3}$)/;
  var captionClass = 'caption';
  var noCaptionClass = 'nocaption';
  var clearClass = 'clear';
  var autoplayClass = 'autoplay';
  var loopClass = 'loop';
  var mutedClass = 'muted';
  var noControlsClass = 'nocontrols';
  var figureClass = 'figure';
  /**
   * Video tag
   *
   * Syntax:
   *     {% video [classes] videoURL [Optional Poster (Thumbnail) URL]
   *     [Width] [Caption] %}
   * E.g:
   *     {% video loop http://example.com/video145.mp4
   *     http://example.com/image.png 100% 95% "A beautiful sunrise" %}
   */
  hexo.extend.tag.register('video', function(args) {
    var original;
    var poster = '';
    var width = '';
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
    
    // Get title of video
    var title = args.join(' ');

    // Build the video HTML structure
    var video = '<video ';
    if (classes.indexOf(autoplayClass) >= 0) {
      video += 'autoplay playsinline ';
    }
    if (classes.indexOf(loopClass) >= 0) {
      video += 'loop ';
    }
    if (classes.indexOf(mutedClass) >= 0) {
      video += 'muted ';
    }
    if (classes.indexOf(noControlsClass) === -1) {
      video += 'controls ';
    }
    if (poster !== '') {
      video += 'poster="' + poster + '" ';
    }
    video += 'alt="' + title + '">\n';
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
    var placement = '';
    if (classes.indexOf('right') >= 0) {
      placement = ' right';
    }
    else if (classes.indexOf('left') >= 0) {
      placement = ' left';
    }
    else if (classes.indexOf('center') >= 0) {
      placement = ' center';
    }
    html += '<div class="' + figureClass + placement;
    if (reIndexOf(classes, rFigClass) === -1) {
      html += '" style="width:';
      html += (width) ? (width) : ('100%');
      html += ';">\n';
    }
    else {
      html += ' ' + classes[reIndexOf(classes, rFigClass)];
      html += '">\n';
    }

    
    html += video;
    
    // Add caption
    if (title && classes.indexOf(noCaptionClass) === -1) {
      html += '\n<span class="' + captionClass + '">';
      html += title + '';
      html += '</span>';
    }
    
    html += '\n</div>';

    // add `clear` div if previously specified
    html += clear;
    return html;
  });
})();
