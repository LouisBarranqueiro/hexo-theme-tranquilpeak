// define function to search index in an array with a regex
if (typeof String.prototype.regIndexOf === 'undefined') {
    String.prototype.regIndexOf = function(regex, startpos) {
        var indexOf = this.substring(startpos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
    }

}

var rExcerpt = /<!-- ?excerpt ?-->/;

/**
 * Excerpt
 *
 * Allow user to use `<!-- excerpt -->` comment to define the post excerpt
 * this post excerpt will be deleted of the post content
 *
 * It's easily to use than `post.content` and `post.more`.
 */
hexo.extend.filter.register('after_post_render', function(data) {
    var content = data.content;

    if (rExcerpt.test(content)) {
        var index    = content.regIndexOf(rExcerpt);
        data.excerpt = content.substr(0, index).trim();
        data.content = content.substr(index).trim();

        return data;
    }
});