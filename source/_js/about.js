+function ($) {
    'use strict';

    /**
     * AnimAbout Feature
     * @constructor
     */
    var AnimAbout = function() {
        this.$openBtn        = $("#sidebar").find("a[href='/about']");
        this.$closeBtn       = $('#about-btn-close');
        this.$blog           = $('#blog');
        this.$about          = $('#about');
        this.$aboutCard      = $('#about-card');
    };

    /**
     * Init the feature
     */
    AnimAbout.prototype.init = function() {
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
    AnimAbout.prototype.play = function() {
        var self = this;

        self.fadeOutBlog();
        self.fadeInAbout();
        setTimeout(function() {
            self.dropAboutCard();
        }, 300);
    };

    /**
     * Play back the animation
     */
    AnimAbout.prototype.playBack = function() {
        var self = this;

        self.upAboutCard();
        setTimeout(function() {
            self.fadeInBlog()
        }, 500);
        setTimeout(function() {
            self.fadeOutAbout()
        }, 500);
    };

    /**
     * Fade out the blog
     */
    AnimAbout.prototype.fadeOutBlog = function() {
        this.$blog.fadeOut();
    };

    /**
     * Fade in the blog
     */
    AnimAbout.prototype.fadeInBlog = function() {
        this.$blog.fadeIn();
    };

    /**
     * Fade out the about mask
     */
    AnimAbout.prototype.fadeOutAbout = function() {
        this.$about.fadeOut();
    };

    /**
     * Fade in the about mask
     */
    AnimAbout.prototype.fadeInAbout = function() {
        this.$about.fadeIn();
    };

    /**
     * Slide the card to the middle
     */
    AnimAbout.prototype.dropAboutCard = function() {
        var self = this;
        var aboutCardHeight = self.$aboutCard.innerHeight();

        console.log(aboutCardHeight);

        this.$aboutCard
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
    AnimAbout.prototype.upAboutCard = function() {
        var self = this;
        var aboutCardHeight = self.$aboutCard.innerHeight();

        this.$aboutCard.animate({
                top: '-=' + (($(window).height() / 2) - (aboutCardHeight / 2) + aboutCardHeight) + 'px'
            },
            500, function() {
                self.$aboutCard.hide();
        });

    };

    $(document).ready(function() {
        var animAbout = new AnimAbout();
        animAbout.init();
    })

}(jQuery);