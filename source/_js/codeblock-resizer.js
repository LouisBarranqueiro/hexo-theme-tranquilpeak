+function($) {
    'use strict';

    // Resize codeblocks to fit the screen width

    var CodeBlockResizer = function(elem) {
        this.$codeBlocks = $(elem);
    };

    CodeBlockResizer.prototype = {
        /**
         * Run main feature
         */
        run: function() {
            var self = this;
            // resize all codeblocks
            self.resize();
            // resize codeblocks when window is resized
            $(window).smartresize(function() {
                self.resize();
            });
        },

        /**
         * Resize codeblocks
         */
        resize: function() {
            var self = this;
            self.$codeBlocks.each(function() {
                var $gutter = $(this).find('.gutter');
                var $code = $(this).find('.code');
                // get padding of code div
                var codePaddings = $code.width() - $code.innerWidth();
                // codeblock div width with padding - gutter div with padding + code div padding
                var width = $(this).outerWidth() - $gutter.outerWidth() + codePaddings;
                // apply new width
                $code.css('width', width);
                $code.children('pre').css('width', width);
                // Add extra padding-bottom to gutter
                if ($code.find('pre').hasHorizontalScrollBar()) {
                    // 21px : perfect height to simulate a scroll bar added to the gutter
                    // used to align line number with line of code
                    $gutter.css('padding-bottom', '21px');
                }
            });
        }
    };

    $(document).ready(function() {
        // register jQuery function to check if an element has an horizontal scroll bar
        $.fn.hasHorizontalScrollBar = function() {
            return this.get(0).scrollWidth > this.innerWidth();
        };
        var resizer = new CodeBlockResizer('figure.highlight');
        resizer.run();
    });
}(jQuery);