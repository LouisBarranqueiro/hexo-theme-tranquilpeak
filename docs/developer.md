# Developer documentation #

This documentation will help you to understand tranquil-peak-hexo-theme code.  

If you want to report a bug or ask a question, create an issue.

## Summary ##

- [Requirements](#requirements)
- [Code structure](#code-structure)

 
## Requirements ##

- [node](https://nodejs.org) v0.10.35 or later

## Installation ##

1. Run ```git clone https://github.com/LouisBarranqueiro/tranquil-peak-hexo-theme.git```
2. Rename the folder in ```tranquil-peak``` and place it in ```themes``` folder of your Hexo blog
3. Modify the theme in ```_config.yml``` by changing ```theme``` variable  to ```tranquil-peak```
4. Complete ```theme/tranquil-peak/_config.yml``` with your informations by following directives in comments

If you want to configure the theme, please follow the [user documentation](https://github.com/LouisBarranqueiro/tranquil-peak-hexo-theme/blob/master/docs/user.md)  
  
## Code structure ##

```
tranquil-peak-hexo-theme
├── docs
│   ├── developer.md
│   └── user.md
├── layout
│   ├── _partial
│   │   ├── post
│   │   │   ├── actions.ejs
│   │   │   ├── category.ejs
│   │   │   ├── disqus.ejs
│   │   │   ├── gallery.ejs
│   │   │   ├── header.ejs
│   │   │   ├── meta.ejs
│   │   │   └──  tag.ejs
│   │   ├── about.ejs
│   │   ├── archive-post.ejs
│   │   ├── archive.ejs
│   │   ├── cover.ejs
│   │   ├── footer.ejs
│   │   ├── google-analytics.ejs
│   │   ├── head.ejs
│   │   ├── header.ejs
│   │   ├── index.ejs
│   │   ├── pagination.ejs
│   │   ├── post.ejs
│   │   ├── script.ejs
│   │   └──  sidebar.ejs
│   ├── all-archives.ejs
│   ├── all-categories.ejs
│   ├── all-tags.ejs
│   ├──archives.ejs
│   ├── category.ejs
│   ├── index.ejs
│   ├── layout.ejs
│   ├── page.ejs
│   ├── post.ejs
│   └── tag.ejs
├── source
│   ├── _css
│   │   ├── base
│   │   │   ├── _base.scss
│   │   ├── components
│   │   │   ├── archives.scss
│   │   │   ├── _box.scss
│   │   │   ├── _button.scss
│   │   │   ├── _category.scss
│   │   │   ├── _form.scss
│   │   │   ├── _hide.scss
│   │   │   ├── _highlight.scss
│   │   │   ├── _icon.scss
│   │   │   ├── _image-gallery.scss
│   │   │   ├── _link.scss
│   │   │   ├── _main-content.scss
│   │   │   ├── _markdown.scss
│   │   │   ├── _pagination.scss
│   │   │   ├── _post-actions.scss
│   │   │   ├── _post.scss
│   │   │   ├── _pullquote.scss
│   │   │   ├── _tag.scss
│   │   │   ├── _text.scss
│   │   │   ├── _tooltip.scss
│   │   │   └── _video.scss
│   │   ├── layout
│   │   │   ├── _about.scss
│   │   │   ├── _blog.scss
│   │   │   ├── _cover.scss
│   │   │   ├── _footer.scss
│   │   │   ├── _header.scss
│   │   │   ├── _main.scss
│   │   │   └── _sidebar.scss
│   │   ├── utils
│   │   │   ├── mixins
│   │   │   │   ├── _button.scss
│   │   │   │   ├── _category.scss
│   │   │   │   ├── _form.scss
│   │   │   │   ├── _opacity.scss
│   │   │   │   ├── _prefix.scss
│   │   │   │   └── _tag.scss
│   │   │   ├── _font.scss
│   │   │   └── _variables.scss
│   │   └── tranquil-peak.scss
│   ├── _images
│   │   └── cover.png
│   └── _js
│   │   ├── about.js
│   │   ├── archives-filter.js
│   │   ├── categories-filter.js
│   │   ├── fancybox.js.js
│   │   ├── header.js
│   │   ├── image-gallery.js
│   │   ├── post-bottom-bar.js
│   │   ├── sidebar.js
│   │   ├── smartresize.js
│   │   └── tags-filter.scss
├── tasks
├── .bowerrc
├── Gruntfile.js
├── LICENSE
├── README.md
├── _config.yml
├── bower.json
└── package.json
```

- **docs** : contains user and developer documentation
- **layout** : contains all views
- **source** : contains all assets (css, js and images)
- **tasks** : contains all grunt tasks

## Build ##

To build the theme, you have to install :  
2. Grunt : ```npm install grunt -g```. Install Grunt globally
3. Bower : ```npm install bower -g```. Install Bower globally

### NPM dependencies ###

To install npm dependencies, run ```npm install```  
  
Tranquil-peak-hexo-theme npm dependencies :  
 - **bower** : ^1.3.12
 - **grunt** : ^0.4.5
 - **grunt-bower** : ^0.18.0
 - **grunt-contrib-clean** : ~0.5.0
 - **grunt-contrib-concat** : ^0.5.0
 - **grunt-contrib-copy** : ~0.4.1
 - **grunt-contrib-cssmin** : ^0.12.0
 - **grunt-contrib-sass** : ^0.8.1
 - **grunt-contrib-uglify** : ^0.7.0
 - **grunt-contrib-watch** : ^0.6.1
 - **grunt-sails-linker** : ^0.10.1
 - **grunt-sync** : ^0.2.3
 - **grunt-text-replace** : ^0.4.0
 - **include-all** : ^0.1.6
 - **load-grunt-tasks** : ~0.2.0
 
 
### Bower dependencies ###

To install bower dependencies, run ```bower install```  
Bower dependencies are located in ```source/_bower_components```

Tranquil-peak-hexo-theme bower dependencies :  
- **Font-awesome** : ~4.3.0
- **jQuery** : ~2.1.3
- **Fancybox** : ~2.1.5

### Grunt tasks ###

Development environment:  
1. Use:  ```grunt build``` to sync bower dependencies and compile assets and link it to views
2. Use ```grunt watch``` to automatically re-build the project after change on assets

Production environment (before deploy your blog):  
1. Use: ```grunt buildProd``` to build the project with some optimization (concat and minify)

## Running ##

Run ```hexo server``` and start coding!