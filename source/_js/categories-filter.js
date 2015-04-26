+function($) {
    'use strict';

    // Filter posts by using their categories on categories page : `/categories`

    /**
     * CategoriesFilter
     * @param categoriesArchivesElem
     * @constructor
     */
    var CategoriesFilter = function(categoriesArchivesElem) {
        this.$form        = $(categoriesArchivesElem).find('#filter-form');
        this.$inputSearch = $(categoriesArchivesElem).find('input[name=category]');
        // Element where result of the filter are displayed
        this.$archiveResult = $(categoriesArchivesElem).find('.archive-result');
        this.$categories    = $(categoriesArchivesElem).find('.category');
        this.$posts         = $(categoriesArchivesElem).find('.archive');
        this.categories     = categoriesArchivesElem + ' .category';
        this.posts          = categoriesArchivesElem + ' .archive';
        // Html data attribute without `data-` of `.archive` element which contains the name of category
        this.dataCategory = 'category';
        // Html ata attribute without `data-` of `.archive` element which contains the name of parent's categories
        this.dataParentCategories = 'parent-categories';
    };

    CategoriesFilter.prototype = {

        /**
         * Run CategoriesFilter feature
         */
        run: function() {
            var self = this;

            self.$inputSearch.keyup(function() {
                self.filter(self.getSearch());
            });

            // Block submit action
            self.$form.submit(function(e) {
                e.preventDefault();
            });
        },

        /**
         * Get the search entered by user
         * @returns {string} The name of the category
         */
        getSearch: function() {
            return this.$inputSearch.val().replace('.', '__').toLowerCase();
        },

        /**
         * Show related posts form a category and hide the others
         * @param {string} category - The name of the category
         */
        filter: function(category) {
            if (category == '') {
                this.showAll();
                this.showResult(-1);
            }
            else {
                this.hideAll();
                this.showPosts(category);
                this.showResult(this.countCategories(category));
            }
        },

        /**
         * Display results of the search
         * @param {Number} numbCategories - The number of categories found
         */
        showResult: function(numbCategories) {
            if (numbCategories == 0) {
                this.$archiveResult
                    .html('No categories found')
                    .show();
            }
            else if (numbCategories == -1) {
                this.$archiveResult
                    .html('')
                    .hide();
            }
            else {
                this.$archiveResult
                    .html(numbCategories + ' categor' + ((numbCategories > 1) ? 'ies' : 'y') + ' found')
                    .show();
            }
        },

        /**
         * Count number of categories
         * @param {string} category - The name of theThe date of the post category
         * @returns {Number} The number of categories found
         */
        countCategories: function(category) {
            return $(this.posts + '[data-' + this.dataCategory + '*=' + category + ']').length;
        },

        /**
         * Show all posts from a category
         * @param {string} category - The name of the category
         */
        showPosts: function(category) {
            var self = this;
            var parents;

            if (self.countCategories(category) > 0) {
                // Check if selected categories have parents
                if ($(self.posts + '[data-' + this.dataCategory + '*=' + category + '][data-' + self.dataParentCategories + ']').length) {
                    parents = $(self.posts + '[data-' + self.dataCategory + '*=' + category + ']').attr('data-' + self.dataParentCategories).split(',');

                    // Show only the title of the parents's categories and hide their posts
                    parents.forEach(function(parent) {
                        $(self.posts + '[data-' + self.dataCategory + '=' + parent + ']').show();
                        $(self.posts + '[data-' + self.dataCategory + '=' + parent + '] > .archive-posts > .archive-post').hide();
                    });
                }
            }
            // Show categories and related posts found
            $(self.categories + '[data-' + self.dataCategory + '*=' + category + ']').show();
            $(self.posts + '[data-' + self.dataCategory + '*=' + category + ']').show();
            $(self.posts + '[data-' + self.dataCategory + '*=' + category + '] > .archive-posts > .archive-post').show();
        },

        /**
         * Show all categories and all posts
         */
        showAll: function() {
            this.$categories.show();
            this.$posts.show();
            $(this.posts + ' > .archive-posts > .archive-post').show();
        },

        /**
         * Hide all categories and all posts
         */
        hideAll: function() {
            this.$categories.hide();
            this.$posts.hide();
        }
    };
    $(document).ready(function() {
        if ($('#categories-archives').length) {
            var categoriesFilter = new CategoriesFilter('#categories-archives');
            categoriesFilter.run();
        }
    });
}(jQuery);