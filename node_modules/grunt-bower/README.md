# grunt-bower

Copy bower installed components to dist folder.

## Getting Started
Install this grunt plugin next to your project's [Gruntfile.js][getting_started] with: `npm install grunt-bower`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-bower');
```

[grunt]: http://gruntjs.com/
[getting_started]: http://gruntjs.com/getting-started

## Documentation
To your [Gruntfile.js][getting_started], add:

```javascript
bower: {
  dev: {
    dest: 'dest/path'
  }
}
```

Add **stripAffix** option if you'd like to have lib names with its file type affix to be stripped, things like `/\.js$/`, `/js$/` or `/\.css$/` etc.:

```javascript
bower: {
  dev: {
    dest: 'dest/path',
    options: {
      stripAffix: true
    }
  }
}
```

`stripAffix` could cause name confliction, use with caution!
If you were using `grunt-bower` prior to v0.9.0, `stripJsAffix` is now an alias to `stripAffix` option.

If you want to assign different destination folder for other file types:

```javascript
bower: {
  dev: {
    dest: 'dest/',
    js_dest: 'dest/js',
    css_dest: 'dest/styles'
  }
}
```

File types without a `[file_type]_dest` will go to `dest` folder.

**Note**: `fonts_dest` is a special case, `svg`, `eot`, `ttf`, `woff`, `woff2`, `otf`, are all covered by `fonts_dest` for convenience.

If you want to have more specific `dest` options for certain packages:

```javascript
bower: {
  dev: {
    dest: 'public/',
    css_dest: 'public/styles',
    options: {
      packageSpecific: {
        bootstrap: {
          dest: 'public/fonts',
          css_dest: 'public/css/bootstrap'
        }
      }
    }
  }
}
```

If `grunt-bower` not copying the files you want:

```javascript
bower: {
  dev: {
    dest: 'public/',
    options: {
      packageSpecific: {
        'typeahead.js': {
          files: [
            "dist/typeahead.bundle.js"
          ]
        }
      }
    }
  }
}
```

You can ignore some packages if you don't want them to be copied:

```javascript
bower: {
  dev: {
    dest: 'public/',
    options: {
      ignorePackages: ['jquery']
    }
  }
}
```

If you want the exported files to be organized by package, use `expand` option. For example, such config will result in the file structure like this:

```javascript
bower: {
  dev: {
    dest: 'public/vendor/',
    options: {
      expand: true
    }
  }
}
```
```
/public
  /vendor
    /package1
      package1_file1.js
      package1_file2.js
      package1.css
    /package2
      package2.js
      package2.css
```

Or organized by file type in addition:

```javascript
bower: {
  dev: {
    dest: 'public/',
    js_dest: 'public/js/'
    css_dest: 'public/css/',
    fonts_dest: 'public/fonts/', //covers font types ['svg','eot', 'ttf', 'woff', 'woff2', 'otf']
    options: {
      expand: true
    }
  }
}
```
```
/public
  /js
    /package1
      package1_file1.js
      package1_file2.js
    /package2
      package2.js
  /css
    /package1
      package1.css
    /package2
      package2.css
```

For file path expansion (globbing):
```javascript
bower: {
  dev: {
    options: {
      packageSpecific: {
        'jquery-ui': {
          keepExpandedHierarchy: true,
          stripGlobBase: true,
          files: [
            'ui/minified/jquery-ui.min.js',
            'themes/base/minified/**'
          ]
        }
      }
    }
  }
}
```

`keepExpandedHierarchy` default to true (for all dependencies), you have to explicitly set it to `false` if you want a flattened output structure.  
Set `stripGlobBase` to true if you only want to keep the expanded part in the globbing pattern. If you want flattening for all packages do:

```javascript
bower: {
  dev: {
    options: {
      keepExpandedHierarchy: false
    }
  }
}
```

#### process option
Type: `Function(content, srcpath)`

This option is passed to `grunt.file.copy` as an advanced way to control the file contents that are copied.


```javascript
bower: {
  dev: {
    options: {
      process: function (content, srcpath) {
        return content.replace(/[sad ]/g,"_");
      },
    },
  },
},
```

## Change Logs
[Check here.](https://github.com/curist/grunt-bower/blob/master/CHANGELOG.md)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].


## License
Copyright (c) 2012 curist
Licensed under the MIT license.
