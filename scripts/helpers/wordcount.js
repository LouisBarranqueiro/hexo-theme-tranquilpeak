// Inspired by https://github.com/willin/hexo-wordcount
const util = require('hexo-util');

// Currently supports the english
const wordCounts = function(content) {
  content = util.stripHTML(content);
  const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
  const en = (content.replace(/[\u4E00-\u9FA5]/g, '').match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length;
  return {
    cn: cn,
    en: en
  };
};

hexo.extend.helper.register('min2read', function(content, {cn = 300, en = 160} = {}) {
  const counts = wordCounts(content);
  const readingTime = counts.cn / cn + counts.en / en;
  return readingTime < 1 ? 1 : parseInt(readingTime, 10);
});

hexo.extend.helper.register('wordcount', function(content) {
  const wordCount = Object.values(wordCounts(content)).reduce((a, b) => a + b);
  if (wordCount < 1000) {
    return wordCount;
  }
  return Math.round(wordCount / 100) / 10 + 'k';
});
