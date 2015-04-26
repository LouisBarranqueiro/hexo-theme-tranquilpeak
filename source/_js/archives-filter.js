+function($) {
    'use strict';

    // Filter posts by using their date on archives page : `/archives`

    /**
     * ArchivesFilter
     * @param archivesElem
     * @constructor
     */
    var ArchivesFilter = function(archivesElem) {
        this.$form          = $(archivesElem).find('#filter-form');
        this.$searchInput   = $(archivesElem).find('input[name=date]');
        this.$archiveResult = $(archivesElem).find('.archive-result');
        this.$postsYear     = $(archivesElem).find('.archive-year');
        this.$postsMonth    = $(archivesElem).find('.archive-month');
        this.$postsDay      = $(archivesElem).find('.archive-day');
        this.postsYear      = archivesElem + ' .archive-year';
        this.postsMonth     = archivesElem + ' .archive-month';
        this.postsDay       = archivesElem + ' .archive-day';
    };

    ArchivesFilter.prototype = {

        /**
         * Run ArchivesFilter feature
         */
        run: function() {
            var self = this;

            self.$searchInput.keyup(function() {
                self.filter(self.sliceDate(self.getSearch()));
            });

            // Block submit action
            self.$form.submit(function(e) {
                e.preventDefault();
            });
        },

        /**
         * Get Filter entered by user
         * @returns {string} The date entered by the user
         */
        getSearch: function() {
            return this.$searchInput.val().replace(/([\/|.|-])/g, '').toLowerCase();
        },

        /**
         * Slice the date by year, month and day
         * @param {string} date - The date of the post
         * @returns {*[]} The date of the post splitted in a list
         */
        sliceDate: function(date) {
            return [
                date.slice(0, 4),
                date.slice(4, 6),
                date.slice(6)
            ];
        },

        /**
         * Show related posts and hide others
         * @param {string} date - The date of the post
         */
        filter: function(date) {
            var numberPosts;

            // Check if the search is empty
            if (date[0] == '') {
                this.showAll();
                this.showResult(-1);
            }
            else {
                numberPosts = this.countPosts(date);

                this.hideAll();
                this.showResult(numberPosts);

                if (numberPosts > 0) {
                    this.showPosts(date);
                }
            }
        },

        /**
         * Display results
         * @param {number} numbPosts - The number of posts found
         */
        showResult: function(numbPosts) {
            if (numbPosts == 0) {
                this.$archiveResult.html('No posts found').show();
            }
            else if (numbPosts == -1) {
                this.$archiveResult.html('').hide();
            }
            else {
                this.$archiveResult.html(numbPosts + ' post' + ((numbPosts > 1) ? 's' : '') + ' found').show();
            }
        },

        /**
         * Count number of posts
         * @param {string} date - The date of the post
         * @returns {number} The number of posts found
         */
        countPosts: function(date) {
            return $(this.postsDay + '[data-date^=' + date[0] + date[1] + date[2] + ']').length;
        },

        /**
         * Show all posts from a date
         * @param {string} date - The date of the post
         */
        showPosts: function(date) {
            $(this.postsYear + '[data-date^=' + date[0] + ']').show();
            $(this.postsMonth + '[data-date^=' + date[0] + date[1] + ']').show();
            $(this.postsDay + '[data-date^=' + date[0] + date[1] + date[2] + ']').show();
        },

        /**
         * Show all posts
         */
        showAll: function() {
            this.$postsYear.show();
            this.$postsMonth.show();
            this.$postsDay.show();
        },

        /**
         * Hide all posts
         */
        hideAll: function() {
            this.$postsYear.hide();
            this.$postsMonth.hide();
            this.$postsDay.hide();
        }
    };

    $(document).ready(function() {
        if ($('#archives').length) {
            var archivesFilter = new ArchivesFilter('#archives');
            archivesFilter.run();
        }
    })
}(jQuery);