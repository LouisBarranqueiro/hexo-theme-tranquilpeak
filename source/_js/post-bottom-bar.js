(function($) {
  'use strict';

  // Hide the post bottom bar when the post footer is visible by the user,
  // and show it when the post footer isn't visible by the user

  /**
   * PostBottomBar
   * @constructor
   */
  var PostBottomBar = function() {
    this.$postBottomBar = $('.post-bottom-bar');
    this.$postFooter = $('.post-actions-wrap');
    this.$header = $('#header');
    this.delta = 15;
    this.lastScrollTop = 0;
    this.lastScrollDownPos = 0;
    this.lastScrollUpPos = 0;
  };

  PostBottomBar.prototype = {

    /**
     * Run PostBottomBar feature
     * @return {void}
     */
    run: function() {
      var self = this;
      var didScroll;
      // Run animation for first time
      self.swipePostBottomBar();
      // Detects if the user is scrolling
      $(window).scroll(function() {
        didScroll = true;
      });
      // Check if the user scrolled every 250 milliseconds
      setInterval(function() {
        if (didScroll) {
          self.swipePostBottomBar();
          didScroll = false;
        }
      }, 250);
    },

    /**
     * Swipe the post bottom bar
     * @return {void}
     */
    swipePostBottomBar: function() {
      var scrollTop = $(window).scrollTop();
      var postFooterOffsetTop = this.$postFooter.offset().top;

      // scrolling up
      if (this.lastScrollTop > scrollTop) {
        // show bottom bar
        // if the user scrolled upwards more than `delta`
        // and `post-footer` div isn't visible
        if (Math.abs(this.lastScrollDownPos - scrollTop) > this.delta &&
          (postFooterOffsetTop + this.$postFooter.height() > scrollTop + $(window).height() ||
            postFooterOffsetTop < scrollTop + this.$header.height())) {
          this.$postBottomBar.slideDown();
          this.lastScrollUpPos = scrollTop;
        }
      }

      // scrolling down
      if (scrollTop > this.lastScrollUpPos + this.delta) {
        this.$postBottomBar.slideUp();
        this.lastScrollDownPos = scrollTop;
      }

      this.lastScrollTop = scrollTop;
    }
  };

  $(document).ready(function() {
    if ($('.post-bottom-bar').length) {
      var postBottomBar = new PostBottomBar();
      postBottomBar.run();
    }
  });
})(jQuery);
