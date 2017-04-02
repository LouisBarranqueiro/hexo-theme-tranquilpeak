(function($) {
  'use strict';

  // Fade out the blog and let drop the notify card of push notification permission request and vice versa

  /**
   * NotifyCard
   * @constructor
   */
  var NotifyCard = function() {
    this.$openBtn = $("#sidebar, #header").find("a[href*='#notify']");
    this.$closeBtn = $('#notify-btn-close');
    this.$blog = $('#blog');
    this.$notify = $('#notify');
    this.$notifyCard = $('#notify-card');
  };

  NotifyCard.prototype = {

    /**
     * Run NotifyCard feature
     * @return {void}
     */
    run: function() {
      var self = this;
      // Detect click on open button
      self.$openBtn.click(function(e) {
        e.preventDefault();
        self.play();
      });
      // Detect click on close button
      self.$closeBtn.click(function(e) {
        e.preventDefault();
        self.playBack();
      });
    },

    /**
     * Play the animation
     * @return {void}
     */
    play: function() {
      var self = this;
      // Fade out the blog
      self.$blog.fadeOut();
      // Fade in the notify card
      self.$notify.fadeIn();
      // Small timeout to drop the notify card after that
      // the notify card fade in and the blog fade out
      setTimeout(function() {
        self.dropNotifyCard();
      }, 300);
    },

    /**
     * Play back the animation
     * @return {void}
     */
    playBack: function() {
      var self = this;
      // Lift the notify card
      self.liftNotifyCard();
      // Fade in the blog after that the notify card lifted up
      setTimeout(function() {
        self.$blog.fadeIn();
      }, 500);
      // Fade out the notify card after that the notify card lifted up
      setTimeout(function() {
        self.$notify.fadeOut();
      }, 500);
    },

    /**
     * Slide the card to the middle
     * @return {void}
     */
    dropNotifyCard: function() {
      var self = this;
      var notifyCardHeight = self.$notifyCard.innerHeight();
      // default offset from top
      var offsetTop = ($(window).height() / 2) - (notifyCardHeight / 2) + notifyCardHeight;
      // if card is longer than the window
      // scroll is enable
      // and re-define offsetTop
      if (notifyCardHeight + 30 > $(window).height()) {
        offsetTop = notifyCardHeight;
      }
      self.$notifyCard
        .css('top', '0px')
        .css('top', '-' + notifyCardHeight + 'px')
        .show(500, function() {
          self.$notifyCard.animate({
            top: '+=' + offsetTop + 'px'
          });
        });
    },

    /**
     * Slide the card to the top
     * @return {void}
     */
    liftNotifyCard: function() {
      var self = this;
      var notifyCardHeight = self.$notifyCard.innerHeight();
      // default offset from top
      var offsetTop = ($(window).height() / 2) - (notifyCardHeight / 2) + notifyCardHeight;
      if (notifyCardHeight + 30 > $(window).height()) {
        offsetTop = notifyCardHeight;
      }
      self.$notifyCard.animate({
        top: '-=' + offsetTop + 'px'
      }, 500, function() {
        self.$notifyCard.hide();
        self.$notifyCard.removeAttr('style');
      });
    }
  };

  $(document).ready(function() {
    var notifyCard = new NotifyCard();
    notifyCard.run();
  });
})(jQuery);
