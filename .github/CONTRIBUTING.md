# Contributing #

[![Join the chat at https://gitter.im/LouisBarranqueiro/hexo-theme-tranquilpeak](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/LouisBarranqueiro/hexo-theme-tranquilpeak?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

All kinds of contributions (enhancements, new features, documentation & code improvements, issues & bugs reporting) are welcome.

## Code style ##

### Javascript

We use [ESLint](http://eslint.org) based on Google code style to maintain code style.  
Check code status with :
``` bash
npm run lint
# or
grunt eslint
```

## Issues ##

When you create an issue to report a bug or ask a question, please include your :

 - Operating system with version
 - Node version
 - Hexo version
 - Hexo-cli version
 - Tranquilpeak version

and all others related information that are susceptible to help us.

## Pull requests ##

All pull requests must be done on the **dev** branch.

Before a pull request :

 - There is no tests yet so verify that your code is running well. Blog generation (`hexo g`) must not outputs errors
 - Check code style with eslint.
 - Don't forget to update user and/or developer documentation if it's necessary
 
