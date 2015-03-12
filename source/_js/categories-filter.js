+function ($) {
	'use strict';
	
	/**
	 * CategoriesFilter
	 *
	 * @param categoriesArchivesElem
	 * @constructor
	 */
	var CategoriesFilter = function (categoriesArchivesElem) {
		this.$inputSearch = $(categoriesArchivesElem + ' #filter-form input[name=category]');
		this.categories   = categoriesArchivesElem + ' .category';
		this.posts        = categoriesArchivesElem + ' .archive';
		this.$categories  = $(this.categories);
		this.$posts       = $(this.posts);
	};
	
	/**
	 * Init categories filter
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
	 * Show related posts and hide others
	 *
	 * @param category
	 */
	CategoriesFilter.prototype.filter = function(category) {
		if (category == '') {
			this.showAll();
		}
		else {
			this.hideAll();
			this.showPosts(category);
		}
	};

	/**
	 * Show a category and his posts
	 * @param category
	 */
	CategoriesFilter.prototype.showPosts = function(category) {
		$(this.categories + '[data-category*=' + category + ']').show();
		$(this.posts + '[data-category*=' + category + ']').show();
	};

	/**
	 * Show all categories and posts
	 */
	CategoriesFilter.prototype.showAll = function() {
		this.$categories.show();
		this.$posts.show();
	};

	/**
	 * Hide all categories and posts
	 */
	CategoriesFilter.prototype.hideAll = function() {
		this.$categories.hide();
		this.$posts.hide();
	};
	
	$(document).ready(function() {
		var categoriesFilter;

		if ($('#categories-archives').length) {
			categoriesFilter = new CategoriesFilter('#categories-archives');
			categoriesFilter.init();
		}
	})
}(jQuery);