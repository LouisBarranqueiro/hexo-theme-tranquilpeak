'use strict';

var colorRegex =
  /^(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3})|(rgba?\(\d{1,3},\d{1,3},\d{1,3}(?:,\d{1,3})?\))$/;
var classRegex = /^[a-zA-Z0-9-_]+$/;

/**
 * Highlight text
 * @param {Array} args
 * @param {String} content
 * @returns {string}
 */
function highlightText(args, content) {
  var html = '';
  var color = '';
  var cssClass = '';

  if (colorRegex.test(args[0])) {
    color = args.shift();
    html += '<span class="highlight-text" style="background-color:' + color + ';">';
  }
  else if (classRegex.test(args[0])) {
    cssClass = args.shift();
    html += '<span class="highlight-text ' + cssClass + '">';
  }

  html += content;
  html += '</span>';

  return html;
}

/**
 * Highlight text tag
 *
 * Syntax:
 *   {% hl [(class | hexa code color | rgb color | rgba color)] %}content{% hl %}
 * E.g:
 *   {% highlight rgba(12,12,12,0.5) %}content{% highlight %}
 */
hexo.extend.tag.register('hl_text', highlightText, {ends: true});
