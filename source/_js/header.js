+function($) {
	'use strict';

	/**
	 * Header feature
	 * @constructor
	 */
	var Header = function() {
		this.$header       = $('#header');
		this.headerHeight  = this.$header.height();
		// if you change this value, you have to change
		// the CSS class located in `source/_css/layout/_header.scss`
		this.headerUpCSSClass = 'header-up';
		this.delta         = 5;
		this.lastScrollTop = 0;
	};

	/**
	 * Play the header feature
	 */
	Header.prototype.init = function() {
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
		var scrollTop = $(window).scrollTop();

		// Check if the user scrolled more than delta
		if (Math.abs(this.lastScrollTop - scrollTop) <= this.delta) {
			return;
		}

		// Checks if the user has scrolled enough down and  has past the navbar
		if ((scrollTop > this.lastScrollTop) && (scrollTop > this.headerHeight)) {
			this.$header.addClass(headerUpCSSClass);
		}
		else {
			// Check if the user has scrolled to the top of the page
			if (scrollTop + $(window).height() < $(document).height()) {
				this.$header.removeClass(headerUpCSSClass);
			}
		}

		this.lastScrollTop = scrollTop;
	};

	$(document).ready(function() {
		var header = new Header();
		header.init();
	});
}(jQuery);