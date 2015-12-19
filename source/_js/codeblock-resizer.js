+function($) {
    'use strict';

    // Resize codeblocks

    var CodeBlockResizer = function(elem) {
        this.$codeBlocks = $(elem);
        // If you change value of `mediumScreenWidth`,
        // you have to change value of `$screen-min: (md-min)` too in `source/_css/utils/variables.scss`
        this.mediumScreenWidth = 768;
    };

    CodeBlockResizer.prototype = {
        run: function() {
            var self = this;
            // resize all codeblocks
            self.resize();
            // resize codeblocks when window is resized
            $(window).smartresize(function() {
                if ($(window).width() < self.mediumScreenWidth) {
                    self.resize();
                }
            })
        },
        resize: function() {
            var self = this;

            self.$codeBlocks.each(function() {
                var $figcaption = $(this).find('figcaption');
                var $gutter = $(this).find('.gutter');
                var $code = $(this).find('.code');
                // get padding of code div
                var codePaddings = $code.width() - $code.innerWidth();
                // figcaption div width with padding - gutter div with padding + code div padding
                var width = $figcaption.outerWidth() - $gutter.outerWidth() + codePaddings;
                // apply new width
                $code.css('width', width);
                $code.children('pre').css('width', width);
            });
        }
    };

    $(document).ready(function() {
        var resizer = new CodeBlockResizer('figure.highlight');
        resizer.run();
    });
}(jQuery);