+function($) {
    'use strict';

    // Fade out the blog and let drop the about card of the author and vice versa

    /**
     * AboutCard
     * @constructor
     */
    var AboutCard = function() {
        this.$openBtn   = $("#sidebar, #header").find("a[href*='#about']");
        this.$closeBtn  = $('#about-btn-close');
        this.$blog      = $('#blog');
        this.$about     = $('#about');
        this.$aboutCard = $('#about-card');
    };

    AboutCard.prototype = {

        /**
         * Run AboutCard feature
         */
        run: function() {
            var self = this;
            // Detect click on open button
            self.$openBtn.click(function(e) {
                e.preventDefault();
                self.play();
            });
            // Detect click on close button
            self.$closeBtn.click(function(e) {
                e.preventDefault();
                self.playBack();
            });
        },

        /**
         * Play the animation
         */
        play: function() {
            var self = this;
            // Fade out the blog
            self.$blog.fadeOut();
            // Fade in the about card
            self.$about.fadeIn();
            // Small timeout to drop the about card after that
            // the about card fade in and the blog fade out
            setTimeout(function() {
                self.dropAboutCard();
            }, 300);
        },

        /**
         * Play back the animation
         */
        playBack: function() {
            var self = this;

            // Lift the about card
            self.liftAboutCard();
            // Fade in the blog after that the about card lifted up
            setTimeout(function() {
                self.$blog.fadeIn();
            }, 500);
            // Fade out the about card after that the about card lifted up
            setTimeout(function() {
                self.$about.fadeOut();
            }, 500);
        },

        /**
         * Slide the card to the middle
         */
        dropAboutCard: function() {
            var self            = this;
            var aboutCardHeight = self.$aboutCard.innerHeight();

            self.$aboutCard
                .css('top', '0px')
                .css('top', '-' + aboutCardHeight + 'px')
                .show(500, function() {
                    self.$aboutCard.animate({
                        top: '+=' + (($(window).height() / 2) - (aboutCardHeight / 2) + aboutCardHeight) + 'px'
                    });
                });
        },

        /**
         * Slide the card to the top
         */
        liftAboutCard: function() {
            var self            = this;
            var aboutCardHeight = self.$aboutCard.innerHeight();

            self.$aboutCard.animate({
                top: '-=' + (($(window).height() / 2) - (aboutCardHeight / 2) + aboutCardHeight) + 'px'
            }, 500, function() {
                self.$aboutCard.hide();
            });
        }
    };

    $(document).ready(function() {
        var aboutCard = new AboutCard();
        aboutCard.run();
    });
}(jQuery);;+function($) {
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
}(jQuery);;+function($) {
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
}(jQuery);;+function($) {

    // Run fancybox feature

    $(document).ready(function() {
        $(".fancybox").fancybox({
            maxWidth:    900,
            maxHeight:   800,
            fitToView:   true,
            width:       '50%',
            height:      '50%',
            autoSize:    true,
            closeClick:  false,
            openEffect:  'elastic',
            closeEffect: 'elastic',
            prevEffect:  'none',
            nextEffect:  'none',
            padding:     '0',
            helpers:     {
                thumbs:  {
                    width:  70,
                    height: 70
                },
                overlay: {
                    css: {
                        'background': 'rgba(0, 0, 0, 0.85)'
                    }
                }
            }
        });
    });
}(jQuery);;+function($) {
    'use strict';

    // Hide the header when the user scrolls down, and show it when he scrolls up

    /**
     * Header
     * @constructor
     */
    var Header = function() {
        this.$header      = $('#header');
        this.headerHeight = this.$header.height();
        // CSS class located in `source/_css/layout/_header.scss`
        this.headerUpCSSClass = 'header-up';
        this.delta            = 5;
        this.lastScrollTop    = 0;
        this.scrollTop;
    };

    Header.prototype = {

        /**
         * Run Header feature
         */
        run: function() {
            var self = this;
            var didScroll;

            // Detect if the user is scrolling
            $(window).scroll(function() {
                self.didScroll = true;
            });

            // Check if the user scrolled every 250 milliseconds
            setInterval(function() {
                if (self.didScroll) {
                    self.animate();
                    self.didScroll = false;
                }
            }, 250);
        },

        /**
         * Animate the header
         */
        animate: function() {
            this.scrollTop = $(window).scrollTop();

            // Check if the user scrolled more than `delta`
            if (Math.abs(this.lastScrollTop - this.scrollTop) <= this.delta) {
                return;
            }

            // Checks if the user has scrolled enough down and has past the navbar
            if ((this.scrollTop > this.lastScrollTop) && (this.scrollTop > this.headerHeight)) {
                this.$header.addClass(this.headerUpCSSClass);
            }
            else {
                // Check if the user has scrolled to the top of the page
                if (this.scrollTop + $(window).height() < $(document).height()) {
                    this.$header.removeClass(this.headerUpCSSClass);
                }
            }

            this.lastScrollTop = this.scrollTop;
        }
    };

    $(document).ready(function() {
        var header = new Header();
        header.run();
    });

      //img loading animation
    $(document).ready(function(){  
         //图片默认隐藏  
         $('.postShorten-thumbnailimg img').hide();  
         //使用fadeIn特效  
         $("img").fadeIn("slow"); 
    }); 

}(jQuery);;+function($) {
    'use strict'

    // Resize all images of an image-gallery

    /**
     * ImageGallery
     * @constructor
     */
    var ImageGallery       = function() {
        // CSS class located in `source/_css/components/_image-gallery.scss`
        this.photosBox = '.photo-box';
        this.$images   = $(this.photosBox + ' img');
    };
    ImageGallery.prototype = {

        /**
         * Run ImageGallery feature
         */
        run: function() {
            var self = this;

            // Resize all images at the loading of the page
            self.resizeImages();

            // Resize all images when the user is resizing the page
            $(window).smartresize(function() {
                self.resizeImages();
            });
        },

        /**
         * Resize all images of an image gallery
         */
        resizeImages: function() {
            var photoBoxWidth;
            var photoBoxHeight;
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
                    imageRatio = (imageWidth / imageHeight);
                    // Resize image with the box height
                    $image.css({
                        'height': photoBoxHeight,
                        'width':  (photoBoxHeight * imageRatio)
                    });
                    // Center image in his box
                    $image.parent().css({
                        'left': '-' + (((photoBoxHeight * imageRatio) / 2) - (photoBoxWidth / 2)) + 'px'
                    });
                }

                // Update new values of height and width
                imageWidth  = $image.width();
                imageHeight = $image.height();

                // Checks if image width is smaller than his box
                if (imageWidth < photoBoxWidth) {
                    imageRatio = (imageHeight / photoBoxWidth);

                    $image.css({
                        'width':  photoBoxWidth,
                        'height': (photoBoxWidth * imageRatio)
                    });
                    // Center image in his box
                    $image.parent().css({
                        'top': '-' + (((imageHeight) / 2) - (photoBoxHeight / 2)) + 'px'
                    });
                }

                // Checks if image height is larger than his box
                if (imageHeight > photoBoxHeight) {
                    // Center image in his box
                    $image.parent().css({
                        'top': '-' + (((imageHeight) / 2) - (photoBoxHeight / 2)) + 'px'
                    });
                }
            });
        }
    };

    $(document).ready(function() {
        if ($('.image-gallery').length) {
            var imageGallery = new ImageGallery();

            // Small timeout to wait the loading of all images.
            setTimeout(function() {
                imageGallery.run();
            }, 500);
        }
    });
}(jQuery);;+function($) {
    'use strict'

    // Hide the post bottom bar when the post footer is visible by the user,
    // and show it when the post footer isn't visible by the user

    /**
     * PostBottomBar
     * @constructor
     */
    var PostBottomBar = function() {
        this.$postBottomBar = $('.post-bottom-bar');
        this.$postFooter    = $('.post-footer');
    }

    PostBottomBar.prototype = {

        /**
         * Run PostBottomBar feature
         */
        run: function() {
            var self = this;
            var didScroll;

            // Run animation for first time
            self.swipePostBottomBar();

            // Detects if the user is scrolling
            $(window).scroll(function() {
                self.didScroll = true;
            });

            // Check if the user scrolled every 250 milliseconds
            setInterval(function() {
                if (self.didScroll) {
                    self.swipePostBottomBar();
                    self.didScroll = false;
                }
            }, 250);
        },

        /**
         * Animate the post bottom bar
         */
        swipePostBottomBar: function() {
            var postFooterElemPos = (this.$postFooter.offset().top + this.$postBottomBar.height());

            // Check if the post footer element is visible by the user
            if (($(window).scrollTop() + $(window).height()) > (postFooterElemPos)) {
                this.$postBottomBar.slideUp();
            }
            else {
                this.$postBottomBar.slideDown();
            }
        }
    };

    $(document).ready(function() {
        if ($('.post-bottom-bar').length) {
            var postBottomBar = new PostBottomBar();
            postBottomBar.run();
        }
    });
}(jQuery);;+function($) {
    'use strict';

    // Open and close the share options bar

    /**
     * ShareOptionsBar
     * @constructor
     */
    var ShareOptionsBar = function() {
        this.$shareOptionsBar = $('#share-options-bar');
        this.$openBtn      = $('.btn-open-shareoptions');
        this.$closeBtn     = $('#share-options-mask');
    };

    ShareOptionsBar.prototype = {

        /**
         * Run ShareOptionsBar feature
         */
        run: function() {
            var self = this;

            // Detect the click on the open button
            self.$openBtn.click(function() {
                if (!self.$shareOptionsBar.hasClass('opened')) {
                    self.openShareOptions();
                    self.$closeBtn.show();

                }
            });

            // Detect the click on the close button
            self.$closeBtn.click(function() {
                if (self.$shareOptionsBar.hasClass('opened')) {
                    self.closeShareOptions();
                    self.$closeBtn.hide();
                }
            });
        },

        /**
         * Open share options bar
         */
        openShareOptions: function() {
            var self = this;

            // Check if the share option bar isn't opened and prevent multiple click on the open button with `.processing` class
            if (!self.$shareOptionsBar.hasClass('opened') && !this.$shareOptionsBar.hasClass('processing')) {
                // Open the share option bar
                self.$shareOptionsBar.addClass('processing opened');

                setTimeout(function() {
                    self.$shareOptionsBar.removeClass('processing');
                }, 250);
            }
        },

        /**
         * Close share options bar
         */
        closeShareOptions: function() {
            var self = this;

            // Check if the share options bar is opened and prevent multiple click on the close button with `.processing` class
            if (self.$shareOptionsBar.hasClass('opened') && !this.$shareOptionsBar.hasClass('processing')) {
                // Close the share option bar
                self.$shareOptionsBar
                    .addClass('processing')
                    .removeClass('opened');

                setTimeout(function() {
                    self.$shareOptionsBar.removeClass('processing');
                }, 250);
            }
        }
    };

    $(document).ready(function() {
        var shareOptionsBar = new ShareOptionsBar();
        shareOptionsBar.run();
    });
}(jQuery);;+function($) {
    'use strict';

    // Open and close the sidebar by swiping the sidebar and the blog and vice versa

    /**
     * Sidebar
     * @constructor
     */
    var Sidebar = function() {
        this.$sidebar = $('#sidebar');
        this.$openBtn = $('#btn-open-sidebar');
        // Elements where the user can click to close the sidebar
        this.$closeBtn = $('#header, #main, .post-header-cover');
        // Elements affected by the swipe of the sidebar
        // The `pushed` class is added to each elements
        // Each element has a different behavior when the sidebar is opened
        this.$blog = $('body, .post-bottom-bar, #header, #main, .post-header-cover');
        // If you change value of `mediumScreenWidth`,
        // you have to change value of `$screen-min: (md-min)` too in `source/_css/utils/variables.scss`
        this.mediumScreenWidth = 768;
    };

    Sidebar.prototype = {

        /**
         * Run Sidebar feature
         */
        run: function() {
            var self = this;

            // Detect the click on the open button
            self.$openBtn.click(function() {
                if (!self.$sidebar.hasClass('pushed')) {
                    self.openSidebar();
                }
            });

            // Detect the click on close button
            self.$closeBtn.click(function() {
                if (self.$sidebar.hasClass('pushed')) {
                    self.closeSidebar();
                }
            });

            // Detect resize of the windows
            $(window).resize(function() {
                // Check if the window is larger than the minimal medium screen value
                if ($(window).width() > self.mediumScreenWidth) {
                    self.resetSidebarPosition();
                    self.resetBlogPosition();
                }
                else {
                    self.closeSidebar();
                }
            });
        },

        /**
         * Open the sidebar by swiping to the right the sidebar and the blog
         */
        openSidebar: function() {
            this.swipeBlogToRight();
            this.swipeSidebarToRight();
        },

        /**
         * Close the sidebar by swiping to the left the sidebar and the blog
         */
        closeSidebar: function() {
            this.swipeSidebarToLeft();
            this.swipeBlogToLeft();
        },

        /**
         * Reset sidebar position
         */
        resetSidebarPosition: function() {
            this.$sidebar.removeClass('pushed');
        },

        /**
         * Reset blog position
         */
        resetBlogPosition: function() {
            this.$blog.removeClass('pushed');
        },

        /**
         * Swipe the sidebar to the right
         */
        swipeSidebarToRight: function() {
            var self = this;

            // Check if the sidebar isn't swiped and prevent multiple click on the open button with `.processing` class
            if (!self.$sidebar.hasClass('pushed') && !this.$sidebar.hasClass('processing')) {
                // Swipe the sidebar to the right
                self.$sidebar.addClass('processing pushed');

                setTimeout(function() {
                    self.$sidebar.removeClass('processing');
                }, 250);
            }
        },

        /**
         * Swipe the sidebar to the left
         */
        swipeSidebarToLeft: function() {
            var self = this;

            // Check if the sidebar is swiped and prevent multiple click on the close button with `.processing` class
            if (self.$sidebar.hasClass('pushed') && !this.$sidebar.hasClass('processing')) {
                // Swipe the sidebar to the left
                self.$sidebar
                    .addClass('processing')
                    .removeClass('pushed processing');
            }
        },

        /**
         * Swipe the blog to the right
         */
        swipeBlogToRight: function() {
            var self = this;

            // Check if the blog isn't swiped and prevent multiple click on the open button with `.processing` class
            if (!self.$blog.hasClass('pushed') && !this.$blog.hasClass('processing')) {
                // Swipe the blog to the right
                self.$blog.addClass('processing pushed');

                setTimeout(function() {
                    self.$blog.removeClass('processing');
                }, 250);
            }
        },

        /**
         * Swipe the blog to the left
         */
        swipeBlogToLeft: function() {
            var self = this;

            // Check if the blog is swiped and prevent multiple click on the close button with `.processing` class
            if (self.$blog.hasClass('pushed') && !this.$blog.hasClass('processing')) {
                // Swipe the blog to the left
                self.$blog
                    .addClass('processing')
                    .removeClass('pushed');

                setTimeout(function() {
                    self.$blog.removeClass('processing');
                }, 250);
            }
        }
    };

    $(document).ready(function() {
        var sidebar = new Sidebar();
        sidebar.run();
    });
    
    //open external link in sidebar
    $(document).ready(function() {
    $('a').each(function() {
      var a = new RegExp('/' + window.location.host + '/');
      if (!a.test(this.href)) {
      $(this).attr("target","_blank");
      }
   });
});
}(jQuery);;+(function($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;

            function delayed() {
                if (!execAsap) {
                    func.apply(obj, args);
                }

                timeout = null;
            };

            if (timeout) {
                clearTimeout(timeout);
            }
            else if (execAsap) {
                func.apply(obj, args);
            }

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    jQuery.fn[sr] = function(fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})(jQuery, 'smartresize');;+function($) {
    'use strict';

    // Filter posts by using their categories on categories page : `/categories`

    /**
     * TagsFilter
     * @param tagsArchivesElem
     * @constructor
     */
    var TagsFilter = function(tagsArchivesElem) {
        this.$form          = $(tagsArchivesElem).find('#filter-form');
        this.$inputSearch   = $(tagsArchivesElem + ' #filter-form input[name=tag]');
        this.$archiveResult = $(tagsArchivesElem).find('.archive-result');
        this.$tags          = $(tagsArchivesElem).find('.tag');
        this.$posts         = $(tagsArchivesElem).find('.archive');
        this.tags           = tagsArchivesElem + ' .tag';
        this.posts          = tagsArchivesElem + ' .archive';
        // Html data attribute without `data-` of `.archive` element which contains the name of tag
        this.dataTag = 'tag';
    };

    TagsFilter.prototype = {

        /**
         * Run TagsFilter feature
         */
        run: function() {
            var self = this;

            // Detect keystroke of the user
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
         * @returns {string} the name of tag entered by the user
         */
        getSearch: function() {
            return this.$inputSearch.val().replace('.', '__').toLowerCase();
        },

        /**
         * Show related posts form a tag and hide the others
         * @param {string} tag - name of a tag
         */
        filter: function(tag) {
            if (tag == '') {
                this.showAll();
                this.showResult(-1);
            }
            else {
                this.hideAll();
                this.showPosts(tag);
                this.showResult(this.countTags(tag));
            }
        },

        /**
         * Display results of the search
         * @param {Number} numbTags - Number of tags found
         */
        showResult: function(numbTags) {
            if (numbTags == 0) {
                this.$archiveResult
                    .html('No tags found')
                    .show();
            }
            else if (numbTags == -1) {
                this.$archiveResult
                    .html('')
                    .hide();
            }
            else {
                this.$archiveResult
                    .html(numbTags + ' tag' + ((numbTags > 1) ? 's' : '') + ' found')
                    .show();
            }
        },

        /**
         * Count number of tags
         * @param tag
         * @returns {Number}
         */
        countTags: function(tag) {
            return $(this.posts + '[data-' + this.dataTag + '*=' + tag + ']').length;
        },

        /**
         * Show all posts from a tag
         * @param {string} tag - name of a tag
         */
        showPosts: function(tag) {
            $(this.tags + '[data-' + this.dataTag + '*=' + tag + ']').show();
            $(this.posts + '[data-' + this.dataTag + '*=' + tag + ']').show();
        },

        /**
         * Show all tags and all posts
         */
        showAll: function() {
            this.$tags.show();
            this.$posts.show();
        },

        /**
         * Hide all tags and all posts
         */
        hideAll: function() {
            this.$tags.hide();
            this.$posts.hide();
        }
    };

    $(document).ready(function() {
        if ($('#tags-archives').length) {
            var tagsFilter = new TagsFilter('#tags-archives');
            tagsFilter.run();
        }
    });
}(jQuery);