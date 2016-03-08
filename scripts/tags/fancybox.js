'use strict';

var pathRegex = new RegExp(
  '((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?' +
  '[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
  '((?:\\/[\\+~%\\/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)' +
  '#?(?:[.!\\/\\w]*))|^[A-Za-z0-9_\\/-]+\\.\\w{2,4})');
var classRegex = /^[a-zA-Z0-9-_]+$/;

/**
 * Fancybox tag
 *
 * Syntax:
 *   {% fancybox [class name] /path/to/image [/path/to/thumbnail] [title] %}
 */
hexo.extend.tag.register('fancybox', function(args) {
  var original;
  var thumbnail = '';
  var cssClass = '';

  if (args.length && classRegex.test(args[0])) {
    cssClass = args.shift();
  }
  original = args.shift();

  if (args.length && pathRegex.test(args[0])) {
    thumbnail = args.shift();
  }

  var title = args.join(' ');
  
  return '<a class="fancybox" href="' + original + '" title="' + title + '">' +
    '<img class="' + cssClass + '" src="' + (thumbnail || original) + '" alt="' + title + '">' +
    '</a>' +
    (title && cssClass !== 'inline' ? '<span class="caption">' + title + '</span>' : '');
});
