+function($) {
    'use strict';

    // Fade out the blog and let drop the about card of the author and vice versa

    /**
     * AboutCard
     * @constructor
     */
    var AboutCard = function() {
        this.$openBtn   = $("#sidebar, #header").find("a[href*='#about']");
        this.$closeBtn  = $('#about-btn-close');
        this.$blog      = $('#blog');
        this.$about     = $('#about');
        this.$aboutCard = $('#about-card');
    };

    AboutCard.prototype = {

        /**
         * Run AboutCard feature
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
         */
        play: function() {
            var self = this;
            // Fade out the blog
            self.$blog.fadeOut();
            // Fade in the about card
            self.$about.fadeIn();
            // Small timeout to drop the about card after that
            // the about card fade in and the blog fade out
            setTimeout(function() {
                self.dropAboutCard();
            }, 300);
        },

        /**
         * Play back the animation
         */
        playBack: function() {
            var self = this;

            // Lift the about card
            self.liftAboutCard();
            // Fade in the blog after that the about card lifted up
            setTimeout(function() {
                self.$blog.fadeIn();
            }, 500);
            // Fade out the about card after that the about card lifted up
            setTimeout(function() {
                self.$about.fadeOut();
            }, 500);
        },

        /**
         * Slide the card to the middle
         */
        dropAboutCard: function() {
            var self            = this;
            var aboutCardHeight = self.$aboutCard.innerHeight();

            self.$aboutCard
                .css('top', '0px')
                .css('top', '-' + aboutCardHeight + 'px')
                .show(500, function() {
                    self.$aboutCard.animate({
                        top: '+=' + (($(window).height() / 2) - (aboutCardHeight / 2) + aboutCardHeight) + 'px'
                    });
                });
        },

        /**
         * Slide the card to the top
         */
        liftAboutCard: function() {
            var self            = this;
            var aboutCardHeight = self.$aboutCard.innerHeight();

            self.$aboutCard.animate({
                top: '-=' + (($(window).height() / 2) - (aboutCardHeight / 2) + aboutCardHeight) + 'px'
            }, 500, function() {
                self.$aboutCard.hide();
            });
        }
    };

    $(document).ready(function() {
        var aboutCard = new AboutCard();
        aboutCard.run();
    });
}(jQuery);