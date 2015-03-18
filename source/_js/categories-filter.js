+function($) {
	'use strict';
	
	/**
	 * CategoriesFilter feature
	 * @param categoriesArchivesElem
	 * @constructor
	 */
	var CategoriesFilter = function (categoriesArchivesElem) {
		this.$inputSearch   = $(categoriesArchivesElem).find('input[name=category]');
		this.$archiveResult = $(categoriesArchivesElem).find('.archive-result');
		this.$categories    = $(categoriesArchivesElem).find('.category');
		this.$posts         = $(categoriesArchivesElem).find('.archive');
		this.categories     = categoriesArchivesElem + ' .category';
		this.posts          = categoriesArchivesElem + ' .archive';
	};
	
	/**
	 * Init categories filter feature
	 */
	CategoriesFilter.prototype.init = function() {
		var self = this;
		
		self.$inputSearch.keyup(function () {
			self.filter(self.getSearch());
		})
	}

	
	/**
	 * Get the search entered by user
	 */
	CategoriesFilter.prototype.getSearch = function() {
		return this.$inputSearch.val().replace('.', '__').toLowerCase();
	};
	
	/**
	 * Show related posts form a category and hide the others
	 * @param category
	 */
	CategoriesFilter.prototype.filter = function(category) {
		if (category == '') {
			this.showAll();
			this.showResult(-1);
		}
		else {
			this.hideAll();
			this.showPosts(category);
			this.showResult(this.countPosts(category));
		}
	};

	/**
	 * Display results of the search
	 * @param categoriesNumb
	 * @returns {Number}
	 */
	CategoriesFilter.prototype.showResult = function(categoriesNumb) {
		if (categoriesNumb == 0) {
			this.$archiveResult.html('No categories found').show();
		}
		else if (categoriesNumb == -1) {
			this.$archiveResult.html('').hide();
		}
		else {
			this.$archiveResult.html(categoriesNumb + ' categor' + ((categoriesNumb > 1) ? 'ies' : 'y') + ' found').show();
		}
	};

	/**
	 * Count number of categories
	 * @param category
	 * @returns {Number}
	 */
	CategoriesFilter.prototype.countPosts = function(category) {
		return $(this.posts + '[data-category*=' + category + ']').length;
	};

	/**
	 * Show all posts from a category
	 * @param category
	 */
	CategoriesFilter.prototype.showPosts = function(category) {
		$(this.categories + '[data-category*=' + category + ']').show();
		$(this.posts + '[data-category*=' + category + ']').show();
	};

	/**
	 * Show all categories and all posts
	 */
	CategoriesFilter.prototype.showAll = function() {
		this.$categories.show();
		this.$posts.show();
	};

	/**
	 * Hide all categories and all posts
	 */
	CategoriesFilter.prototype.hideAll = function() {
		this.$categories.hide();
		this.$posts.hide();
	};
	
	$(document).ready(function() {
		if ($('#categories-archives').length) {
			var categoriesFilter = new CategoriesFilter('#categories-archives');
			categoriesFilter.init();
		}
	});
}(jQuery);