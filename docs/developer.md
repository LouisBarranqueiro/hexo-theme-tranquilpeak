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
  
To build and modify the theme, you have to execute : ```cd themes/tranquil-peak```  and install :
1. npm dependencies : ```npm install```. Install dependencies listed in ```package.json```
2. Grunt : ```npm install grunt -g```. Install Grunt globally
3. Bower : ```npm install bower -g```. Install Bower globally
4. bower dependencies : ```bower install```. Install dependencies listed in ```bower.json```

## Code structure ##

## Build theme ##

### Grunt tasks ###

Development environment:  
1. Use:  ```grunt build``` to sync bower dependencies and compile assets and link it to views
2. Use ```grunt watch``` to automatically re-build the project after change on assets

Production environment (before deploy your blog):  
1. Use: ```grunt buildProd``` to build the project with some optimization (concat and minify)