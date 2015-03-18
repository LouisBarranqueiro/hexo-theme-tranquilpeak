+function ($) {
	'use strict';

	/**
	 * TagsFilter feature
	 *
	 * @param tagsArchivesElem
	 * @constructor
	 */
	var TagsFilter = function (tagsArchivesElem) {
		this.$inputSearch   = $(tagsArchivesElem + ' #filter-form input[name=tag]');
		this.$archiveResult = $(tagsArchivesElem).find('.archive-result');
		this.$tags          = $(tagsArchivesElem).find('.tag');
		this.$posts         = $(tagsArchivesElem).find('.archive');
		this.tags           = tagsArchivesElem + ' .tag';
		this.posts          = tagsArchivesElem + ' .archive';
	};

	/**
	 * Init tags filter
	 */
	TagsFilter.prototype.init = function() {
		var self = this;

		self.$inputSearch.keyup(function () {
			self.filter(self.getSearch());
		})
	};

	/**
	 * Get the search entered by user
	 */
	TagsFilter.prototype.getSearch = function() {
		return this.$inputSearch.val().replace('.', '__').toLowerCase();
	};

	/**
	 * Show related posts and hide others
	 *
	 * @param tag
	 */
	TagsFilter.prototype.filter = function(tag) {
		if (tag == '') {
			this.showAll();
			this.showResult(-1);
		}
		else {
			this.hideAll();
			this.showPosts(tag);
			this.showResult(this.countPosts(tag));
		}
	};

	/**
	 * Display results
	 * @param number
	 * @returns {Number}
	 */
	TagsFilter.prototype.showResult = function(number) {
		if (number == 0) {
			this.$archiveResult.html('No tags found').show();
		}
		else if (number == -1) {
			this.$archiveResult.html('').hide();
		}
		else {
			this.$archiveResult.html(number + ' tag' + ((number > 1) ? 's' : '') + ' found').show();
		}
	};

	/**
	 * Count number of posts
	 * @param tag
	 * @returns {Number}
	 */
	TagsFilter.prototype.countPosts = function(tag) {
		return $(this.posts + '[data-tag*=' + tag + ']').length;
	};

	/**
	 * Show all posts from a tag
	 * @param tag
	 */
	TagsFilter.prototype.showPosts = function(tag) {
		$(this.tags + '[data-tag*=' + tag + ']').show();
		$(this.posts + '[data-tag*=' + tag + ']').show();
	};

	/**
	 * Show all tags and related posts
	 */
	TagsFilter.prototype.showAll = function() {
		this.$tags.show();
		this.$posts.show();
	};

	/**
	 * Hide all tags and related posts
	 */
	TagsFilter.prototype.hideAll = function() {
		this.$tags.hide();
		this.$posts.hide();
	};

	$(document).ready(function() {
		var tagsFilter;
		if ($('#tags-archives').length) {
			tagsFilter = new TagsFilter('#tags-archives');
			tagsFilter.init();
		}
	})
}(jQuery);