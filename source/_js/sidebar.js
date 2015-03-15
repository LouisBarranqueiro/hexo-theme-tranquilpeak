+function ($) {
    'use strict';

    /**
     * Sidebar
     * @param element
     * @param openButton
     * @constructor
     */
    var Sidebar = function(element, openButton) {
        this.$element       = $(element);
        this.$element.width = this.$element.width();
        this.$openButton    = $(openButton);
    };

    /***
     * Init the sidebar
     */
    Sidebar.prototype.init = function() {
        var self = this;

        // Detect the click on the open button
        self.$openButton.click(function() {
            if (!self.$element.hasClass('opened')) {
                self.open();
                slideBlogRight(self.$element.width);
                slidePostBottomBarRight(self.$element.width);
            }
        })

        // Detect the click out of the sidebar
        $('#header, #main').click(function() {
            if (self.$element.hasClass('opened')) {
                self.close();
                slideBlogLeft(self.$element.width);
                slidePostBottomBarLeft(self.$element.width);
            }
        })

        // Detect resize of the windows
        $(window).resize(function() {
            if ($(window).width() > 600) {
                self.$element.show();
            }
            else {
                self.$element.hide();
            }

            self.initPosition();
            initBlogPosition();
        })
    };

    /**
     * Open the sidebar
     */
    Sidebar.prototype.open = function() {
        var self = this;

        self.$element.css({'left': '-' + self.$element.width + 'px'});
        self.$element.show();
        
        self.$element.animate({
            left: '+=' + self.$element.width,
        }, 250, function () {
            self.$element.addClass('opened');
        });
    };

    /**
     * Close the sidebar
     */
    Sidebar.prototype.close = function() {
        var self = this;

        self.$element.animate({
            left: '-=' + self.$element.width,
        }, 250, function() {
            self.$element.removeClass('opened');
            self.$element.hide();
        });
    }

    /**
     * Init sidebar position
     */
    Sidebar.prototype.initPosition = function() {
        this.$element.css({'left': 0}).removeClass('opened');
    }

    /**
     * Slide the blog to the right
     * @param width
     */
    function slideBlogRight(width) {
        if (!$('#main, #header').hasClass('is-slided')) {
            $('#main, #header').animate({
                'margin-left': '+=' + width + 'px',
            }, 250, function () {
                $('#main, #header').addClass('is-slided');
            })
        }
    };

    /**
     * Slide blog to the left
     * @param width
     */
    function slideBlogLeft(width) {
        if ($('#main, #header').hasClass('is-slided')) {
            $('#main, #header').animate({
                'margin-left': '-=' + width,
            }, 250, function () {
                $('#main, #header').removeClass('is-slided');
            });
        }
    };

    /**
     * Slide post bottom bar to the right
     * @param width
     */
    function slidePostBottomBarRight(width) {
        if (!$('.post-bottom-bar').hasClass('is-slided')) {
            $('.post-bottom-bar').animate({
                'left': '+=' + width,
            }, 250, function () {
                $('.post-bottom-bar').addClass('is-slided');
            });
        }
    };
    /**
     * Slide post bottom bar to the left
     * @param width
     */
    function slidePostBottomBarLeft(width) {
        if ($('.post-bottom-bar').hasClass('is-slided')) {
            $('.post-bottom-bar').animate({
                'left': '-=' + width,
            }, 250, function () {
                $('.post-bottom-bar').removeClass('is-slided');
                $('.post-bottom-bar').css('left', '');
            });
        }
    };

    /**
     * Init blog position
     * @constructor
     */
    function initBlogPosition() {
        $('#main, #header').css({'margin-left': 0}).removeClass('is-slided');
    }

    $(document).ready(function() {
        var sidebar = new Sidebar('#sidebar', '#btn-open-sidebar');
        sidebar.init();
    })
}(jQuery);