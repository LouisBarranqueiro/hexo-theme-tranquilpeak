+function($) {
    $(document).ready(function() {
        // Fancybox
        $(".fancybox").fancybox({
            maxWidth	: 900,
            maxHeight	: 800,
            fitToView	: false,
            width		: '70%',
            height		: '70%',
            autoSize	: true,
            closeClick	: false,
            openEffect	: 'none',
            closeEffect	: 'none'
        });

        // Fancybox-thumb helper
        $(".fancybox-thumb").fancybox({
            prevEffect	: 'none',
            nextEffect	: 'none',
            helpers	: {
                title	: {
                    type: 'outside'
                },
                thumbs	: {
                    width	: 70,
                    height	: 70
                }
            }
        });

        // Fancybox button to launch a fancybox with an external button
        $('.fancybox-button').click(function(e) {
            e.preventDefault();
            $('.fancybox-thumb:eq(0)').click();
        });
    });
}(jQuery);