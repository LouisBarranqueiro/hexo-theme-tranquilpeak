+function ($) {
     'use strict'

    /**
     * Post bottom bar feature
     * @param postBottomBar
     * @param postFooter
     * @constructor
     */
    var PostBottomBar = function(postBottomBar, postFooter) {
        this.$postBottomBar = $(postBottomBar);
        this.$postFooter    = $(postFooter);
    }

    /**
     * Init the post bottom bar feature
     */
    PostBottomBar.prototype.init = function() {
        var self = this;

        self.animate();
        $(window).scroll(function () {
            self.animate();
        })
    };

    /**
     * Animate the post bottom bar
     */
    PostBottomBar.prototype.animate = function() {
        if (this.checkPostFooterVisibility() == true) {
            this.$postBottomBar.slideUp();
        }
        else {
            this.$postBottomBar.slideDown();
        }
    };

    /**
     * Check if the post footer element is visible by the user
     * @returns {boolean}
     */
    PostBottomBar.prototype.checkPostFooterVisibility = function() {
        var postFooterElemPos = this.$postFooter.offset().top + this.$postFooter.height();

        if (($(window).scrollTop() + $(window).height()) > (postFooterElemPos)) {
            return true;
        }
        else {
            return false;
        }
    };

    $(document).ready(function() {
        var postBottomBar;

        if ($('.post-bottom-bar').length) {
            postBottomBar = new PostBottomBar('.post-bottom-bar', '.post-footer');
            postBottomBar.init();
        }
    })
 }(jQuery);