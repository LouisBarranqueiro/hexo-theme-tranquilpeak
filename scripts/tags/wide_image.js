'use strict';

var rPath = new RegExp(
  '((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?' +
  '[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
  '((?:\\/[\\+~%\\/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)' +
  '#?(?:[.!\\/\\w]*))|^[A-Za-z0-9_\\/-]+\\.\\w{2,4})');
var figureClass = 'figure';
var figureImageClass = 'figure-img';
var figureFullWidthClass = 'figure--fullWidth';
var captionClass = 'caption';

/**
 * Wide image tag
 *
 * Syntax:
 *     {% wide_image /path/to/image [title text] %}
 * E.g:
 *     {% wide_image http://google.fr/images/image125.png "A beautiful sunrise" %}
 */
hexo.extend.tag.register('wide_image', function(args) {
  var image;
  var html = '';

  // Get path of image
  if (rPath.test(args[0])) {
    image = args.shift();
  }

  // Get title of image
  var title = args.join(' ');

  // Place image out of `main-content-wrap` div to be display in full width
  // We use  `<!-- endcontent -->` and `<!-- content -->` here
  // to not be auto deleted or closed by marked module.
  // The theme will replace this comment tag by `<div class="main-content-wrap">`
  // and `</div>` after marked job.
  html += '<!-- endcontent -->';
  html += '<div class="' + figureClass + ' ' + figureFullWidthClass + '">';
  html += '<img class="' + figureImageClass + '" src="' + image + '" alt="' + title + '">';
  html += '<span class="' + captionClass + '">';
  html += title;
  html += '</span>';
  html += '</div>';
  html += '<!-- content -->';

  return html;
});
