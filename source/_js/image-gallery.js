+function($) {
	'use strict'
	// Resize all images of an image-gallery

	/**
	 * ImageGallery Feature
	 * @constructor
	 */
	var ImageGallery = function() {
		this.photosBox = '.photo-box'; // Reference to the CSS class located in `source/_css/components/_image-gallery.scss`
		this.$images   = $(this.photosBox + ' img');
	};

	/**
	 * Init ImageGallery feature
	 */
	ImageGallery.prototype.init = function() {
		var self = this;

		// Resize all images at the loading of the page
		self.resizeImages();

		// Resize all images when the user is resizing the page
		$(window).smartresize(function() {
			self.resizeImages();
		});
	};

	/**
	 * Resize all images of an image gallery
	 */
	ImageGallery.prototype.resizeImages = function() {
		var photoBoxWidth;
		var	photoBoxHeight;
		var imageWidth;
		var imageHeight;
		var imageRatio;
		var $image;

		this.$images.each(function() {
			$image         = $(this);
			photoBoxWidth  = $image.parent().parent().width();
			photoBoxHeight = $image.parent().parent().innerHeight();
			imageWidth     = $image.width();
			imageHeight    = $image.height();

			// Checks if image height is smaller than his box
			if (imageHeight < photoBoxHeight) {
				imageRatio  = (imageWidth / imageHeight);
				// Resize image with the box height
				$image.css({
					'height': photoBoxHeight,
					'width': (photoBoxHeight * imageRatio)
				});
				// Center image in his box
				$image.parent().css({
					'left': '-' + (((photoBoxHeight * imageRatio) / 2) - (photoBoxWidth / 2)) + 'px'
				});
			}
			// Checks if image height is larger than his box
			else if (imageHeight > photoBoxHeight) {
				// Center image in his box
				$image.parent().css({
					'top': '-' + (((imageHeight) / 2) - (photoBoxHeight / 2)) + 'px'
				});
			}
		});
	};

	$(document).ready(function() {
		if ($('.image-gallery').length) {
			var imageGallery = new ImageGallery();

			// Small timeout to wait the loading of all images.
			setTimeout(function() {
				imageGallery.init();
			}, 500);
		}
	});
}(jQuery);