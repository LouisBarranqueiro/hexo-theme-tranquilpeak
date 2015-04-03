+function($) {
    'use strict'

    // Hide the post bottom bar when the post footer is visible by the user,
    // and show it when the post footer isn't visible by the user

    /**
     * PostBottomBar
     * @constructor
     */
    var PostBottomBar = function() {
        this.$postBottomBar = $('.post-bottom-bar');
        this.$postFooter    = $('.post-footer');
    }

    /**
     * Run PostBottomBar feature
     */
    PostBottomBar.prototype.run = function() {
        var self = this;
        var didScroll;

        // Detects if the user is scrolling
        $(window).scroll(function() {
            self.didScroll = true;
        });

        setInterval(function() {
            if (self.didScroll) {
                self.swipePostBottomBar();
                self.didScroll = false;
            }
        }, 250);
    };

    /**
     * Animate the post bottom bar
     */
    PostBottomBar.prototype.swipePostBottomBar = function() {
        var postFooterElemPos = (this.$postFooter.offset().top + this.$postBottomBar.height());

        //Check if the post footer element is visible by the user
        if (($(window).scrollTop() + $(window).height()) > (postFooterElemPos)) {
            this.$postBottomBar.slideUp();
        }
        else {
            this.$postBottomBar.slideDown();
        }
    };

    $(document).ready(function() {
        if ($('.post-bottom-bar').length) {
            var postBottomBar = new PostBottomBar();
            postBottomBar.run();
        }
    });
}(jQuery);