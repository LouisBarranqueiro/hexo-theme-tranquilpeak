+function ($) {
    'use strict';

    function slideBlog() {
        var $blog = $('#blog');
        var blogWidth = $('#blog').width();

        $blog.animate({
            left: '-=' + blogWidth,
        }, 500, function() {
            showAbout();
            verticalAlignAbout();
        });

    };

    function verticalAlignAbout() {
        var $aboutAuthor = $('#about-author');
        var aboutAuthorHeight = $('#about-author').height();
        console.log('authorheighr:' + aboutAuthorHeight);
        $aboutAuthor.css('margin-top', (($(window).height() / 2) - (aboutAuthorHeight / 2)) + 'px');

    };

    function showAbout() {
        var $about = $('#about');
        $about.fadeIn();
    };

    $(document).ready(function() {
        $('a[href=\'/about\']').click(function(e) {
            e.preventDefault();
            slideBlog();
        })
    })

}(jQuery);