+function ($) {
     'use strict'

    /**
     *  PostBottomBar
     * @param postBottomBar
     * @constructor
     */
    var PostBottomBar = function(postBottomBar) {
        this.$elem = $(postBottomBar);
    }

    /**
     * Init the post bottom bar
     */
    PostBottomBar.prototype.init = function() {
        var self = this;

        self.checkVisibility();
        $(window).scroll(function () {
            self.checkVisibility();
        })
    };

    /**
     * Check if the post footer is visible by the user
     */
    PostBottomBar.prototype.checkVisibility = function() {
        if (checkPostFooterVisibility() == true) {
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

    /**
     * Check if the post footer element is visible by the user
     * @returns {boolean}
     */
    function checkPostFooterVisibility() {
        var $postFooterElem   = $('.post-footer');
        var postFooterElemPos = $postFooterElem.offset().top + $postFooterElem.height();

        if (($(window).scrollTop() + $(window).height()) > (postFooterElemPos)) {
            return true;
        }
        else {
            return false;
        }

    };

    $(document).ready(function() {
        if ($('.post-bottom-bar').length) {
            var postBottomBar = new PostBottomBar('.post-bottom-bar');
            postBottomBar.init();
        }
    })
 }(jQuery);