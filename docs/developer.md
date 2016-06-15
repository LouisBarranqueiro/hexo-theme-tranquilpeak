# Developer documentation #

This documentation will help you to understand Tranquilpeak Hexo theme code.  

If you want to report a bug or ask a question, [create an issue](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak/issues/new).

## Summary ##

- [General](#general)
- [Requirements](#requirements)
- [Installation](#installation)1
- [Code style](#code-style)
- [Code structure](#code-structure)
    * [Languages](#languages)
    * [Views](#views)
    * [Scripts](#scripts)
    * [Assets](#assets)
         * [Stylesheets](#stylesheets)
         * [Fonts](#fonts)
         * [Images](#images)
         * [Javascript](#javascript)
- [NPM scripts](#npm-scripts)
- [Grunt tasks](#grunt-tasks)
    * [Tasks structure](#tasks-structure)
    * [Pipeline](#pipeline)
    * [Config tasks](#config-tasks)
    * [Register tasks](#register-tasks)
- [Build](#build)
- [Running](#running)

## General ##

- **Author** : Louis Barranqueiro
- **Version** : 1.8.1
- **Compatibility** : Hexo 3.0.0 or later

## Requirements ##

1. **Node** : v0.10.35 or higher. Download [Node](https://nodejs.org/download/)
2. **Hexo CLI** : v0.1.4 or higher. Run `npm install hexo-cli -g`
3. **Grunt CLI** : v0.1.13 or higher. Run `npm install grunt-cli -g`
4. **Bower** : v1.4.1 or higher. Run `npm install bower -g`

## Installation ##

1. Run `git clone https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak.git`
2. Rename the folder in `tranquilpeak` and place it in `themes` folder of your Hexo blog
3. Modify the theme in `_config.yml` by changing `theme` variable  to `tranquilpeak`
4. Complete `theme/tranquilpeak/_config.yml` with your information by following directives in comments
5. Go in `theme/tranquilpeak` folder with `cd themes/tranquilpeak`
6. Install [requirements](#requirements)
7. Run `npm install` to install [NPM dependencies](#npm-dependencies)
8. Run `bower install` to install [Bower dependencies](#bower-dependencies) 

If you want to configure the theme, please follow the [user documentation](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak/blob/master/docs/user.md)  

## Code style ##

We use [ESLint](http://eslint.org) based on Google code style to maintain javascript code style.  
Check code style with :
``` bash
npm run lint
# or
grunt eslint
```

## Code structure ##

```
tranquilpeak
├── .github
├── docs
├── languages
├── layout
├── scripts
├── source
└── tasks
```

|File/Folder|Description|
|---|---|
|**.github**|Contains file templates for GitHub|
|**docs**|Contains user and developer documentation|
|**languages**|Contains language files|
|**layout**|Contains all views|
|**scripts**|Contains all scripts executed at the startup of Hexo|
|**source**|Contains all assets (css, js and images)|
|**tasks**|Contains all grunt tasks|

### Languages ###

Each files contains all labels used in the theme. 
If you want to add a new language, duplicate an existing language file and replace all string by their translation.

### Views ###

```
├── layout
    ├── _partial
    │   ├── post
    │   ...
    ...
...
```
|Folder|Description|
|---|---|
|layout|Contails all mains views|
|layout/partial|Contains all partial views included in main views|
|layout/partial/post|Contains all partial views to build post|

### Scripts ###

```
├── scripts
    ├── filters
    ├── helpers
    ├── migrators
    └── tags
```

Each scrips is executed a the startup of Hexo. They are separed by categories:

|Folder|Description|
|---|---|
|filters|A filter is used to modify some specified data. Hexo passes data to filter in sequence and filters can modify the data.|
|helpers|Helpers are used in templates to help insert snippets quickly. Helpers cannot be used in source files.|
|migrators|A migrator helps users migrate posts from other system or Hexo theme to Hexo.|
|tags|A tag helps users insert snippets to posts easily.|


### Assets ###

#### Stylesheets

SCSS structure follow 7-1 pattern of [sass guidelines](http://sass-guidelin.es/#the-7-1-pattern)  
If you want more information and to understand better this code, consult [sass guidelines](http://sass-guidelin.es/)  

#### Fonts

```
├── _fonts
    └── .gitkeep
```
|File|Description|
|---|---|
|.gitkeep|Ignore this file. It only exists because git refuses to push empty directories to a remote server. .gitkeep is an unofficial convention that has emerged as a workaround for people who don't discriminate against empty directories.|  

If you have local fonts, place them in this folder and import them in `source/_css/utils/_fonts.scss`.

#### Images 

```
├── _images
    └── cover.jpg
```
|File|Description|
|---|---|
|cover.png|Default background cover of the blog|
  
Contains all images of the theme.  

#### Javascript

```
├── _js
    ├── .eslintrc.json
    ├── about.js
    ├── archives-filter.js
    ├── categories-filter.js
    ├── codeblock-resizer.js
    ├── fancybox.js
    ├── header.js
    ├── image-gallery.js
    ├── post-bottom-bar.js
    ├── share-options.js
    ├── sidebar.js
    ├── smartresize.js
    ├── tabbed-codeblocks.js
    └── tags-filter.js
```
|File|Description|
|---|---|
|about.js|Fade out the blog and let drop the about card of the author and vice versa|
|archives-filter.js|Filter posts by using their date on archives page : `/archives`|
|categories-filter.js|Filter posts by using their categories on archives page : `/categories`|
|codeblock-resizer.js|Resize code blocks to fit the screen width|
|fancybox.js.js|Run Fancybox plugin|
|header.js|Hide the header when the user scrolls down, and show it when he scrolls up|
|image-gallery.js|Resize all images of an image-gallery|
|post-bottom-bar.js|Hide the post bottom bar when the post footer is visible by the user, and vice versa|
|share-options.js|Open and close the share-options bar|
|sidebar.js|Open and close the sidebar by swiping the sidebar and the blog and vice versa|
|smartresize.js|Debouncing function from [John Hann](https://github.com/unscriptable)|
|tabbed-codeblocks.js|Animate tabs of tabbed code blocks|
|tags-filter.js|Filter posts by using their tags on archives page : `/tags`|
  
Each file correspond to a feature.  
  
## NPM scripts

Use `npm run <script_name>` to run one of these scripts. E.g : `npm run start` 
    
|`npm run ...`|Description|
|---|---|
|`start`|Build the theme once and rebuild after each change|
|`prod`|Build the theme for production. (synchronize bower dependencies, images, fonts, compile assets (css and js) with some optimization (concat and minify) and link it to views)|
|`lint`|Check code style with [ESLint](http://eslint.org)|

## Grunt tasks ##

### Tasks structure 
  
```
├── tasks
    ├── config
    ├── register
    └── pipeline.js
```  

|File/folder|Description|
|---|---|
|config|Default tasks|
|register|Alias tasks which call multiple default tasks|
|pipeline.js|Files which contains a list of javascript and stylesheets files linked to the blog|

### Pipeline

``` javascript
// Js files to inject in `layout/_partial/script.ejs`
var tranquilpeakJsFilesToInject = [
    'jquery.js',
    'jquery.fancybox.js',
    'jquery.fancybox-thumbs.js',
    'tranquilpeak.js'
];
// Css files to inject in `layout/_partial/head.ejs`
var tranquilpeakCssFilesToInject = [
    'font-awesome.css',
    'jquery.fancybox.css',
    'jquery.fancybox-thumbs.css',
    'tranquilpeak.css'
];
```
|Variable|Description|
|---|---|
|tranquilpeakJsFilesToInject|Files injected in `layout/_partial/script.ejs` (developement environment)|
|tranquilpeakCssFilesToInject|Files injected in`layout/_partial/head.ejs` (developement environment)|

On production environment, these javascript and stylesheets files are concatenate and minify in 1 javascript file and 1 stylesheet file and linked to their respective views

### Config tasks 

|Task|Description|
|---|---|
|bower|Copy all needed files by types from bower dependencies|
|clean|Delete `source/assets` folder|
|concat|<ul><li>devJs : Concat all javascript files located in `source/_js/` into 1 file : `source/assets/js/tranquilpeak.js`</li><li>prodCss : Concat all stylesheets files located in `source/assets/css/` into 1 file : `source/assets/css/style.css`</li><li>prodJs : Concat all javascript listed in `tasks/pipeline.js` in 1 file : `source/assets/js/script.js`</li></ul>|
|cssmin|Minify `source/assets/cssstyle.css` file in : `source/assets/cssstyle.min.css`|
|exec|<ul><li>eslint : run `eslint .`</li></ul>|
|replace|<ul><li>linker : Replace `EJS_ENDTAG` string to resolve a problem of ejs escaping with sails-linker tasks</li><li>cssFancybox : Resolve path of images in fancybox.css. Impossible to use an other plugin to do that because in the bower fancybox packages, css files and images are in the same folder and that not the case in assets folder.</li><li>cssTranquilpeak : Resolve path of images and fonts in tranquilpeak.css.</li></ul>|
|sails-linker|<ul><li>devJs : Link all javascript files listed in `tasks/pipeline.js`  to `layout/_partial/script.ejs`</li><li>devCss : Link all stylesheets files listed in `tasks/pipeline.js`  to `layout/_partial/head.ejs`</li><li>prodJs : Link `source/assets/js/script.min.js` file in `layout/_partial/script.ejs`</li><li>prodCss : Link `source/assets/js/style.min.css` file in `layout/_partial/head.ejs`</li></ul>|
|sass|Compile `source/_css/tranquilpeak.scss` file in `source/assets/css/tranquilpeak.css`|
|sync|Synchronize images from `source/_images` to `source/assets/images` and fonts from `source/_fonts` to `source/assets/fonts`|
|watch|Watch assets from `source/_*/**/*` folder to detect changes and launch `syncAssets` task|

### Register tasks

|Task|Description|
|---|---|
|build|Synchronize bower dependencies, images, fonts, compile assets (css and js) and link it to views|
|buildProd|Synchronize bower dependencies, images, fonts, compile assets (css and js) with some optimization (concat and minify) and link it to views|
|default|Build the theme once and rebuild after each change|
|eslint|Check code style with ESLint|
|compileAssets|Compile scss files and concat js files|
|linkAssets|Link all javascript and stylesheets files to views|
|linkAssetsProd|Link one javascript file and one stylesheet file (concatenated and minified) to views|
|syncAssets|Synchronize assets (css, js, fonts and images)|

When you run `grunt build` or `grunt buildProd` tasks, a `source/assets` folder will be created with all files generated in. When you will start your hexo server, only this folder will be copied in `public` folder

## Build ##

### Development environment  

1. Run `npm run start` or `grunt default` and start coding :)

### Production environment (before deploying your blog)

1. Run `npm run prod` or `grunt buildProd` to build the project with some optimization (concat and minify) to reduce number of HTTP requests and improve performance.

## Running ##

Run `hexo server` and start coding! :)
