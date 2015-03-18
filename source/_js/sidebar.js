+function($) {
    'use strict';

    /**
     * Sidebar feature
     * @constructor
     */
    var Sidebar = function() {
        this.$sidebar       = $('#sidebar');
        this.$sidebar.width = this.$sidebar.width();
        this.$openBtn       = $('#btn-open-sidebar');
        this.$closeBtn      = $('#header, #main');
        this.$postBottomBar = $('.post-bottom-bar');
    };

    /**
     * Init the sidebar feature
     */
    Sidebar.prototype.init = function() {
        var self = this;

        // Detect the click on the open button
        self.$openBtn.click(function() {
            if (!self.$sidebar.hasClass('opened')) {
                self.openSidebar();
                self.slideBlogRight();
                self.slidePostBottomBarRight();
            }
        })

        // Detect the click on close button
        self.$closeBtn.click(function() {
            if (self.$sidebar.hasClass('opened')) {
                self.closeSidebar();
                self.slideBlogLeft();
                self.slidePostBottomBarLeft();
            }
        })

        // Detect resize of the windows
        $(window).resize(function() {
            if ($(window).width() > 600) {
                self.$sidebar.show();
            }
            else {
                self.$sidebar.hide();
            }

            self.initSidebarPosition();
            self.initBlogPosition();
        })
    };

    /**
     * Init sidebar position
     */
    Sidebar.prototype.initSidebarPosition = function() {
        this.$sidebar
            .css({'left': 0})
            .removeClass('opened');
    };

    /**
     * Init blog position
     */
    Sidebar.prototype.initBlogPosition = function() {
        this.$closeBtn
            .css({'margin-left': 0})
            .removeClass('is-slided');
    };

    /**
     * Open the sidebar
     */
    Sidebar.prototype.openSidebar = function() {
        var self = this;

        self.$sidebar
            .css({'left': '-' + self.$sidebar.width + 'px'})
            .show();
        
        self.$sidebar.animate({
            left: '+=' + self.$sidebar.width
        }, 250, function() {
            self.$sidebar.addClass('opened');
        });
    };

    /**
     * Close the sidebar
     */
    Sidebar.prototype.closeSidebar = function() {
        var self = this;

        self.$sidebar.animate({
            left: '-=' + self.$sidebar.width,
        }, 250, function() {
            self.$sidebar
                .removeClass('opened')
                .hide();
        });
    };

    /**
     * Slide the blog to the right
     */
    Sidebar.prototype.slideBlogRight = function() {
        var self = this;

        if (!self.$closeBtn.hasClass('is-slided')) {
            self.$closeBtn.animate({
                'margin-left': '+=' + self.$sidebar.width + 'px',
            }, 250, function() {
                self.$closeBtn.addClass('is-slided');
            })
        }
    };

    /**
     * Slide blog to the left
     */
    Sidebar.prototype.slideBlogLeft = function() {
        var self = this;

        if (self.$closeBtn.hasClass('is-slided')) {
            self.$closeBtn.animate({
                'margin-left': '-=' + self.$sidebar.width + 'px',
            }, 250, function() {
                self.$closeBtn.removeClass('is-slided');
            })
        }
    };

    /**
     * Slide post bottom bar to the right
     */
    Sidebar.prototype.slidePostBottomBarRight = function() {
        var self = this;

        if (!self.$postBottomBar.hasClass('is-slided')) {
            self.$postBottomBar.animate({
                'left': '+=' + self.$sidebar.width,
            }, 250, function() {
                self.$postBottomBar.addClass('is-slided');
            });
        }
    };
    
    /**
     * Slide post bottom bar to the left
     */
    Sidebar.prototype.slidePostBottomBarLeft = function() {
        var self = this;

        if (self.$postBottomBar.hasClass('is-slided')) {
            self.$postBottomBar.animate({
                'left': '+=' + self.$sidebar.width,
            }, 250, function() {
                self.$postBottomBar.removeClass('is-slided');
            });
        }
    };

    $(document).ready(function() {
        var sidebar = new Sidebar();
        sidebar.init();
    });
}(jQuery);