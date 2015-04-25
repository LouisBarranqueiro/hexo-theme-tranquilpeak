# Tranquil-peak Hexo theme

Version: 1.0.0  
Compatibility : Hexo v3.0.0 or later  

# Demo 

Check this beautiful theme in live : [hexo-tranquil-peak-demo.herokuapp.com](http://hexo-tranquil-peak-demo.herokuapp.com)

## Utilisation (only)

### Installation

1. Download the latest version ready for production here : [tranquil-peak-hexo-theme-v1.0.0-production](https://github.com/LouisBarranqueiro/tranquil-peak-hexo-theme/releases/download/v1.0.0/tranquil-peak-hexo-theme-v1.0.0-production.zip)
2. Modify the theme in ```_config.yml``` by changing ```theme``` variable  to ```tranquil-peak```
3. Complete ```theme/tranquil-peak/_config.yml``` with your informations by following directives in comments
4. Run ```hexo server``` and enjoy!

## Development

### Requirements

- [node](https://nodejs.org) v0.10.35 or later

### Installation

1. Install npm dependencies: ```npm install```
2. Install Grunt: ```npm install grunt -g```
3. Install Bower: ```npm install bower -g```
4. Install bower dependencies ```bower install```


### Build

Development environment:

1. Use:  ```grunt build``` to sync bower dependencies and compile assets and link it to views
2. Use ```grunt watch``` to automatically re-build the project after change on assets

Production environment (before deploy your blog):

1. Use: ```grunt buildProd``` to build the project with some optimization (concat and minify)

Look into the code for more details about grunt tasks

# Licence

tranquil-peak-hexo-theme is released under the terms of the MIT license.