+function ($) {
     'use strict';

     $(document).ready(function() {
         if ($('.post-bottom-bar').is('visible')) {
             var $postBootmBar = $('.post-bottom-bar');
             var $postFooterElem = $('.post-footer');
             var $window = $(window);
             var postFooterElemPos = $postFooterElem.offset().top + $postFooterElem.height();

             // Detect the scroll
             $window.scroll(function () {
                 // Check if the post-footer div is visible by the user
                 if (($window.scrollTop() + $window.height()) > postFooterElemPos) {
                     $postBootmBar.slideUp();
                 }
                 else {
                     $postBootmBar.slideDown();
                 }
             })
         }
     })
 }(jQuery);