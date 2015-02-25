+function ($) {
	'use strict';

	// Class definition
	var TagsSearch = function (inputSearchElement, tagsElements, postsElements) {
		this.$inputSearch = $(inputSearchElement);
		this.tags = tagsElements;
		this.posts = postsElements;
		this.$tags = $(tagsElements);
		this.$posts = $(postsElements);
	};

	/**
	 * Init TagsSearch
	 */
	TagsSearch.prototype.init = function() {
		var self = this;

		self.$inputSearch.keyup(function () {
			self.search();
		})
	}

	/**
	 * Search a tag and display related posts
	 */
	TagsSearch.prototype.search = function() {
		var self = this;
		var search = self.$inputSearch.val().replace('.', '__').toLowerCase();

		if (search == '') {
			self.$tags.show();
			self.$posts.show();
		}
		else {
			self.$tags.hide();
			self.$posts.hide();
			$(self.tags + '[data-tag*=' + search + ']').show();
			$(self.posts + '[data-tag*=' + search + ']').show();
		}
	};

	$(document).ready(function() {
		var tagsSearch = new TagsSearch('form#tag-search > input#tag','.a-tag','.a-posts');
		tagsSearch.init();
	})

}(jQuery);