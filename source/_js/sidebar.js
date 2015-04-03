+function($) {
    'use strict';

    // Open and close the sidebar by swiping the sidebar and the blog and vice versa

    /**
     * Sidebar
     * @constructor
     */
    var Sidebar = function() {
        this.$sidebar          = $('#sidebar');
        this.$openBtn          = $('#btn-open-sidebar');
        this.$closeBtn         = $('#header, #main'); // Elements where the user can click to close the sidebar
        this.$blog             = $('#header, #main, .post-bottom-bar');
        // If you change value of `mediumScreenWidth`,
        // you have to change value of `$screen-min: (md-min)` too in `source/_css/utils/variables.scss`
        this.mediumScreenWidth = 768;
    };

    /**
     * Run Sidebar feature
     */
    Sidebar.prototype.run = function() {
        var self = this;

        self.$openBtn.click(function() { // Detect the click on the open button
            self.openSidebar();
        })

        self.$closeBtn.click(function() { // Detect the click on close button
            self.closeSidebar();
        })

        $(window).resize(function() { // Detect resize of the windows
            if ($(window).width() > self.mediumScreenWidth) { // Check if the window is larger than the minimal medium screen value
                self.resetSidebarPosition();
                self.resetBlogPosition();
            }
            else {
                self.closeSidebar();
            }
        })
    };

    /**
     * Open the sidebar by swiping to the right the sidebar and the blog
     */
    Sidebar.prototype.openSidebar = function() {
        this.swipeSidebarToRight();
        this.swipeBlogToRight();
    };

    /**
     * Close the sidebar by swiping to the left the sidebar and the blog
     */
    Sidebar.prototype.closeSidebar = function() {
        this.swipeSidebarToLeft();
        this.swipeBlogToLeft();
    };

    /**
     * Reset sidebar position
     */
    Sidebar.prototype.resetSidebarPosition = function() {
        this.$sidebar
            .css({
                display: '',
                left: ''
            })
            .removeClass('swiped');
    };

    /**
     * Reset blog position
     */
    Sidebar.prototype.resetBlogPosition = function() {
        this.$blog
            .css({
                display: '',
                'margin-left': '',
                position: ''
            })
            .removeClass('swiped');
    };

    /**
     * Swipe the sidebar to the right
     */
    Sidebar.prototype.swipeSidebarToRight = function() {
        var self = this;

        // Check if the sidebar isn't swiped and prevent multiple click on the open button with `.processing` class
        if (!self.$sidebar.hasClass('swiped') && !this.$sidebar.hasClass('processing')) {
            // Position the sidebar at the right of the window
            self.$sidebar
                .addClass('processing')
                .css({'left': '-' + self.$sidebar.width() + 'px'})
                .show();

            // Swipe the sidebar to the right
            self.$sidebar.animate({
                left: '+=' + self.$sidebar.width()
            }, 250, function() {
                self.$sidebar
                    .addClass('swiped')
                    .removeClass('processing');
            });
        }
    };

    /**
     * Swipe the sidebar to the left
     */
    Sidebar.prototype.swipeSidebarToLeft = function() {
        var self = this;
            // Check if the sidebar is swiped and prevent multiple click on the close button with `.processing` class
        if (self.$sidebar.hasClass('swiped') && !this.$sidebar.hasClass('processing')) {
            // Swipe the sidebar to the left
            self.$sidebar
                .addClass('processing')
                .animate({
                    left: '-=' + self.$sidebar.width(),
                }, 250, function() {
                    self.$sidebar
                        .removeClass('swiped')
                        .hide()
                        .removeClass('processing');
                });
        }
    };

    /**
     * Swipe the blog to the right
     */
    Sidebar.prototype.swipeBlogToRight = function() {
        var self = this;

        // Check if the blog isn't swiped and prevent multiple click on the open button with `.processing` class
        if (!self.$blog.hasClass('swiped') && !this.$blog.hasClass('processing')) {
            // Swipe the blog to the right
            self.$blog
                .addClass('processing')
                .animate({
                    'margin-left': '+=' + self.$sidebar.width() + 'px'
                }, 250, function() {
                    self.$blog
                        .addClass('swiped')
                        .removeClass('processing');
                })
        }
    };

    /**
     * Swipe the blog to the left
     */
    Sidebar.prototype.swipeBlogToLeft = function() {
        var self = this;

        // Check if the blog is swiped and prevent multiple click on the close button with `.processing` class
        if (self.$blog.hasClass('swiped') && !this.$blog.hasClass('processing')) {
            // Swipe the blog to the left
            self.$blog
                .addClass('processing')
                .animate({
                    'margin-left': '-=' + self.$sidebar.width() + 'px',
                }, 250, function() {
                    self.$blog
                        .removeClass('swiped')
                        .removeClass('processing');
                })
        }
    };

    $(document).ready(function() {
        var sidebar = new Sidebar();
        sidebar.run();
    });
}(jQuery);