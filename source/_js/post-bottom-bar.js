+function($) {
    'use strict';

    // Hide the post bottom bar when the post footer is visible by the user,
    // and show it when the post footer isn't visible by the user

    /**
     * PostBottomBar
     * @constructor
     */
    var PostBottomBar = function() {
        this.$postBottomBar = $('.post-bottom-bar');
        this.$postFooter    = $('.post-footer');
        this.delta            = 5;
        this.lastScrollTop    = 0;
        this.scrollTop;
    };

    PostBottomBar.prototype = {

        /**
         * Run PostBottomBar feature
         */
        run: function() {
            var self = this;
            var didScroll;
            // Run animation for first time
            self.swipePostBottomBar();
            // Detects if the user is scrolling
            $(window).scroll(function() {
                didScroll = true;
            });
            // Check if the user scrolled every 250 milliseconds
            setInterval(function() {
                if (didScroll) {
                    self.swipePostBottomBar();
                    didScroll = false;
                }
            }, 250);
        },

        /**
         * Animate the post bottom bar
         */
        swipePostBottomBar: function() {
            this.scrollTop = $(window).scrollTop();
            var postFooterElemPos = (this.$postFooter.offset().top + this.$postFooter.height() + this.$postBottomBar.height() / 2);
            // show bottom bar
            // if the user scrolled upwards more than `delta`
            // and `post-footer` div isn't visible
            if ((this.scrollTop < this.lastScrollTop) &&
                ($(window).scrollTop() + $(window).height()) < (postFooterElemPos)) {
                this.$postBottomBar.slideDown();
            }
            else {
                this.$postBottomBar.slideUp();
            }
            this.lastScrollTop = this.scrollTop;
        }
    };

    $(document).ready(function() {
        if ($('.post-bottom-bar').length) {
            var postBottomBar = new PostBottomBar();
            postBottomBar.run();
        }
    });
}(jQuery);