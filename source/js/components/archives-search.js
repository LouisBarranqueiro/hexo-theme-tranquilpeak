+function ($) {
	'use strict';

	// Class definition
	var ArchivesSearch = function (inputSearchElem, postsYearElem, postsMonthElem, postsDayElem) {
		this.$inputSearch = $(inputSearchElem);
		this.postsYear    = postsYearElem;
		this.postsMonth   = postsMonthElem;
		this.postsDay     = postsDayElem;
		this.$postsYear   = $(postsYearElem);
		this.$postsMonth  = $(postsMonthElem);
		this.$postsDay    = $(postsDayElem);
	};

	/**
	 * Init ArchivesSearch
	 */
	ArchivesSearch.prototype.init = function() {
		var self = this;

		self.$inputSearch.keyup(function () {
			self.search();
		})
	}

	/**
	 * Search a date and display related posts
	 */
	ArchivesSearch.prototype.search = function() {
		var self   = this;
		var search = self.$inputSearch.val().replace(/\//g, '').toLowerCase();

		var searchedYear  = search.slice(0, 4);
		var searchedMonth = search.slice(4, 6);
		var searchedDay   = search.slice(6, 8);

		if (search == '') {
			self.$postsYear.show();
			self.$postsMonth.show();
			self.$postsDay.show();
		}
		else {
			self.$postsYear.hide();
			self.$postsMonth.hide();
			self.$postsDay.hide();
			$(self.postsYear + '[data-date*=' + searchedYear + ']').show();
			$(self.postsMonth + '[data-date*=' + searchedYear + searchedMonth + ']').show();
			$(self.postsDay + '[data-date*=' + searchedYear + searchedMonth + searchedDay + ']').show();
		}
	};

	$(document).ready(function() {
		var archivesSearch = new ArchivesSearch('form#archives-search > input#date','#posts-list .a-posts-year','#posts-list .a-posts-month','#posts-list .a-posts-day');
		archivesSearch.init();
	})

}(jQuery);