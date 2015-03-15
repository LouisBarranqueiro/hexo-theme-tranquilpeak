+function ($) {
     'use strict'

    /**
     * Global variables
     */
    var $postFooterElem   = $('.post-footer');
    var postFooterElemPos = $postFooterElem.offset().top + $postFooterElem.height(); // Position of the post footer element from the top page

    /**
     *  PostBottomBar
     *
     * @param postBottomBar
     * @constructor
     */
    var PostBottomBar = function(postBottomBar) {
        this.$elem     = $('.post-bottom-bar');
    }

    /**
     * Init the post bottom bar
     */
    PostBottomBar.prototype.init = function() {
        var self = this;

        self.checkPosition();

        $(window).scroll(function () {
            self.checkPosition();
        })
    };

    /**
     * Check if the post footer is visible by the user
     */
    PostBottomBar.prototype.checkPosition = function() {
        if (($(window).scrollTop() + $(window).height()) > postFooterElemPos) {
            this.slideUp();
        }
        else {
            this.slideDown();
        }
    };

    /**
     * Slide up the post bottom bar
     */
    PostBottomBar.prototype.slideUp = function() {
        this.$elem.slideUp();
    };

    /**
     * Slide down the post bottom bar
     */
    PostBottomBar.prototype.slideDown = function() {
        this.$elem.slideDown();
    };

    $(document).ready(function() {
        if ($('.post-bottom-bar').length) {
            var postBottomBar = new PostBottomBar('.post-bottom-bar');
            postBottomBar.init();
        }
    })
 }(jQuery);