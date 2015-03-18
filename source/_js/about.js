+function ($) {
    'use strict';

    /**
     * AboutCard Feature
     * @constructor
     */
    var AboutCard = function() {
        this.$openBtn   = $("#sidebar").find("a[href='/about']");
        this.$closeBtn  = $('#about-btn-close');
        this.$blog      = $('#blog');
        this.$about     = $('#about');
        this.$aboutCard = $('#about-card');
    };

    /**
     * Init the feature
     */
    AboutCard.prototype.init = function() {
        var self = this;

        self.$openBtn.click(function(e) {
            e.preventDefault();
            self.play();
        })
        self.$closeBtn.click(function(e) {
            e.preventDefault();
            self.playBack();
        })
    };

    /**
     * Play the animation
     */
    AboutCard.prototype.play = function() {
        var self = this;

        self.$blog.fadeOut();
        self.$about.fadeIn();
        setTimeout(function() {
            self.dropAboutCard();
        }, 300);
    };

    /**
     * Play back the animation
     */
    AboutCard.prototype.playBack = function() {
        var self = this;

        self.upAboutCard();
        setTimeout(function() {
            self.$blog.fadeIn();
        }, 500);
        setTimeout(function() {
            self.$about.fadeOut();
        }, 500);
    };

    /**
     * Slide the card to the middle
     */
    AboutCard.prototype.dropAboutCard = function() {
        var self = this;
        var aboutCardHeight = self.$aboutCard.innerHeight();

        self.$aboutCard
            .css('top','0px')
            .css('top','-' + aboutCardHeight + 'px')
            .show(500, function () {
                self.$aboutCard.animate({
                    top: '+=' + (($(window).height() / 2) - (aboutCardHeight / 2) + aboutCardHeight) + 'px'
                });
            })
    };

    /**
     * Slide the card to the top
     */
    AboutCard.prototype.upAboutCard = function() {
        var self = this;
        var aboutCardHeight = self.$aboutCard.innerHeight();

        self.$aboutCard.animate({
            top: '-=' + (($(window).height() / 2) - (aboutCardHeight / 2) + aboutCardHeight) + 'px'
        }, 500, function() {
            self.$aboutCard.hide();
        });

    };

    $(document).ready(function() {
        var aboutCard = new AboutCard();
        aboutCard.init();
    })
}(jQuery);