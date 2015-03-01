+function($) {
    $(document).ready(function() {
        $(".fancybox").fancybox({
            maxWidth	: 1000,
            maxHeight	: 800,
            fitToView	: false,
            width		: '70%',
            height		: '70%',
            autoSize	: true,
            closeClick	: false,
            openEffect	: 'none',
            closeEffect	: 'none'
        });
    });
}(jQuery);