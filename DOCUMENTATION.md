# Tranquilpeak

- [Installation](#installation)
- [Hexo configuration](#hexo-configuration)
- [Tranquilpeak configuration](#tranquilpeak-configuration)
- [Integrated services configuration](#integrated-services-configuration)
- [Modifying the theme](#modifying-the-theme)  
- [Writing posts](#writing-posts)
- [Running](#running)

## Installation

1. Download the latest version built and ready for production here : [releases](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak/releases)
2. Rename the folder in `tranquilpeak` and place it in the `themes` folder of your Hexo blog
3. Modify the theme in Hexo configuration file (`_config.yml`) by setting `theme` variable to `tranquilpeak`

## Hexo configuration

### Enable post assets folder

If you want to take advantage of cover image, thumbnail image, and image gallery features, you have to enable post assets folder by setting `post_asset_folder` to  `true` in Hexo configuration file (`_config.yml`).

### Disable relative links

You have to set `relative_link` to `false` otherwise if you enter your blog url without the end `/`, like this `http://yourdomain.com/blog`, all assets will not be loaded.
There is currently an issue on Hexo repository to fix this problem.

### Enable RSS feed

1. Execute `npm install hexo-generator-feed --save` in your Hexo blog folder  
2. Add these lines in Hexo configuration file (`_config.yml`):  

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

### Define global keywords

You can define keywords for search engines. These keywords will be added on all pages.

``` yaml
keywords:
- hexo
- javascript
```

## Tranquilpeak configuration

### Language configuration

If you are new to Hexo and internationalization (i18n), please read [Hexo documentation - internationalization (i18n) section](https://hexo.io/docs/internationalization.html)

Currently, the theme is delivered with:

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

**Tranquilpeak theme is currently not ready to support multi-languages.**

### Theme configuration

Complete `theme/tranquilpeak/_config.yml` with your information by following guidelines.

### Enable search modal

The search modal of the theme works with Algolia API to search in your posts. To enable this features, follow these steps:
1. Create an account on Algolia
2. Install and configure [hexo-algoliaseach](https://github.com/LouisBarranqueiro/hexo-algoliasearch) plugin
3. Index your posts before deploying your blog

### Enable pages

Tranquilpeak provides 3 pages to filter all posts by tags, categories and date. To enable one of these pages, 
read following steps.

#### Enable all-categories page

To enable `all-categories` page:

1. Run `hexo new page "all-categories"`. A new folder named `all-categories` will be created in `source/`
2. Replace `source/all-categories/index.md` content with:
 
``` markdown
---
title: "all-categories"
layout: "all-categories"
comments: false
---
```

This page will be reachable at: `/all-categories`. On this page, users will be able to search and filter posts by categories.

#### Enable all-tags page

To enable `all-tags` page:

1. Run `hexo new page "all-tags"`. A new folder named `all-tags` will be created in `source/`
2. Replace `source/all-tags/index.md` content with:
 
``` markdown
---
title: "all-tags"
layout: "all-tags"
comments: false
---
```

This page will be reachable at: `/all-tags`. On this page, users will be able to search and filter posts by tags.

#### Enable all-archives page

To enable `all-archives` page:

1. Run `hexo new page "all-archives"`. A new folder named `all-archives` will be created in `source/`
2. Replace `source/all-archives/index.md` content with:
 
``` markdown
---
title: "all-archives"
layout: "all-archives"
comments: false
---
```  

This page will be reachable at: `/all-archives`. On this page, users will be able to search and filter posts by date.  
**Search pattern** : YYYY/MMM/DD

## Integrated services configuration ##

### Google Analytics

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

## Modifying the theme

1. Run `npm install` to install dependencies
2. Run `hexo s` then `npm run start` and start coding :)

### Save changes

1. Run `npm run prod` to build the theme

### Change global style

If you want to change font families, font size, sidebar color, things like that, take a look at `source/_css/utils/_variables.scss` file. This file contains global variables used in this theme. 

### Change code coloration (Highlight.js theme)

Tranquilpeak integrates its own highlight.js theme inspired by GitHub. 
Of course, you can replace it with an other theme found on highlight.js repository. Since Hexo uses different CSS class names, all themeS are not ready out of the box, but it is very easy to make them compatible. 

Follow these steps :

1. Get your theme here : [Highlight.js theme](https://github.com/isagalaev/highlight.js/tree/master/src/styles) or create yours
2. Follow guidelines in `source/_css/themes/hljs-custom.scss` file

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


## Writing posts

To write articles, you have to use Markdown language. [Here](https://guides.github.com/features/mastering-markdown/#examples) you can find the main basics of Markdown syntax.   
Please note, there are many different versions of Markdown and some of them are not supported by Hexo.  
To use tags plugins to highlight code or add Fancybox image, please read [Hexo docs](https://hexo.io/docs/tag-plugins.html)

**I STRONGLY recommend you to use a CDN to speed up loading of pages. There is many free CDN like Cloudinary or you can also use indirectly by using services like Google Photos.**

### Front-matter settings

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
|coverImage|Image displayed in full size at the top of your post in post view. If thumbnail image is not configured, cover image is also used as thumbnail image. Check the beautiful demo here : [Cover image demo](https://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2015/05/13/Cover-image-showcase/)|
|coverSize|`partial`: cover image take a part of the screen height (60%), `full`: cover image take the entire screen height.|
|coverCaption|Add a caption under the cover image : [Cover caption demo](https://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2015/05/13/Cover-image-showcase/)|
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

### Define post excerpt

- `<!-- more -->` to define post excerpt and keep the post excerpt in the post content
- `<!-- excerpt -->` to define post excerpt and remove the post excerpt of the post content

### Display all post content

**To display all post content on index page, don't put `<!-- more -->` and `<!-- excerpt -->` comment in your post content.**

### Display table of contents

You can display table of contents of a post with  `<!-- toc -->`.  Place this comment where you want to display it. You can also edit the title displayed at the top of the table of contents in the `_config.yml` file.
  
![thumbnail-image-position-left](https://s3-ap-northeast-1.amazonaws.com/tranquilpeak-hexo-theme/docs/1.4.0/toc-400.png) 
  
### Tags

Tranquilpeak introduces new tags to display alert messages, images in full width and create beautiful galleries.
**DON'T use anymore fancybox tag**. Please use `image` tag with `fancybox` class to generate them. More information here : [Image tag](#image) 

#### Alert

![alert-tag](https://s3-ap-northeast-1.amazonaws.com/tranquilpeak-hexo-theme/docs/1.6/alert-tag.png)

Alert tag is useful to highlight a content like a tips or a warning. Check it live here : [Alert tag demo](https://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2014/10/29/Tags-plugins-showcase/#Alerts)

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

Highlight text tag is useful to highlight an interesting part in a text. Check it live here : [Highlight text tag demo](https://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2014/10/29/Tags-plugins-showcase/#Highlight-text)

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

Image tag is useful to add images and create beautiful galleries. Check what are the possibilities here : [Image tag demo](https://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2014/10/29/Tags-plugins-showcase/#Images)

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

Check it live : [tabbed code block demo](https://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2014/10/29/Tags-plugins-showcase/#Tabbed-code-block)

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

Wide image tag is useful to display wide images in full width. It takes entire window width. Check the result : [Wide image tag demo](https://louisbarranqueiro.github.io/hexo-theme-tranquilpeak/2014/10/29/Tags-plugins-showcase/#Wide-images)

Syntax : `{% wide_image /path/to/image [title text] %}`  
E.g : `{% wide_image http://google.fr/images/image125.png "A beautiful sunrise" %}`  

|Argument|Description|
|---|---| 
|Image|Path to the original image.|
|Title (optional)|Title of image displayed in a caption under image. `Alt` HTML attribute will use this title. E.g : `"A beautiful sunrise"`.| 

#### Fancybox

`fancybox` tag is deprecated since Tranquilpeak 1.3. Please use `image` tag with `fancybox` class to generate them. More information here : [Image tag](#image) 

## Running

Run `hexo server` and start writing! :)
