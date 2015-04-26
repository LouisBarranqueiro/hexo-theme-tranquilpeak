# Utilisation #

This documentation will help you to install tranquil-peak-hexo-theme and configure it to use all features which it provides

## Installation ##

1. Download the latest version ready for production utilisation here : [tranquil-peak-hexo-theme-v1.0.0-production](https://github
.com/LouisBarranqueiro/tranquil-peak-hexo-theme/releases/download/v1.0.0/tranquil-peak-hexo-theme-v1.0.0-production.zip) or choose an other version here : [all releases](https://github
.com/LouisBarranqueiro/tranquil-peak-hexo-theme/releases)
2. Rename the folder in ```tranquil-peak``` and place it in ```themes``` folder of your Hexo blog

## Hexo configuration ##

1. Modify the theme in ```_config.yml``` by changing ```theme``` variable  to ```tranquil-peak```
2. Complete ```theme/tranquil-peak/_config.yml``` with your informations by following directives in comments

#### Archives configuration ####

You can choose the style of listing for archives, category and tag pages by adding this lines in ```_config.yml```  

``` yaml
# Archives
## 1: Enable pagination
## 0: Disable pagination
archive: 2
category: 2
tag: 2
```

- **0** : Disable pagination  
- **1** : Enable pagination  

Example :  
A category page look like this with ```category: 1``` :  
![archives 1](https://hexo-tranquil-peak-demo.herokuapp.com/2013/12/25/gallery-post/archives-1.png)  

The same page with ```category: 0```:  
![archives 0](https://hexo-tranquil-peak-demo.herokuapp.com/2013/12/25/gallery-post/archive-0.png)  

#### Enable RSS feed ####

1. Execute ```npm install hexo-generator-feed --save``` in your Hexo blog folder  
2. Add this lines in ```_config.yml``` :  

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


## Tranquil Peak configuration ##

#### Sidebar configuration ####

The sidebar is powerful and easily configurable.

DON'T modify variables name ```sidebar```, ```title```, ```url``` and ```icon```.  
Others variables name which refer to the name of a menu or a link can be edited. Example : ```menu```, ```home```, ```categories```, etc...  
You can add groups of links and links much as you want  
You just have to respect the indentation : `groups of links` -> `link` -> `title, link, icon`  

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
        about:
            title: About me
            url: /about
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
        #     url: mailto://
        #     icon: envelope-o
    rss:
        rss:
            title: RSS
            url: /atom.xml
            icon: rss
```

- **title** : Title of your link displayed
- **url** : URL of the link. If the URL is internal, domain name is not necessary
- **icon** : Name of the font awesome icon class without the `fa-` (Go to [font-awesome icons](http://fontawesome.io/icons/) to find class name of icon)

#### Author configuration ####

#### Customization ####

#### Miscellaneous ####

## Running ##

3. Run ```hexo server``` and enjoy!