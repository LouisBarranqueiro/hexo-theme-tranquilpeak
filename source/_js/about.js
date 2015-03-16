+function ($) {
    'use strict';

    function showAbout() {
        $.when(fadeOutBlog()).done(function() {
            dropAboutAuthor();
        });
        fadeInAbout();
    };

    function hideAbout() {
        $.when(upAboutAuthor()).done(function() {
            fadeInBlog();
            fadeOutAbout();
        });
    };

    function fadeOutBlog() {
        var $blog = $('#blog');

        $blog.fadeOut(500);
    };

    function fadeInBlog() {
        var $blog = $('#blog');

        $blog.fadeIn(500);
    };

    function fadeInAbout() {
        var $about = $('#about');

        $about.fadeIn(500);
    };

    function fadeOutAbout() {
        var $about = $('#about');

        $about.fadeOut(500);
    };

    function dropAboutAuthor() {
        var $aboutAuthor = $('#about-author');
        var aboutAuthorHeight = $('#about-author').innerHeight();

        $aboutAuthor
            .css('top','0px')
            .css('top','-' + aboutAuthorHeight + 'px')
            .show()
            .animate({
                top: '+=' + (($(window).height() / 2) - aboutAuthorHeight - (aboutAuthorHeight/2)) + 'px'
            });

    };

    function upAboutAuthor() {
        var $aboutAuthor = $('#about-author');
        var aboutAuthorHeight = $('#about-author').innerHeight();

        $aboutAuthor
            .animate({
                top: '-=' + ((($(window).height() / 2) - (aboutAuthorHeight)) - (aboutAuthorHeight / 2)) + 'px'
            })
            .hide();
    };

    $(document).ready(function() {
        $('a[href=\'/about\']').click(function(e) {
            e.preventDefault();
            showAbout();
        })
        $('#about-btn-close').click(function(e) {
            e.preventDefault();
            hideAbout();
        })
    })

}(jQuery);