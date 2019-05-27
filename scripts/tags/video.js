(function() {
  'use strict';

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
  var figureClass = 'figure';
  var videoClasses = [
    captionClass,
    noCaptionClass,
    autoplayClass,
    loopClass,
    mutedClass,
    noControlsClass
  ];
  /**
   * Video tag
   *
   * Syntax:
   *     {% video [classes] videoURL [Optional Poster (Thumbnail) URL]
   *     [Width] [Caption] %}
   * E.g:
   *     {% video loop http://example.com/video145.mp4
   *     http://example.com/image.png 95% "A beautiful sunrise" %}
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
    var video = '<video class="fig-video" ';
    if (classes.includes(autoplayClass)) {
      video += 'autoplay playsinline ';
    }
    if (classes.includes(loopClass)) {
      video += 'loop ';
    }
    if (classes.includes(mutedClass)) {
      video += 'muted ';
    }
    if (!classes.includes(noControlsClass)) {
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
    if (classes.includes(clearClass)) {
      clear = '<div style="clear:both;"></div>';
      // remove `clear` class of `classes` to not be attached on the main div
      classes.splice(classes.indexOf(clearClass), 1);
    }
    
    // remove all video-related classes to only have style-related classes
    videoClasses.forEach(function(videoClass) {
      if (classes.includes(videoClass)) {
        classes.splice(classes.indexOf(videoClass), 1);
      }
    });

    // Build HTML structure
    html += '<div class="' + figureClass + ' ' + classes.join(' ') + '" ';
    html += width ? 'style="width:' + width + '"; ' : '';
    html += '>\n';
    html += video;

    // Add caption
    if (title && !classes.includes(noCaptionClass)) {
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
