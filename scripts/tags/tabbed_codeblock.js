'use strict';

var util = require('hexo-util');
var highlight = util.highlight;
var stripIndent = require('strip-indent');
var JSDOM = require('jsdom').JSDOM;
var rCaptionUrl = /(\S[\S\s]*)\s+(https?:\/\/)(\S+)/i;
var rCaption = /(\S[\S\s]*)/;
var rTab = /<!--\s*tab (\w*)\s*-->\n([\w\W\s\S]*?)<!--\s*endtab\s*-->/g;
// create a window with a document to use jQuery library
var window = (new JSDOM('')).window;
var $ = require('jquery')(window);

/**
 * Tabbed code block
 * @param {Array} args
 * @param {String} content
 * @returns {string}
 */
function tabbedCodeBlock(args, content) {
  var arg = args.join(' ');
  var config = hexo.config.highlight || {};
  var html;
  var matches = [];
  var match;
  var caption = '';
  var codes = '';

  // extract languages and source codes
  while ((match = rTab.exec(content))) {
    matches.push(match[1]);
    matches.push(match[2]);
  }
  // create tabs and tabs content
  for (var i = 0; i < matches.length; i += 2) {
    var lang = matches[i];
    var code = matches[i + 1];
    var $code;
    // trim code
    code = stripIndent(code).trim();

    if (config.enable) {
      // highlight code
      code = highlight(code, {
        lang: lang,
        gutter: config.line_number,
        tab: config.tab_replace,
        autoDetect: config.auto_detect
      });
    }
    else {
      code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      code = '<pre><code>' + code + '</code></pre>';
    }

    // used to parse HTML code and ease DOM manipulation
    $code = $('<div>').append(code).find('>:first-child');
    // add tab
    // active the first tab
    // display the first code block
    if (i === 0) {
      caption += '<li class="tab active">' + lang + '</li>';
      $code.css('display', 'block');
    }
    else {
      $code.css('display', 'none');
      caption += '<li class="tab">' + lang + '</li>';
    }

    codes += $code.prop('outerHTML');
  }
  // build caption
  caption = '<ul class="tabs">' + caption + '</ul>';
  // add caption title
  if (rCaptionUrl.test(arg)) {
    match = arg.match(rCaptionUrl);
    caption = '<a href="' + match[2] + match[3] + '">' + match[1] + '</a>' + caption;
  }
  else if (rCaption.test(arg)) {
    match = arg.match(rCaption);
    caption = '<span>' + match[1] + '</span>' + caption;
  }

  codes = '<div class="tabs-content">' + codes + '</div>';
  // wrap caption
  caption = '<figcaption>' + caption + '</figcaption>';
  html = '<figure class="codeblock codeblock--tabbed">' + caption + codes + '</figure>';
  return html;
}

/**
 * Tabbed code block tag
 *
 * Syntax:
 *   {% tabbed_codeblock %}
 *       <!-- tab [lang] -->
 *           content
 *       <!-- endtab -->
 *   {% endtabbed_codeblock %}
 * E.g:
 *   {% tabbed_codeblock %}
 *       <!-- tab js -->
 *           var test = 'test';
 *       <!-- endtab -->
 *       <!-- tab css -->
 *           .btn {
 *               color: red;
 *           }
 *       <!-- endtab -->
 *   {% endtabbed_codeblock %}
 */
hexo.extend.tag.register('tabbed_codeblock', tabbedCodeBlock, {ends: true});

