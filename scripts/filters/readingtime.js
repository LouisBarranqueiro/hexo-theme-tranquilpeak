var htmlToText = require('html-to-text');
var wordCount = require('word-count');

hexo.extend.filter.register('after_post_render', function(page) {
  var words = wordCount(htmlToText.fromString(
    page.content,
    {
      ignoreImage: false,
      ignoreHref: true,
      wordwrap: false
    }
  ));

  var readingtime = Math.round(words / 150);
  page.readingtime = readingtime < 1 ? 1 : readingtime;
  return page;
});
