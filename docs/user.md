# User documentation #

A gorgeous responsive theme for Hexo blog framework 

![Tranquilpeak](http://res.cloudinary.com/tranquilpeak-hexo-theme/image/upload/v1439030688/v1.3.0-showcase.png)

Tranquilpeak theme is compatible with Hexo v3.0.x. The theme is compatible with higher versions of Hexo but these versions have some bugs with generation of relative urls so I recommend to use Hexo 3.0.x for the moment.

This documentation will help you to install tranquilpeak-hexo-theme and configure it to use all features which it provides.  

If you want to report a bug or ask a question, [create an issue](https://github.com/LouisBarranqueiro/tranquilpeak-hexo-theme/issues/new).

## Summary ##

- [General](#general)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Hexo configuration](#hexo-configuration)
    * [Enable post assets folder](#enable-post-assets-folder)
    * [Disable relative links](#disable-relative-links)
    * [Enable RSS feed](#enable-rss-feed)
- [Tranquilpeak configuration](#tranquilpeak-configuration)
    - [Languages configuration](#languages-configuration)
    - [Theme configuration](#theme-configuration)
        * [Sidebar](#sidebar)
        * [Header](#header)
        * [Author](#author)
        * [Customization](#customization)
        * [Integrated services](#integrated-services)
        * [Enable pages](#enable-pages)
            * [Enable all-categories page](#enable-all-categories-page)
            * [Enable all-tags page](#enable-all-tags-page)
            * [Enable all-archives page](#enable-all-archives-page)
- [Integrated services configuration](#integrated-services-configuration)
    * [Google Analytics](#google-analytics)
        * [Exclude hostname (localhost) while writing articles](#exclude-hostname-\(localhost\)-while-wirting-articles)
- [Writing posts](#writing-posts)
    * [Front-matter settings](#front-matter-settings)
    * [Display table of contents](#display-table-of-contents)
    * [Tags](#tags)
        * [Image](#image)
        * [Wide image](#wide-image)
        * [Fancybox](#fancybox)
- [Running](#running)  

## General ##

- **Author** : Louis Barranqueiro
- **Version** : 1.3.0  
- **Compatibility** : Hexo 3.0.0 or later

## Features ##

**General features :**  
- Fully responsive  
- Optimized for tablets & mobiles  
- Configurable menu of the sidebar  
- Pages to filter tags, categories and archives  
- Background cover image  
- Beautiful about page  
- Support Open Graph protocol  
- Support internationalization (i18n)
  
  
**Posts features :**  
- Thumbnail image  
- Cover image  
- Responsive videos & images  
- Sharing options  
- Navigation menu  
- GitHub theme for code highlighting  
- Image gallery  
- Image generator helpers
- Table of contents  
  
  
**Integrated services :**  
- Disqus  
- Google analytics  
- Gravatar  
- Swiftype  
- Facebook Insights  

## Requirements ##

1. **Node** : v0.10.35 or higher. Download [Node](https://nodejs.org/download/)
2. **Hexo CLI** : v0.1.4 or higher. Run `npm install hexo-cli -g`

## Installation ##

1. Download the latest version built and ready for production here : [tranquilpeak-hexo-theme-built-for-production-1.3.0]
(https://github.com/LouisBarranqueiro/tranquilpeak-hexo-theme/releases/download/v1.3.0/tranquilpeak-hexo-theme-built-for-production-1.3.0.zip) or choose an other version here : [all releases](https://github.com/LouisBarranqueiro/tranquilpeak-hexo-theme/releases)
2. Rename the folder in `tranquilpeak` and place it in `themes` folder of your Hexo blog

## Hexo configuration ##

Modify the theme in `_config.yml` by changing `theme` variable  to `tranquilpeak`
  
If it's your first time using Hexo, please check [Hexo official documentation](https://hexo.io/docs/)

### Enable post assets folder ###

If you want to take advantage of cover image, thumbnail image, and image gallery features, you have to enable post assets folder by setting `post_asset_folder` to  `true`in `_config.yml`.

### Disable relative links ###

You have to set `relative_link` to `false` otherwise if you enter your blog url without the end `/`, like this `http://yourdomain.com/blog`, all assets will not be loaded.
There is currently an issue on Hexo repository to fix this problem.

### Enable RSS feed ###

1. Execute `npm install hexo-generator-feed --save` in your Hexo blog folder  
2. Add this lines in `_config.yml` :  

``` yaml
feed:
    type: atom
    path: atom.xml
    limit: 20
```
- **type** : Feed type
- **path** : Feed path (Default: atom.xml/rss2.xml)
- **limit** : Maximum number of posts in the feed (Use `0` or `false` to show all posts)

If you want more informations on this plugin : [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)

## Tranquilpeak configuration ##

### Language configuration ###

If you are new to Hexo and internationalization (i18n), please read [Hexo documentation - internationalization (i18n) section](https://hexo.io/docs/internationalization.html)

Currently, the theme is delivered with english (en) and portuguese (pt-br) language file. 
If your language is not available, follow this guidelines (E.g : add chinese language (zh-cn) :  
1. Set `language` to `zh-cn` in Hexo configuration file `_config.yml`  
2. Create `zh-cn` file in `theme/tranquilpeak/languages/` folder  
3. Copy the content of `theme/tranquilpeak/languages/en.yml` and paste it to `zh-cn.yml` file  
4. Replace all strings in english by their translation in chinese  
5. Complete your description and your job in chinese and that's it!  

Otherwise, complete your description and your job in the right language file(s) in `theme/tranquilpeak/languages`.

**Tranquilpeak theme is currently not ready to support multi-languages. It will be the next release.**

### Theme configuration ###

Complete `theme/tranquilpeak/_config.yml` with your information. Read above sections to have more information.


#### Sidebar ####

The sidebar is powerful and easily configurable.
DON'T modify variables name `sidebar`, `title`, `url` and `icon`.  
Others variables name which refer to the name of a menu or a link can be edited. Example : `menu`, `home`, `categories`, etc...  
You can add groups of links and links much as you want  
You just have to respect the indentation : `groups of links` -> `link` -> `title`, `link`, `icon` 

``` yaml
sidebar:
    menu:
        home:
            title: Home
            url: /
            icon: home
        categories:
            title: Categories
            url: /all-categories
            icon: bookmark
        tags:
            title: Tags
            url: /all-tags
            icon: tags
        archives:
            title: Archives
            url: /all-archives
            icon: archive
        search:
            title: Search
            url: /#search
            icon: search
            # `st-search-show-outputs` classes are used to open swiftype search window
            class: t-search-show-outputs
        about:
            title: About me
            url: /#about
            icon: question
    author_links:
        # github:
        #     title: GitHub
        #     url: https://github.com/
        #     icon: github
        # stack_overflow:
        #     title: Stack Overflow
        #     url: http://stackoverflow.com/users/
        #     icon: stack-overflow
        # twitter:
        #     title: Twitter
        #     url: https://twitter.com/
        #     icon: twitter
        # facebook:
        #     title: Facebook
        #     url: https://www.facebook.com/
        #     icon: facebook
        # google_plus:
        #     title: Google +
        #     url: https://plus.google.com/
        #     icon: google-plus
        # linked_in:
        #     title: Linked In
        #     url: https://www.linkedin.com/profile/
        #     icon: linkedin
        # mail:
        #     title: Mail
        #     url: mailto:
        #     icon: envelope-o
    rss:
        rss:
            title: RSS
            url: /atom.xml
            icon: rss
```

- **title** : Title of the link
- **url** : URL of the link. If the URL is internal, domain name is not necessary
- **icon** : Name of the font awesome icon class without the `fa-` (Go to [font-awesome icons](http://fontawesome.io/icons/) to find class name of icon)
- **class** (optional) : CSS Class added to the `a` link tag


#### Header ####

The right link of the header is customizable. You can add a link (as an icon) at the right of the header instead of the author's gravatar image or author's picture. DON'T edit `header`, `right_link`, `url`, `icon` and `class` variable name

``` yaml
header:
    right_link:
        url: /#search
        icon: search
        class: st-search-show-outputs
```

- **url** : URL of the link. If the URL is internal, domain name is not necessary
- **icon** : Name of the font awesome icon class without the `fa-` (Go to [font-awesome icons](http://fontawesome.io/icons/) to find class name of icon)
- **class** : CSS Class added to the link

#### Author ####

``` yaml
# Author
author:
    email:
    bio:
    job:
    location:
    picture:
    twitter:
    google_plus:
```

- **email** : Your mail address. This address will be used to get your gravatar image if you activate gravatar option
- **bio** : A short biography. Display on your about card (Markdown and HTML supported)
- **job** : Your job (Markdown and HTML supported)
- **location** : Your location
- **picture** : Your profile picture. Overwritten by your gravatar image if gravatar option is enabled
- **twitter** : Your Twitter username without the @. E.g : `tranquilpeak`
- **google_plus** : Your google plus profile id. E.g : `+TranquilPeak` or `123812884128439`

#### Customization ####

``` yaml
# Customization
sidebar_behavior: 1
toc_title: Table of contents
thumbnail_image: true
read_more_message: Continue reading
go_to_message: Go to the website 
cover_image: http://res.cloudinary.com/tranquilpeak-hexo-theme/image/upload/v1438532677/v1.3.0-cover.jpg
favicon:
image_gallery: true
archive_pagination: true
category_pagination: true
tag_pagination: true
```

- **sidebar_behavior** : Define the behavior of the header and sidebar :
   * 1: Display large sidebar on large screen, medium sidebar on medium screen and header bar on small screen and large sidebar is swiped when open button is clicked (default)
   * 2: Display medium sidebar on large and medium screen and header bar on small screen and medium sidebar is swiped when open button is clicked
   * 3: Display header bar on all screens and large sidebar is swiped when open button is clicked  
   * 4: Display header bar on all screens and medium sidebar is swiped when open button is clicked)
- **clear_reading** : Hide sidebar on all article page to let article take full width to improve reading, and enjoy wide images and cover images. Useless if `sidebar_behavior` is equal to `3` or `4`. (true: enable, false: disable). Default behavior : `theme.clear_reading` value in theme configuration file.
- **toc_title** : Head title displayed at the top of the table of contents.
- **thumbnail_image** : Display thumbnail image of each post on index pages 
- **read_more_message** : Message displayed after the `<!-- more -->` comment or after 300 characters in post
- **go_to_message** : Message displayed after the `<!-- more -->` comment or after 300 characters for post with link layout
- **cover_image** : Your blog cover picture. **I STRONGLY recommend you to use a CDN to speed up loading of pages. There is many free CDN like Cloudinary or you can also use indirectly by using services like Google Photos.**
Default image is on Cloudinary. Otherwise put your image in folder `source/assets/images/` and use relative url : `/assets/images/your-image.png` **Change the default cover image to have an unique blog**
- **favicon** : Your favicon located in folder `source/assets/images/`
- **image_gallery** : Display an image gallery at the end of a post which have `photos` variables. (false: disabled, true: enabled)
- **archive_pagination** : Displaying style of archive pages. (false: pagination disabled, true: pagination enabled)
- **category_pagination** :  Displaying style of category pages. (false: pagination disabled, true: pagination enabled)
- **tag_pagination** :  Displaying style of tag pages. (false: pagination disabled, true: pagination enabled)

Example :  
A category page look like this with `category_pagination: true` :  
![archives false](http://res.cloudinary.com/tranquilpeak-hexo-theme/image/upload/w_300/v1439031170/v1.3.0-ud-archives-true.png)  

The same page with `category_pagination: false`:  
![archives false](http://res.cloudinary.com/tranquilpeak-hexo-theme/image/upload/w_300/v1439031170/v1.3.0-ud-archives-false.png)  


#### Integrated services ####

``` yaml
# Integrated services
disqus_shortname:
gravatar_email: 
google_analytics_id:  
swiftype_install_key:
fb_admin_ids:
fb_app_id:
```
- **disqus_shortname**: Your Disqus shortname. The theme use its own value for disqus shortname to reduce dependency with Hexo in case of this variable is deleted in a new Hexo version.  
- **gravatar_email**: Your gravatar email. Overwrite `author.picture` everywhere in the blog  
- **google_analytics_id** : Your Google analystics web property ID : UA-XXXXX-X  
- **swiftype_install_key** : Your Swiftype install key founded in `Engines > YOUR_ENGINE_NAME > Integrate > Install Search > Install code` menu of your account. Search a line similarly to this one : `_st('install','fsdkiG43fkfder32dgsR','2.0.0');`. Swiftype install key is : `fsdkiG43fkfder32dgsR`.  
- **fb_admin_ids** : Your Facebook user ids used to connect your blog with your facebook user accounts (Facebook Insights). Separate ids with comma. E.g : `9830047,1003342`. Visit [Facebook docs](https://developers.facebook.com/docs/platforminsights/domains) for more information.  
- **fb_app_id** : Your Facebook app id used to connect your blog with your facebook app account (Facebook Insights). E.g : `9841307`. Visit [Facebook docs](https://developers.facebook.com/docs/platforminsights/domains) for more information.  

### Enable pages ###

Tranquilpeak provides you 3 pages to display all posts title and date by tags, by categories, by date and an about page. To enable one of this pages, 
read following step.

#### Enable all-categories page ####

To enable `all-categories` page :  
1. Run `hexo new page "all-categories"`. A new folder named `all-categories` will be created in `source/`  
2. Replace `source/all-categories/index.md` content with :
 
``` markdown
title: "all-categories"
layout: "all-categories"
---
```

New page will be reach at : `/all-categories`. On this page, users will be able to search and filter categories.

#### Enable all-tags page ####

To enable `all-tags` page :  
1. Run `hexo new page "all-tags"`. A new folder named `all-tags` will be created in `source/`  
2. Replace `source/all-tags/index.md` content with :
 
``` markdown
title: "all-tags"
layout: "all-tags"
---
```

New page will be reach at : `/all-tags`. On this page, users will be able to search and filter tags.

#### Enable all-archives page ####

To enable `all-archives` page :  
1. Run `hexo new page "all-archives"`. A new folder named `all-archives` will be created in `source/`  
2. Replace `source/all-archives/index.md` content with :
 
``` markdown
title: "all-archives"
layout: "all-archives"
---
```  

New page will be reach at : `/all-archives`.  
On this page, users will be able to search and filter posts.  
**Search pattern** : YYYY/MMM/DD

## Integrated services configuration ##

### Google Analytics ###

#### Exclude hostname (localhost) while writing articles ####

While you are writing articles, you need to check the result a lot of times before deploying your site.
If you have enable Google analytics service, Google will include all requests done, even when hostname is localhost and this can greatly skew the results.
To overcome this, you have to add a filter on Google Analytics website.
   
Follow these steps, to add new filter :   
1. Sign in to your Google Analytics account 
2. Select the **Admin** tab and navigate to the **property** in which you want to create the filter **(Account > Property > View)**  
3. In **View** column, click on **Filters** button  
4. Click on **+ NEW FILTER** button  
6. Enter a name for the filter  
7. Select **Custom filter**, **Filter Field** : `Hostname`, **Filter Pattern** :  `(.*?localhost.*?)`  
8. Click on **Save** button   

## Writing posts ##

To write articles, you have to user Markdown langague. [Here](https://guides.github.com/features/mastering-markdown/#examples) you can find the main basics of Markdown syntax.   
Please note, there are many different versions of Markdown and some of them are not supported by Hexo.  
To use tags plugins to highlight code or add Fancybox image, please read [Hexo docs](https://hexo.io/docs/tag-plugins.html)

 **I STRONGLY recommend you to use a CDN to speed up loading of pages. There is many free CDN like Cloudinary or you can also use indirectly by using services like Google Photos.**

### Front-matter settings ###

Tranquilpeak introduces 2 new variables to configure precisely the style of your post : `thumbnailImage` and `coverImage`.  
  
Example :  
``` markdown
thumbnailImage: image-1.png
metaAlignment: center
coverImage: image-2.png
coverCaption: "A beautiful sunrise"
coverMeta: out
coverImage: image-2.png
photos:
    - image-3.jpg "New York"
    - image-4.png "Paris"
    - http://i.imgur.com/o9r19kD.jpg "Dubai"
    - https://lh3.googleusercontent.com/1GLR8xt-w1024-h686-no "Sidney"
comments: false
```

- **clearReading** : Hide sidebar on all article page to let article take full width to improve reading, and enjoy wide images and cover images. Useless if `theme.sidebar_behavior` is equal to `3` or `4`. (true: enable, false: disable). Default behavior : `theme.clear_reading` value in theme configuration file.
- **metaAlignment** : Meta (title, date and categories) alignment (right, left or center). Default behavior : left
- **thumbnailImage** : Image displayed in index view.
- **coverImage** : Image displayed in full size at the top of your post in post view. If thumbnail image is not configured, cover image is also used as thumbnail image. Check the beautiful demo here : [Cover image demo](http://louisbarranqueiro.github.io/tranquilpeak-hexo-theme/2015/05/13/Cover-image-showcase/)
- **coverSize**: `partial`: cover image take a part of the screen height (60%), `full`: cover image take the entire screen height.
- **coverCaption** : Add a caption under the cover image : [Cover caption demo](http://louisbarranqueiro.github.io/tranquilpeak-hexo-theme/2015/05/13/Cover-image-showcase/)
- **coverMeta** : `in`: display post meta (title, date and categories) on cover image, `out`: display meta (title, date and categories) under cover image as usual. Default behavior : `in`
- **photos** : Images displayed in an image gallery (with fancybox) at the end of the post. If thumbnail image is not configured and cover image too, the first photo is used as thumbnail image. format: `url [caption]`, E.g : `https://lh3.googleusercontent.com/1GLR8xt-w1024-h686-no "New York"`
- **comments** : Disable the comment of the post.

The relative path of images entered is : `source/_posts/{YOUR_POST_TITLE}/`, you just have to enter the name of the image without domain name and path like written just above.  
Of course, you can set external url.

### Display table of contents ###

As post excerpt feature enable with `<!-- more -->` comment, you can display the table of contents of a post with  `<!-- toc -->`.  Place this comment where you want to display the table of content. You can also edit the title displayed at the top of the table of contents in the `_config.yml` file
 
### Tags ###

Tranquilpeak 1.3 introduce 2 new tag to display wide images in full width and create beautiful galleries.
**DON'T use anymore fancybox tag**. Please use `image` tag with `fancybox` class to generate them. More information here : [Image tag](#image) 

#### Image ###

Image tag is useful to add images and create beautiful galleries. Check what are the possibilities here : [Image tag demo](http://louisbarranqueiro.github.io/tranquilpeak-hexo-theme/2014/10/29/Tags-plugins-showcase/#Images)

Syntax : `{% image [classes] /path/to/image [/path/to/thumbnail] [width of thumbnail] [height of thumbnail] [title text] %}`  
E.g : `{% image fancybox right clear image2.png http://google.fr/images/image125.png 150px 300px "A beautiful sunrise" %}`  

- **classes (optionnal)** : You can add css classes to stylize the image. Separate class with whitespace. Tranquilpeak integrate many css class to create nice effects :
        - **fancybox** : Generate a fancybox image.  
        - **nocaption** : Caption of the image will not be displayed.  
        - **left** : Image will float at the left.  
        - **right** : Image will float at the right.  
        - **center** : Image will be at center.  
        - **fig-20** : Image will take 20% of the width of post width and automatically float at left.  
        - **fig-25** : Image will take 25% of the width of post width and automatically float at left.  
        - **fig-33** : Image will take 33% of the width of post width and automatically float at left.  
        - **fig-50** : Image will take 50% of the width of post width and automatically float at left.  
        - **fig-75** : Image will take 75% of the width of post width and automatically float at left.  
        - **fig-100** : Image will take 100% of the width of post width.  
        - **clear** : Add a div with `clear:both;` style attached after the image to retrieve the normal flow of the post.  
- **Orignal image** : Path to the original image.  
- **Thumbnail image (optionnal)** : Path to the thumbnail image. If empty, the orignal image will be displayed.  
- **Width of thumbnail image (optionnal)** : Width to the thumbnail image. If the thumbnail image is empty, width will be attached to thumbnail image created from original image. E.g : `150px` or `85%`.  
- **Height of thumbnail image (optionnal)** : Height to the thumbnail image. If the thumbnail image is empty, height will be attached to thumbnail image created from original image. E.g : `300px` or `20%`.  
- **Title (optionnal)** : Title of image displayed in a caption under image. `Alt` HTML attribute will use this title. E.g : `"A beautiful sunrise"`.  
  
#### Wide image ###

Wide image tag is useful to display wide images in full width. Check the the result : [Wide image tag demo](http://louisbarranqueiro.github.io/tranquilpeak-hexo-theme/2014/10/29/Tags-plugins-showcase/#Wide-images)

Syntax : `{% wide_image /path/to/image [title text] %}`  
E.g : `{% wide_image http://google.fr/images/image125.png "A beautiful sunrise" %}`  

- **image** : Path to the original image.  
- **Title (optionnal)** : Title of image displayed in a caption under image. `Alt` HTML attribute will use this title. E.g : `"A beautiful sunrise"`.  

### Fancybox ###

`fancybox` tag is deprecated since Tranquilpeak 1.3. Please use `image` tag with `fancybox` class to generate them. More information here : [Image tag](#image) 
        
## Running ##

Run `hexo server` and start writing! :)
