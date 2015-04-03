+function($) {
	'use strict';

	// Hide the header when the user scrolls down, and show it when he scrolls up

	/**
	 * Header
	 * @constructor
	 */
	var Header = function() {
		this.$header       = $('#header');
		this.headerHeight  = this.$header.height();
		this.headerUpCSSClass = 'header-up'; // Reference to the CSS class located in `source/_css/layout/_header.scss`
		this.delta         = 5;
		this.lastScrollTop = 0;
		this.scrollTop;
	};

	/**
	 * Run Header feature
	 */
	Header.prototype.run = function() {
		var self = this;
		var didScroll;

		// Detects if the user is scrolling
		$(window).scroll(function() {
			self.didScroll = true;
		});

		setInterval(function() {
			if (self.didScroll) {
				self.animate();
				self.didScroll = false;
			}
		}, 250);
	};

	/**
	 * Animate the header
	 */
	Header.prototype.animate = function() {
		this.scrollTop = $(window).scrollTop();

		// Check if the user scrolled more than `delta`
		if (Math.abs(this.lastScrollTop - this.scrollTop) <= this.delta) {
			return;
		}

		// Checks if the user has scrolled enough down and has past the navbar
		if ((this.scrollTop > this.lastScrollTop) && (this.scrollTop > this.headerHeight)) {
			this.$header.addClass(this.headerUpCSSClass);
		}
		else {
			// Check if the user has scrolled to the top of the page
			if (this.scrollTop + $(window).height() < $(document).height()) {
				this.$header.removeClass(this.headerUpCSSClass);
			}
		}

		this.lastScrollTop = this.scrollTop;
	};

	$(document).ready(function() {
		var header = new Header();
		header.run();
	});
}(jQuery);