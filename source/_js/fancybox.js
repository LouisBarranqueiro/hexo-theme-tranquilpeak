(function($) {
  'use strict';
  
  // Run fancybox feature

  $(document).ready(function() {
    $(".fancybox").fancybox({
      maxWidth: 900,
      maxHeight: 800,
      fitToView: true,
      width: '50%',
      height: '50%',
      autoSize: true,
      closeClick: false,
      openEffect: 'elastic',
      closeEffect: 'elastic',
      prevEffect: 'none',
      nextEffect: 'none',
      padding: '0',
      helpers: {
        thumbs: {
          width: 70,
          height: 70
        },
        overlay: {
          css: {
            background: 'rgba(0, 0, 0, 0.85)'
          }
        }
      }
    });
  });
})(jQuery);
