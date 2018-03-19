# Contributing #

[![Join the chat at https://gitter.im/LouisBarranqueiro/hexo-theme-tranquilpeak](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/LouisBarranqueiro/hexo-theme-tranquilpeak?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

All kinds of contributions (enhancements, features, documentation & code improvements, bugs reporting) are welcome.

## Code style ##

### Javascript

We use [ESLint](http://eslint.org) based on Google code style to maintain code style.  
Check code status with :
``` bash
npm run lint
```

## Pull requests ##

All pull requests must be done on the **dev** branch.

Before a pull request :

 - There is no tests yet so verify that your code is running well. Blog generation (`hexo g`) must not outputs errors
 - Check code style with eslint.
 - Don't forget to update the documentation if it's necessary
 
