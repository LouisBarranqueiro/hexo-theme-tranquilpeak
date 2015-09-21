var ymf = require('yaml-front-matter');

hexo.extend.filter.register('after_post_render', function(data) {
    if (ymf.loadFront(data.raw).excerpt) {
        data.excerpt = ymf.loadFront(data.raw).excerpt + "<br>";
    }
    return data;
});