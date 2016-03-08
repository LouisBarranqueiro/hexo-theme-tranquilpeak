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
  var rFigClass = /(^fig-\d{2,3}$|^center$)/;
  var rGroup = /^group:(.+)/;
  var fancyboxClass = 'fancybox';
  var figureClass = 'figure';
  var captionClass = 'caption';
  var noCaptionClass = 'nocaption';
  var clearClass = 'clear';
  /**
   * Image tag
   *
   * Syntax:
   *     {% image [classes] group:group1 /path/to/image [/path/to/thumbnail]
   *     [width of thumbnail] [height of thumbnail] [title text] %}
   * E.g:
   *     {% image fig-50 right fancybox group:travel image2.png http://example.com/image125.png
   *     100% 160px "A beautiful sunrise" %}
   */
  hexo.extend.tag.register('image', function(args) {
    var original;
    var thumbnail = '';
    var thumbnailWidth = '';
    var thumbnailHeight = '';
    var classes = [];
    var html = '';
    var fancybox = '';
    var clear = '';
    var group = '';
    // Get CSS classes
    while (args.length && rClass.test(args[0])) {
      classes.push(args.shift());
    }
    
    // Get group to define `data-fancybox-group` html attribute
    var groupMatch = args[0].match(rGroup);
    if (groupMatch !== null) {
      args.shift();
      group = groupMatch[1];
    }
    
    // Get path of original image
    original = args.shift();
    
    // Get path of thumbnail image
    if (args.length && rPath.test(args[0])) {
      thumbnail = args.shift();
    }
    
    // Get width of thumbnail image
    if (args.length && rSize.test(args[0])) {
      thumbnailWidth = args.shift();
    }
    
    // Get height of thumbnail image
    if (args.length && rSize.test(args[0])) {
      thumbnailHeight = args.shift();
    }
    
    // Get title of image
    var title = args.join(' ');
    // Build the image HTML structure
    var image = '<img class="fig-img" src="' + (thumbnail || original) + '" ';
    // add image size
    if (thumbnailWidth || thumbnailHeight) {
      image += 'style="';
      // add width
      if (thumbnailWidth) {
        image += 'width:' + thumbnailWidth + ';';
      }
      // add height
      if (thumbnailHeight) {
        image += 'height:' + thumbnailHeight + ';';
      }
      image += '"';
    }
    image += 'alt="' + title + '">';
    
    // Build div to retrieve normal flow of document
    if (classes.indexOf(clearClass) >= 0) {
      clear = '<div style="clear:both;"></div>';
      // remove `clear` class of `classes` to not be attached on the main div
      classes.splice(classes.indexOf(clearClass), 1);
    }
    
    // Add Fancybox structure around image
    if (classes.indexOf(fancyboxClass) >= 0) {
      fancybox +=
        '<a class="' + fancyboxClass + '" href="' + original + '" title="' + title + '"' +
        ' data-fancybox-group="' + group + '">';
      fancybox += image;
      fancybox += '</a>';
      // remove `fancyfox` class of `classes` to not be attached on the main div
      classes.splice(classes.indexOf(fancyboxClass), 1);
    }
    
    // Build HTML structure
    html += '<div class="' + figureClass + ' ' + classes.join(' ') + '"' +
      (reIndexOf(classes, rFigClass) === -1 ? ' style="width:' + thumbnailWidth + ';"' : '') + '>';
    html += fancybox || image;
    
    // Add caption
    if (title && classes.indexOf(noCaptionClass) === -1) {
      html += '<span class="' + captionClass + '">';
      html += title;
      html += '</span>';
    }
    
    html += '</div>';
    // add `clear` div
    html += clear;
    
    return html;
  });
})();
