# Tranquil-peak Hexo theme

Author: Louis Barranqueiro
Version: 0.1
Compatibility : Hexo v3.0 or later

## Utilisation (only)

### Installation

1. In your hexo blog folder, execute the command: ```git clone https://github.com/LouisBarranqueiro/tranquil-peak-hexo-theme.git theme/tranquil-peak```
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


### Build the Theme
Development environment:

1. Use:  ```grunt build``` to sync bower dependencies and compile assets and link it to views
2. Use ```grunt watch``` to automatically re-build the project after change on assets

Production environment (before deploy your blog):

1. Use: ```grunt buildProd``` to build the project with some optimization (concat and minify)

Look into the code for more details about grunt tasks

# Licence
