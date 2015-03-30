+function($) {
    'use strict';

    /**
     * Sidebar feature
     * @constructor
     */
    var Sidebar = function() {
        this.$sidebar       = $('#sidebar');
        this.$openBtn       = $('#btn-open-sidebar');
        this.$closeBtn      = $('#header, #main');
        this.$postBottomBar = $('.post-bottom-bar');
        this.windowMdScreen = 768;
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
            if ($(window).width() > self.windowMdScreen) {
                self.$sidebar.show();
            }
            else {
                self.$sidebar.hide();
            }

            // Reset position of all objects
            self.resetSidebarPosition();
            self.resetBlogPosition();
            self.resetPostBottomBarPosition();
        })
    };

    /**
     * Reset sidebar position
     */
    Sidebar.prototype.resetSidebarPosition = function() {
        this.$sidebar
            .css({'left': ''})
            .removeClass('opened');
    };

    /**
     * Reset blog position
     */
    Sidebar.prototype.resetBlogPosition = function() {
        this.$closeBtn
            .css({'margin-left': ''})
            .removeClass('is-slided');
    };

    /**
     * Reset post's bottom bar position
     */
    Sidebar.prototype.resetPostBottomBarPosition = function() {
        this.$postBottomBar
            .css({'left':''})
            .removeClass('is-slided');
    };

    /**
     * Open the sidebar
     */
    Sidebar.prototype.openSidebar = function() {
        var self = this;

        self.$sidebar
            .css({'left': '-' + self.$sidebar.width() + 'px'})
            .show();
        
        self.$sidebar.animate({
            left: '+=' + self.$sidebar.width()
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
            left: '-=' + self.$sidebar.width(),
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
                'margin-left': '+=' + self.$sidebar.width() + 'px',
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
                'margin-left': '-=' + self.$sidebar.width() + 'px',
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
                'left': '+=' + self.$sidebar.width(),
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
                'left': '-=' + self.$sidebar.width(),
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