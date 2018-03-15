(function($) {
  'use strict';

  // Run fancybox feature

  $(document).ready(function() {
    /**
     * Configure and run Fancybox plugin
     * @returns {void}
     */
    function fancyFox() {
      var thumbs = false;

      // disable navigation arrows and display thumbs on medium and large screens
      if ($(window).height() > 480) {
        thumbs = true;
      }

      $('.fancybox').fancybox({
        buttons: [
          'fullScreen',
          'thumbs',
          'share',
          'download',
          'zoom',
          'close'
        ],
        thumbs: {
          autoStart: thumbs,
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
