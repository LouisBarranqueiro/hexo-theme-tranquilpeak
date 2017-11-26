(function($) {
  'use strict';
  
  // Run fancybox feature

  $(document).ready(function() {
    /**
     * Configure and run Fancybox plugin
     * @returns {void}
     */
    function fancyFox() {
      var arrows = true;
      var thumbs = null;

      // disable navigation arrows and display thumbs on medium and large screens
      if ($(window).height() > 480) {
        arrows = false;
        thumbs = {
          width: 70,
          height: 70
        };
      }

      $('.fancybox').fancybox({
        buttons : [
          'fullScreen',
          'thumbs',
          'share',
          'download',
          'zoom',
          'close'
        ],
        thumbs: {
          autoStart: true,
          axis: 'x'
        }
      });
    }

    fancyFox();
    
    $(window).smartresize(function() {
      fancyFox();
    });
  });
})(jQuery);
