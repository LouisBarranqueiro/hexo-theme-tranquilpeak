# User documentation #

A gorgeous responsive theme for Hexo blog framework 

[![Tranquilpeak](http://d1u9biwaxjngwg.cloudfront.net/showcases/showcase-v1.11.0.jpg)](http://louisbarranqueiro.github.io/hexo-theme-tranquilpeak)

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
    * [Define global keywords](#define-global-keywords)
- [Tranquilpeak configuration](#tranquilpeak-configuration)
    - [Language configuration](#language-configuration)
    - [Theme configuration](#theme-configuration)
        * [Sidebar](#sidebar)
        * [Header](#header)
        * [Author](#author)
        * [Customization](#customization)
        * [Integrated services](#integrated-services)
        * [Sharing options](#sharing-options)
        * [Enable pages](#enable-pages)
- [Integrated services configuration](#integrated-services-configuration)
    * [Algolia](#algolia)
    * [Google Analytics](#google-analytics)
        * [Exclude hostname (localhost) while writing articles](#exclude-hostname-localhost-while-writing-articles)
- [Quick & easy modifications](#quick--easy-modifications)  
    * [Prerequisites](#prerequisites)
    * [Change global style](#change-global-style)
    * [Change code coloration (Highlight.js theme)](#change-code-coloration-highlightjs-theme)
    * [Customize 404 error page](#customize-404-error-page)
- [Migrating posts](#migrating-posts)
    * [v1.3.0 or lower to v1.4.0 or higher](#v130-or-lower-to-v140-or-higher)
- [Writing posts](#writing-posts)
    * [Front-matter settings](#front-matter-settings)
    * [Define post excerpt](#define-post-excerpt)
    * [Display all post content](#display-all-post-content)
    * [Display table of contents](#display-table-of-contents)
    * [Tags](#tags)
        * [Alert](#alert)
        * [Highlight text](#highlight-text)
        * [Image](#image)
        * [Tabbed code block](#tabbed-code-block)
        * [Wide image](#wide-image)
        * [Fancybox](#fancybox)
- [Running](#running)  

## General ##

- **Author** : Louis Barranqueiro
- **Version** : 1.11.0
- **Compatibility** : Node v4 or later, Hexo v3.0.0 or later

## Features ##

**General features :**  

- Fully responsive
- Optimized for tablets & mobiles
- Configurable menu of the sidebar
- Pages to filter tags, categories and archives
- Background cover image
- Beautiful about page
- Support Open Graph protocol
- Support internationalization (i18
- Easily customizable (fonts, colors, layout elements, code coloration, etc..
  
**Posts features :**  

- Thumbnail image
- Cover image
- Responsive videos & images
- Sharing options
- Navigation menu
- GitHub theme for code highlighting (customizable)
- Image gallery
- Tags for images (FancyBox), wide images, tabbed code blocks, highlighted text, alerts
- Table of contents  
  
**Integrated services :**  

- Disqus
- Duoshuo
- Google analytics
- Baidu analytics
- Gravatar
- Algolia
- Facebook Insights
- Gitment

## Requirements ##

1. **Node** : v4 or higher. Download [Node](https://nodejs.org/download/)
2. **Hexo CLI** : v0.1.4 or higher. Run `npm install hexo-cli -g`

## Installation ##

1. Download the latest version built and ready for production here : [hexo-theme-tranquilpeak-built-for-production-1.11.0](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak/releases/download/v1.11.0/hexo-theme-tranquilpeak-built-for-production-1.11.0.zip)
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

|Variable|Description|
|---|---|
|type|Feed type|
|path|Feed path (Default: atom.xml/rss2.xml)|
|limit|Maximum number of posts in the feed (Use `0` or `false` to show all posts)|

If you want more information on this plugin : [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)

### Define global keywords ###

You can define keywords for search engines. These keywords will be added on all pages.

``` yaml
keywords:
- hexo
- javascript
```

## Tranquilpeak configuration ##

### Language configuration ###

If you are new to Hexo and internationalization (i18n), please read [Hexo documentation - internationalization (i18n) section](https://hexo.io/docs/internationalization.html)

Currently, the theme is delivered with :

- Chinese (zh-CN)
- Chinese Traditional (zh-TW)
- English (en)
- French (fr-FR)
- Japanase (ja)
- Portuguese (pt-BR)
- Russian (ru)
- Spanish (es)

If your language is not available, follow this guidelines (E.g : add russian language (ru) :  

1. Set `language` to `ru` in Hexo configuration file `_config.yml`  
2. Create `ru.yml` file in `theme/tranquilpeak/languages/` folder  
3. Copy the content of `theme/tranquilpeak/languages/en.yml` and paste it to `ru.yml` file  
4. Replace all strings in english by their translation in russian  
5. Complete your description and your job in russian and that's it!  

Otherwise, complete your description and your job in the right language file(s) in `theme/tranquilpeak/languages`.

**Tranquilpeak theme is currently not ready to support multi-languages. It will be in a next release.**

### Theme configuration ###

Complete `theme/tranquilpeak/_config.yml` with your information. Read above sections to have more information.

#### Sidebar

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
            # `open-algolia-search` classes are used to open algolia search window
            class: open-algolia-search
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
|Variable|Description|
|---|---|
|title|Title of the link|
|url|URL of the link. If the URL is internal, domain name is not necessary|
|icon|Name of the font awesome icon class without the `fa-` (Go to [font-awesome icons](http://fontawesome.io/icons/) to find class name of icon)|
|class (optional)|CSS Class added to the `a` link tag|

#### Header

The right link of the header is customizable. You can add a link (as an icon) at the right of the header instead of the author's gravatar image or author's picture. By default, author's gravatar or author's picture is displayed if `icon` is empty DON'T edit `header`, `right_link`, `url`, `icon` and `class` variable name.  
E.g to display a shortcut to open algolia search window :
``` yaml
header:
    right_link:
        url: /#search
        icon: search
        class: open-algolia-search
```

|Variable|Description|
|---|---|
|url|URL of the link. If the URL is internal, domain name is not necessary|
|icon|Name of the font awesome icon class without the `fa-` (Go to [font-awesome icons](http://fontawesome.io/icons/) to find class name of icon)|
|class|CSS Class added to the link|

#### Author

``` yaml
# Author
author:
    email:
    location:
    picture:
    twitter:
    google_plus:
```
  
**Your biography and your job is editable in each languages files in `languages` folder**

|Variable|Description|
|---|---|
|email|Your mail address. This address will be used to get your gravatar image if you activate gravatar option|
|location|Your location|
|picture|Your profile picture. Overwritten by your gravatar image if gravatar email is filled|
|twitter|Your Twitter username without the @. E.g : `tranquilpeak`|
|google_plus|Your google plus profile id. E.g : `+TranquilPeak` or `123812884128439`|

#### Customization

``` yaml
# Customization
sidebar_behavior: 1
thumbnail_image: true
thumbnail_image_position: right
auto_thumbnail_image: true
cover_image: cover.jpg
favicon:
image_gallery: true
archive_pagination: true
category_pagination: true
tag_pagination: true
```

|Variable|Description|
|---|---|
|sidebar_behavior|Define the behavior of the header and sidebar :<ul><li>1: Display extra large sidebar on extra large screen, large sidebar on large screen, medium sidebar on medium screen and header bar on small screen and extra large sidebar is swiped on extra large screen and large sidebar on all lower screens when open button is clicked (default)</li><li>2: Display large sidebar on extra large & large screen, medium sidebar on medium screen and header bar on small screen and large sidebar is swiped when open button is clicked</li><li>3: Display medium sidebar on large and medium screen and header bar on small screen and medium sidebar is swiped when open button is clicked</li><li>4: Display header bar on all screens, extra large sidebar is swiped on extra large screen and large sidebar is swiped on all lower screens</li><li>5: Display header bar on all screens and large sidebar is swiped on large screen</li><li>6: isplay header bar on all screens and medium sidebar is swiped</li></ul>|
|clear_reading|Hide sidebar on all article page to let article take full width to improve reading, and enjoy wide images and cover images. Useless if `sidebar_behavior` is equal to `3` or `4`. (true: enable, false: disable). Default behavior : `theme.clear_reading` value in theme configuration file.|
|thumbnail_image|Display thumbnail image of each post on index pages|
|thumbnail_image_position|Display thumbnail image at the right of title in index pages (`right`, `left` or `bottom`). Set this value to `right` if you have old posts to keep the old style on them and define `thumbnailImagePosition` on a post to overwrite this setting. (Default : `right`)|
|auto_thumbnail_image|Automatically select the cover image or the first photo from the gallery of a post if there is no thumbnail image as the thumbnail image. Set this value to `true` if you have old posts that use the cover image or the first photo as the thumbnail image and set `autoThumbnailImage` to `false` on a post to overwrite this setting. (Default : `true`)|
|read_more_message|Message displayed after the `<!-- more -->` comment or after 300 characters in post|
|go_to_message|Message displayed after the `<!-- more -->` comment or after 300 characters for post with link layout|
|cover_image|Your blog cover picture. **I STRONGLY recommend you to use a CDN to speed up loading of pages. There is many free CDN like Cloudinary or you can also use indirectly by using services like Google Photos.** Default image is on AWS S3 and delivered by AWS CloudFront. Otherwise put your image in folder `source/assets/images/` and use relative url : `your-image.png` **Change the default cover image to have an unique blog**|
|favicon|Your favicon located in folder `source/assets/images/`|
|image_gallery|Display an image gallery at the end of a post which have `photos` variables. (false: disabled, true: enabled)|
|archive_pagination|Displaying style of archive pages. (false: pagination disabled, true: pagination enabled)|
|category_pagination|Displaying style of category pages. (false: pagination disabled, true: pagination enabled)|
|tag_pagination|Displaying style of tag pages. (false: pagination disabled, true: pagination enabled)|

E.g :  
A category page look like this with `category_pagination: true` :  
![archives false](http://d1u9biwaxjngwg.cloudfront.net/docs/1.4.0/ud-archives-true-300.png)  

The same page with `category_pagination: false`:  
![archives false](http://d1u9biwaxjngwg.cloudfront.net/docs/1.4.0/ud-archives-false-300.png)  


#### Integrated services

``` yaml
# Integrated services
disqus_shortname:
gravatar_email: 
google_analytics_id: 
fb_admin_ids:
fb_app_id:
```

|Variable|Description|
|---|---|
|disqus_shortname|Your Disqus shortname. The theme use its own value for disqus shortname to reduce dependency with Hexo in case of this variable is deleted in a new Hexo version.| 
|gravatar_email|Your gravatar email. Overwrite `author.picture` everywhere in the blog|
|google_analytics_id|Your Google analystics web property ID : UA-XXXXX-X|
|fb_admin_ids|Your Facebook user ids used to connect your blog with your facebook user accounts (Facebook Insights). Separate ids with comma. E.g : `9830047,1003342`. Visit [Facebook docs](https://developers.facebook.com/docs/platforminsights/domains) for more information.|
|fb_app_id|Your Facebook app id used to connect your blog with your facebook app account (Facebook Insights). E.g : `9841307`. Visit [Facebook docs](https://developers.facebook.com/docs/platforminsights/domains) for more information.|

#### Sharing options

``` yaml
# Sharing options
sharing_options:
    facebook:
        icon: "fa-facebook-official"
        url: "https://www.facebook.com/sharer/sharer.php?u={{post.permalink}}"
    twitter:
        icon: "fa-twitter"
        url: "https://twitter.com/intent/tweet?text={{post.permalink}}"
    google_plus:
        icon: "fa-google-plus"
        url: "https://plus.google.com/share?url={{post.permalink}}"
```

You can comment and uncomment to enable or disable sharing options. If your own sharing options, follow these steps. E.g with **foo_bar** social network:

1. Add a new option based on the other.
``` yaml
sharing_options:
    foo_bar:
        icon: "fa-foo_bar"
        url: "https://www.foo_bar.com/sharer/sharer.php?u={{post.permalink}}"
```
2. Add a line in the language file that you use (location: `themes/tranquilpeak/languages/`)
``` yaml
global:
    share_on_foo_bar: "Share on Foo Bar"
```

|Variable|Description|
|---|---|
|icon|Name of the font awesome icon class without the `fa-` (Go to [font-awesome icons](http://fontawesome.io/icons/) to find class name of icon)|
|url|URL of the link. use `{{` `}}` to insert post variable. Eg: `{{post.date}}` |


### Enable pages ###

Tranquilpeak provides you 3 pages to display all posts title and date by tags, by categories, by date and an about page. To enable one of this pages, 
read following step.

#### Enable all-categories page

To enable `all-categories` page :

1. Run `hexo new page "all-categories"`. A new folder named `all-categories` will be created in `source/`
2. Replace `source/all-categories/index.md` content with :
 
``` markdown
---
title: "all-categories"
layout: "all-categories"
comments: false
---
```

New page will be reach at : `/all-categories`. On this page, users will be able to search and filter categories.

#### Enable all-tags page

To enable `all-tags` page :

1. Run `hexo new page "all-tags"`. A new folder named `all-tags` will be created in `source/`
2. Replace `source/all-tags/index.md` content with :
 
``` markdown
---
title: "all-tags"
layout: "all-tags"
comments: false
---
```

New page will be reach at : `/all-tags`. On this page, users will be able to search and filter tags.

#### Enable all-archives page

To enable `all-archives` page :

1. Run `hexo new page "all-archives"`. A new folder named `all-archives` will be created in `source/`
2. Replace `source/all-archives/index.md` content with :
 
``` markdown
---
title: "all-archives"
layout: "all-archives"
comments: false
---
```  

New page will be reach at : `/all-archives`.  
On this page, users will be able to search and filter posts.  
**Search pattern** : YYYY/MMM/DD

## Integrated services configuration ##

### Algolia ###

The search modal of the theme use Algolia API to search in your posts. Of course, you have to create an account on Algolia to use it. Follow these steps to enable search modal :
1. Install [hexo-algoliaseach](https://github.com/LouisBarranqueiro/hexo-algoliasearch) at the root of your blog folder with `npm install hexo-algoliasearch --save`
2. Configure the plugin by following [hexo-algoliaseach - Configuration](https://github.com/LouisBarranqueiro/hexo-algoliasearch#configuration). **Some fields are required to use it with this theme**
3. Run `hexo algolia` to index your posts on Algolia. 
4. Configure the search on your Algolia dashboard.

**Each time you want to deploy your blog, run `hexo algolia` before deploying it.** Currently, the plugin clear the existing index on Algolia and re-index all your posts.

**Required fields**
``` yml
fields:
  - title
  - date
  - excerpt
  - excerpt:strip
  - permalink
  - thumbnailImageUrl
```

**Standard configuration**
``` yml
algolia:
  appId: "Z7A3XW4R2I"
  apiKey: "12db1ad54372045549ef465881c17e743"
  adminApiKey: "40321c7c207e7f73b63a19aa24c4761b"
  chunkSize: 5000
  indexName: "tranquilpeak"
  fields:
    - title
    - date
    - permalink
    - thumbnailImageUrl
    - tags
    - categories
    - excerpt
    - excerpt:strip
```

### Google Analytics ###

#### Exclude hostname (localhost) while writing articles

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

## Quick & easy modifications ##

### Prerequisites ###

Since you are going to edit the theme, you have to install all the necessary to build it after changes : [Installation](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak/blob/master/docs/developer.md#installation)

**Run command in theme folder : `hexo-blog/themes/tranquilpeak`**

### Change global style ###

If you want to change font families, font size, sidebar color, things like that, take a look at `source/_css/utils/_variables.scss` file. This file contains global variables used in this theme. **Build the theme after changes to see changes.**

### Change code coloration (Highlight.js theme) ###

Tranquilpeak integrate its own highlight.js theme inspired by GitHub. 
Of course, you can replace it with an other theme found on highlight.js repository. Since Hexo use different CSS class names, all theme are not ready out of the box, but it is very easy to make them compatible. 

Follow these steps :

1. Get your theme here : [Highlight.js theme](https://github.com/isagalaev/highlight.js/tree/master/src/styles) or create yours
2. Follow guidelines in `source/_css/themes/hljs-custom.scss` file
3. Build the theme with `npm run prod` or `grunt buildProd`. Learn more about Grunt tasks : [Grunt tasks](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak/blob/master/docs/developer.md#grunt-tasks)

### Customize 404 error page

When a user requests a page that the server cannot find, a standard *404* error page will be displayed. To create a custom 404 page that fits the theme first create a `404.md` file in your Hexo `source` folder.

Hide post meta, actions and comments using front-matter settings:

``` yaml
title: Page not found
meta: false
actions: false
comments: false
```

Now you can customize your 404 error page just like any other blog post.
Finally, you need to tell your server to use `/404.html` (which Hexo generates out of `404.md`) as your default 404 error page. Here are tutorials for some common web servers/providers:

 - [Apache](https://www.digitalocean.com/community/tutorials/how-to-create-a-custom-404-page-in-apache)
 - [Nginx](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-to-use-custom-error-pages-on-ubuntu-14-04)
 - [GitHub Pages](https://help.github.com/articles/creating-a-custom-404-page-for-your-github-pages-site/)
 - [Amazon Cloudfront/S3](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages.html)


## Migrating posts ##

### Prerequisites ###

Since you are going to edit the theme, you have to install all the necessary to build it after changes : [Installation](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak/blob/master/docs/developer.md#installation)

### v1.3.0 or lower to v1.4.0 or higher ###

If you used Tranquilpeak v1.3.0 or lower, you used maybe the  auto excerpt feature  : If there is no tag `<!-- more -->` in your post, so the excerpt is defined by cut the content after 250 characters.
  
Auto excerpt feature doesn't exist anymore since Tranquilpeak v1.4.0. And now, when there is no tag `<-- more -->` and `<!-- excerpt -->` in your post, the post is not cut and it will be displayed entirely on index page. 
Maybe, you don't want to display entirely all of your old posts. So If you have a lot of posts to edit and you don't want to do to define the excerpt manually, use our script to automate this task.
  
With the migration script, the `<!-- excerpt -->` tag will be inserted at the end of the line of each posts which don't have an excerpt tag (more and excerpt).

1. Run `hexo migrate 1.4.0` in your blog directory. 
2. It will ask you :
  * The name of the directory that contains all of your post (default: **_posts**) 
  * The date of your last post written with a version of Tranquil anterior to 1.4.0
3. Your old posts will be put in **_1.4.0_old_posts** directory and the new posts in **_posts**

#### Known issues

##### The migration stopped after **Checking for posts without `<-- more -->` and `<!-- excerpt -->` tag** step

We don't know if it come from Node.js (from specific version or not) or permissions of the directory which contains posts but follow these steps to fix this issue :

1. Rename your posts directory
2. Create a directory : **_posts**
3. Move all of your posts in **_posts** directory
4. Re-run migration script
 
## Writing posts ##

To write articles, you have to use Markdown language. [Here](https://guides.github.com/features/mastering-markdown/#examples) you can find the main basics of Markdown syntax.   
Please note, there are many different versions of Markdown and some of them are not supported by Hexo.  
To use tags plugins to highlight code or add Fancybox image, please read [Hexo docs](https://hexo.io/docs/tag-plugins.html)

**I STRONGLY recommend you to use a CDN to speed up loading of pages. There is many free CDN like Cloudinary or you can also use indirectly by using services like Google Photos.**

### Front-matter settings ###

Tranquilpeak introduces new variables to give you a lot of possibilities.  

**Since Tranquilpeak 1.7, if you declare some photos in `photos` variable with a caption or an thumbnail url, please use `gallery` variable name instead of `photos` otherwise Hexo will generate wrong url for these images in open graph meta tag.**
  
Example :  
``` markdown
disqusIdentifier: fdsF34ff34
keywords:
- javascript
- hexo
clearReading: true
thumbnailImage: image-1.png
thumbnailImagePosition: bottom
autoThumbnailImage: yes
metaAlignment: center
coverImage: image-2.png
coverCaption: "A beautiful sunrise"
coverMeta: out
coverSize: full
coverImage: image-2.png
gallery:
    - image-3.jpg "New York"
    - image-4.png "Paris"
    - http://i.imgur.com/o9r19kD.jpg "Dubai"
    - https://example.com/orignal.jpg https://example.com/thumbnail.jpg "Sidney"
comments: false
meta: false
actions: false
```

|Variable|Description|
|---|---|
|disqusIdentifier|Define a unique string which is used to look up a page's thread in the Disqus system.|
|keywords|Define keywords for search engines. you can also define global keywords in Hexo configuration file.|
|clearReading|Hide sidebar on all article page to let article take full width to improve reading, and enjoy wide images and cover images. Useless if `theme.sidebar_behavior` is equal to `3` or `4`. (true: enable, false: disable). Default behavior : `theme.clear_reading` value in theme configuration file.|
|autoThumbnailImage|Automatically select the cover image or the first photo from the gallery of a post if there is no thumbnail image as the thumbnail image. `autoThumbnailImage` overwrite the setting `auto_thumbnail_image` in the theme configuration file|
|thumbnailImage|Image displayed in index view.|
|thumbnailImagePosition|Display thumbnail image at the right of title in index pages (`right`, `left` or `bottom`). `thumbnailImagePosition` overwrite the setting `thumbnail_image_position` in the theme configuration file|
|metaAlignment|Meta (title, date and categories) alignment (right, left or center). Default behavior : left|
|coverImage|Image displayed in full size at the top of your post in post view. If thumbnail image is not configured, cover image is also used as thumbnail image. Check the beautiful demo here : [Cover image demo](http://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2015/05/13/Cover-image-showcase/)|
|coverSize|`partial`: cover image take a part of the screen height (60%), `full`: cover image take the entire screen height.|
|coverCaption|Add a caption under the cover image : [Cover caption demo](http://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2015/05/13/Cover-image-showcase/)|
|coverMeta|`in`: display post meta (title, date and categories) on cover image, `out`: display meta (title, date and categories) under cover image as usual. Default behavior : `in`|
|gallery|Formerly **photos**. Images displayed in an image gallery (with fancybox) at the end of the post. If thumbnail image is not configured and cover image too, the first photo is used as thumbnail image. format: `original url [thumbnail url] [caption]`, E.g : `https://example.com/original.jpg https://example.com/thumbnail.jpg "New York"`|
|comments|Disable the comment of the post.|
|meta|Disable post meta (date, categories).|
|actions|Disable post actions (navigation, share links).|

Example: 
A post on index page will look like this with :`thumbnailImagePosition` set to `bottom`:  
![thumbnail-image-position-bottom](https://s3-ap-northeast-1.amazonaws.com/tranquilpeak-hexo-theme/docs/1.4.0/TIP-bottom-400.jpg)  
  
The same with : `thumbnailImagePosition` set to `right`:  
![thumbnail-image-position-right](https://s3-ap-northeast-1.amazonaws.com/tranquilpeak-hexo-theme/docs/1.4.0/TIP-right-400.png)  
  
The same with : `thumbnailImagePosition` set to `left`:  
![thumbnail-image-position-left](https://s3-ap-northeast-1.amazonaws.com/tranquilpeak-hexo-theme/docs/1.4.0/TIP-left-400.png)  



**The relative path of images entered is : `source/_posts/{YOUR_POST_TITLE}/`, you just have to enter the name of the image without domain name and path like written just above.  
Of course, you can set external url.**

### Define post excerpt ###

Tranquilpeak v1.4.0 introduce a new way to define post excerpt with `<!-- excerpt -->` comment. Use 
- `<!-- more -->` to define post excerpt and keep the post excerpt in the post content
- `<!-- excerpt -->` to define post excerpt and remove the post excerpt of the post content

### Display all post content ###

**To display all post content on index page, don't put `<!-- more -->` and `<!-- excerpt -->` comment in your post content.**

### Display table of contents ###

As post excerpt feature enable with `<!-- more -->` comment, you can display the table of contents of a post with  `<!-- toc -->`.  Place this comment where you want to display the table of content. You can also edit the title displayed at the top of the table of contents in the `_config.yml` file
  
Here is what looks like the table of contents generated:  
![thumbnail-image-position-left](https://s3-ap-northeast-1.amazonaws.com/tranquilpeak-hexo-theme/docs/1.4.0/toc-400.png) 
  
### Tags ###

Tranquilpeak introduce new tags to display alert messages, images in full width and create beautiful galleries.
**DON'T use anymore fancybox tag**. Please use `image` tag with `fancybox` class to generate them. More information here : [Image tag](#image) 

#### Alert

![alert-tag](https://s3-ap-northeast-1.amazonaws.com/tranquilpeak-hexo-theme/docs/1.6/alert-tag.png)

Alert tag is useful to highlight a content like a tips or a warning. Check it live here : [Alert tag demo](http://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2014/10/29/Tags-plugins-showcase/#Alerts)

Syntax :  
```
{% alert [classes] %}
content
{% endalert %}
```

E.g : 
```
{% alert danger no-icon %}
Here is a danger alert without icon
{% endalert %}
```

|Argument|Description|
|---|---|
|Classes|<ul><li>info</li><li>success</li><li>warning</li><li>danger</li><li>no-icon</li></ul>|

#### Highlight Text

![highlight_text-tag](https://s3-ap-northeast-1.amazonaws.com/tranquilpeak-hexo-theme/docs/1.6/highlight_text-tag.png)

Highlight text tag is useful to highlight an interesting part in a text. Check it live here : [Highlight text tag demo](http://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2014/10/29/Tags-plugins-showcase/#Highlight-text)

Syntax :  
```
{% hl_text [(classes | hexa code | rgb color | rgba color)] %} 
content
{% endhl_text %}
``` 

E.g :  
```
{% hl_text danger %}
your highlighted text
{% endhl_text %}
```

|Argument|Description|
|---|---| 
|Classes|<strong>classes</strong> : <ul><li>red</li><li>green</li><li>blue</li><li>purple</li><li>orange</li><li>yellow</li><li>cyan</li><li>primary</li><li>success</li><li>warning</li><li>danger</li></ul>|
        
**You can also use hexa color, rgb color, rgba color.**

**It's important to put the paragraph that contains highlight text tag inside** `<p>...</p>` 
**otherwise the following content may not be rendered.**

E.g (hexa color) :  
``` 
<p>Sed imperdiet urna et quam ultrices {% hl_text #00FFFF %}your highlighted text{% endhl_text %} dignissim ultrices libero.</p>
```

E.g (rgba color) :  
```
<p>Sed imperdiet urna et quam ultrices {% hl_text rgba(12, 12, 12, 0.4) %}your highlighted text{% endhl_text %} dignissim ultrices libero.</p>
```

#### Image

Image tag is useful to add images and create beautiful galleries. Check what are the possibilities here : [Image tag demo](http://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2014/10/29/Tags-plugins-showcase/#Images)

Syntax : `{% image [classes] group:group-name /path/to/image [/path/to/thumbnail] [width of thumbnail] [height of thumbnail] [title text] %}`  
E.g : `{% image fancybox right clear group:travel image2.png http://google.fr/images/image125.png 150px 300px "A beautiful sunrise" %}`

|Argument|Description|
|---|---| 
|Classes (optional)|You can add css classes to stylize the image. Separate class with whitespace. Tranquilpeak integrate many css class to create nice effects :  <ul><li><strong>fancybox</strong> : Generate a fancybox image.</li><li><strong>nocaption</strong> : Caption of the image will not be displayed.</li><li><strong>left</strong> : Image will float at the left.</li><li><strong>right</strong> : Image will float at the right.</li><li><strong>center</strong> : Image will be at center.</li><li><strong>fig-20</strong> : Image will take 20% of the width of post width and automatically float at left.</li><li><strong>fig-25</strong> : Image will take 25% of the width of post width and automatically float at left.</li><li><strong>fig-33</strong> : Image will take 33% of the width of post width and automatically float at left.</li><li><strong>fig-50</strong> : Image will take 50% of the width of post width and automatically float at left.</li><li><strong>fig-75</strong> : Image will take 75% of the width of post width and automatically float at left.</li><li><strong>fig-100</strong> : Image will take 100% of the width of post width.</li><li><strong>clear</strong> : Add a div with `clear:both;` style attached after the image to retrieve the normal flow of the post.</li></ul>|
|Group (optional)| Name of a group, used to create a gallery. **Only for image with `fancybox` css class**|
|Orignal image| Path to the original image.|
|Thumbnail image (optional)| Path to the thumbnail image. If empty, the orignal image will be displayed.|
|Width of thumbnail image (optional)| Width to the thumbnail image. If the thumbnail image is empty, width will be attached to thumbnail image created from original image. E.g : `150px` or `85%`.|
|Height of thumbnail image (optional)| Height to the thumbnail image. If the thumbnail image is empty, height will be attached to thumbnail image created from original image. E.g : `300px` or `20%`.|
|Title (optional)| Title of image displayed in a caption under image. `Alt` HTML attribute will use this title. E.g : `"A beautiful sunrise"`.|
 
#### Tabbed code block

Tabbed code blocks are useful to group multiple code blocks related. For example, the source code of a web component (html, css and js). Or compare a source code in different languages.

![tabbed_codeblock-tag](https://s3-ap-northeast-1.amazonaws.com/tranquilpeak-hexo-theme/docs/1.7/tabbed_codeblock-tag.png)

Check it live : [tabbed code block demo](http://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2014/10/29/Tags-plugins-showcase/#Tabbed-code-block)

Syntax :
``` js
  {% tabbed_codeblock [name] [link] %}
      <!-- tab [lang] -->
          source code
      <!-- endtab -->
  {% endtabbed_codeblock %}
```

E.g :  
``` js
  {% tabbed_codeblock example http://example.com %}
      <!-- tab js -->
          var test = 'test';
      <!-- endtab -->
      <!-- tab css -->
          .btn {
              color: red;
          }
      <!-- endtab -->
  {% endtabbed_codeblock %}
``` 
|Argument|Description|
|---|---| 
|Name (optional)|Name of the code block, or of the file|
|Link (optional)|Link to a demo, or a file|
|Lang (optional)|Programming language use for the current tab|

#### Wide image

Wide image tag is useful to display wide images in full width. It take the entire window width. Check the the result : [Wide image tag demo](http://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2014/10/29/Tags-plugins-showcase/#Wide-images)

Syntax : `{% wide_image /path/to/image [title text] %}`  
E.g : `{% wide_image http://google.fr/images/image125.png "A beautiful sunrise" %}`  

|Argument|Description|
|---|---| 
|Image|Path to the original image.|
|Title (optional)|Title of image displayed in a caption under image. `Alt` HTML attribute will use this title. E.g : `"A beautiful sunrise"`.| 

#### Fancybox

`fancybox` tag is deprecated since Tranquilpeak 1.3. Please use `image` tag with `fancybox` class to generate them. More information here : [Image tag](#image) 

## Running ##

Run `hexo server` and start writing! :)
