+function($) {
	'use strict'
	
	/**
	 * ImageGallery Feature
	 * @constructor
	 */
	var ImageGallery = function() {
		this.photosBox = '.photo-box';
		this.$images   = $(this.photosBox + ' img');
	};

	/**
	 * Init ImageGallery feature
	 */
	ImageGallery.prototype.init = function() {
		var self = this;

		self.resizeImage();
		$(window).smartresize(function() {
			self.resizeImage();
		});
	};

	/**
	 * Resize image
	 */
	ImageGallery.prototype.resizeImage = function() {
		var photoBoxWidth;
		var	photoBoxHeight;
		var imageWidth;
		var imageHeight;
		var photoRatio;
		var $image;

		this.$images.each(function() {
			$image         = $(this);
			photoBoxWidth  = $image.parent().parent().width();
			photoBoxHeight = $image.parent().parent().innerHeight();
			imageWidth     = $image.width();
			imageHeight    = $image.height();
			
			if (imageHeight < photoBoxHeight) {
				photoRatio  = (imageWidth / imageHeight);
				$image.css({
					'height': photoBoxHeight,
					'width': (photoBoxHeight * photoRatio)
				});
				$image.parent().css({
					'left': '-' + (((photoBoxHeight * photoRatio) / 2) - (photoBoxWidth / 2)) + 'px'
				});
			}
		});
	};

	$(document).ready(function() {
		if ($('.image-gallery').length) {
			var imageGallery = new ImageGallery();

			setTimeout(function() {
				imageGallery.init();
			}, 500);
		}
	});
}(jQuery);