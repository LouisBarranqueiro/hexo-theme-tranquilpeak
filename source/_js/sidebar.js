+function($) {
    'use strict';

    // Open and close the sidebar by swiping the sidebar and the blog and vice versa

    /**
     * Sidebar
     * @constructor
     */
    var Sidebar = function() {
        this.$sidebar = $('#sidebar');
        this.$openBtn = $('#btn-open-sidebar');
        // Elements where the user can click to close the sidebar
        this.$closeBtn = $('#header, #main, .post-header-cover');
        // Elements affected by the swipe of the sidebar
        // The `pushed` class is added to each elements
        // Each element has a different behavior when the sidebar is opened
        this.$blog = $('body, .post-bottom-bar, #header, #main, .post-header-cover');
        // If you change value of `mediumScreenWidth`,
        // you have to change value of `$screen-min: (md-min)` too in `source/_css/utils/variables.scss`
        this.mediumScreenWidth = 768;
    };

    Sidebar.prototype = {

        /**
         * Run Sidebar feature
         */
        run: function() {
            var self = this;

            // Detect the click on the open button
            self.$openBtn.click(function() {
                if (!self.$sidebar.hasClass('pushed')) {
                    self.openSidebar();
                }
            });

            // Detect the click on close button
            self.$closeBtn.click(function() {
                if (self.$sidebar.hasClass('pushed')) {
                    self.closeSidebar();
                }
            });

            // Detect resize of the windows
            $(window).resize(function() {
                // Check if the window is larger than the minimal medium screen value
                if ($(window).width() > self.mediumScreenWidth) {
                    self.resetSidebarPosition();
                    self.resetBlogPosition();
                }
                else {
                    self.closeSidebar();
                }
            });
        },

        /**
         * Open the sidebar by swiping to the right the sidebar and the blog
         */
        openSidebar: function() {
            this.swipeBlogToRight();
            this.swipeSidebarToRight();
        },

        /**
         * Close the sidebar by swiping to the left the sidebar and the blog
         */
        closeSidebar: function() {
            this.swipeSidebarToLeft();
            this.swipeBlogToLeft();
        },

        /**
         * Reset sidebar position
         */
        resetSidebarPosition: function() {
            this.$sidebar.removeClass('pushed');
        },

        /**
         * Reset blog position
         */
        resetBlogPosition: function() {
            this.$blog.removeClass('pushed');
        },

        /**
         * Swipe the sidebar to the right
         */
        swipeSidebarToRight: function() {
            var self = this;

            // Check if the sidebar isn't swiped and prevent multiple click on the open button with `.processing` class
            if (!self.$sidebar.hasClass('pushed') && !this.$sidebar.hasClass('processing')) {
                // Swipe the sidebar to the right
                self.$sidebar.addClass('processing pushed');

                setTimeout(function() {
                    self.$sidebar.removeClass('processing');
                }, 250);
            }
        },

        /**
         * Swipe the sidebar to the left
         */
        swipeSidebarToLeft: function() {
            var self = this;

            // Check if the sidebar is swiped and prevent multiple click on the close button with `.processing` class
            if (self.$sidebar.hasClass('pushed') && !this.$sidebar.hasClass('processing')) {
                // Swipe the sidebar to the left
                self.$sidebar
                    .addClass('processing')
                    .removeClass('pushed processing');
            }
        },

        /**
         * Swipe the blog to the right
         */
        swipeBlogToRight: function() {
            var self = this;

            // Check if the blog isn't swiped and prevent multiple click on the open button with `.processing` class
            if (!self.$blog.hasClass('pushed') && !this.$blog.hasClass('processing')) {
                // Swipe the blog to the right
                self.$blog.addClass('processing pushed');

                setTimeout(function() {
                    self.$blog.removeClass('processing');
                }, 250);
            }
        },

        /**
         * Swipe the blog to the left
         */
        swipeBlogToLeft: function() {
            var self = this;

            // Check if the blog is swiped and prevent multiple click on the close button with `.processing` class
            if (self.$blog.hasClass('pushed') && !this.$blog.hasClass('processing')) {
                // Swipe the blog to the left
                self.$blog
                    .addClass('processing')
                    .removeClass('pushed');

                setTimeout(function() {
                    self.$blog.removeClass('processing');
                }, 250);
            }
        }
    };

    $(document).ready(function() {
        var sidebar = new Sidebar();
        sidebar.run();
    });
    
    //open external link in sidebar
    $(document).ready(function() {
    $('a').each(function() {
      var a = new RegExp('/' + window.location.host + '/');
      if (!a.test(this.href)) {
      $(this).attr("target","_blank");
      }
   });
});
}(jQuery);