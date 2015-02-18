+function ($) {
    'use strict';

    // Class Definition
    var Sidebar = function (sidebar, btnOpen, btnClose) {
        this.$element = sidebar;
        this.$element.width = this.$element.width();
        this.$btnOpen = btnOpen;
        this.$btnClose = btnClose;
    };

    /***
     * Init the sidebar
     */
    Sidebar.prototype.init = function() {
        var self = this;

        // Detect the click on the open button
        self.$btnOpen.click(function() {
            self.open();
        })

        // Detect the click out of the sidebar
        self.$btnClose.click(function() {
            if (self.$element.hasClass('opened')) {
                self.close();
            }
        })

        // Detect resize of the windows
        $(window).resize(function() {
            if ($(window).width() > 600) {
                self.$element.show();
                self.$element.css({'left':0});
            }
            else {
                self.$element.hide();
            }
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
        }, 300, function () {
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
        }, 300, function() {
            self.$element.removeClass('opened');
            self.$element.hide();
        });
    }


    $(document).ready(function() {
        var sidebar = new Sidebar($('#sidebar'), $('#btn-open-sidebar'), $('.header, .main'));
        sidebar.init();
    })
}(jQuery);