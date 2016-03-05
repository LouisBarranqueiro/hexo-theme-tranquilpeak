+function($) {

    // Animate tabs of tabbed code blocks
    
    /**
     * TabbedCodeBlock
     * @constructor
     */
    var TabbedCodeBlock = function(elems) {
        this.$tabbedCodeBlocs = $(elems);
    };
    
    TabbedCodeBlock.prototype = {
        /**
         * Run TabbedCodeBlock feature
         */
        run: function() {
            var self = this;
            self.$tabbedCodeBlocs.find('.tab').click(function() {
                var $codeblock = $(this).parent().parent().parent();
                var $tabsContent = $codeblock.find('.tabs-content').children('pre, .highlight');
                // remove `active` css class on all tabs
                $(this).siblings().removeClass('active');
                // add `active` css class on the clicked tab
                $(this).addClass('active');
                // hide all tab contents
                $tabsContent.hide();
                // show only the right one
                $tabsContent.eq($(this).index()).show();
            });
        }
    };
    
    $(document).ready(function() {
        var tabbedCodeBlocks = new TabbedCodeBlock('.codeblock--tabbed');
        tabbedCodeBlocks.run();
    });
}(jQuery);