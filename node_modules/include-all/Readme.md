# include-all

An easy way to include all node.js modules within a directory.

This is a fork of felixge's awesome module, require-all (https://github.com/felixge/node-require-all) which adds a few extra capabilities:
- the ability to `include-all` a directory as **optional**.
- the ability to recursively stat a directory, instead of actually requiring the modules (via the `dontLoad` option)
- the ability to filter by path, not just filename (pathFilter)


## Usage

```js

var controllers = require('include-all')({
  dirname     :  __dirname + '/controllers',
  filter      :  /(.+Controller)\.js$/,
  excludeDirs :  /^\.(git|svn)$/
});

// controllers now is an object with references to all modules matching the filter
// for example:
// { HomeController: function HomeController(req, res) {...}, ...}


### Optional include
var models = require('include-all')({
  dirname     :  __dirname + '/models',
  filter      :  /(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  optional    :  true
});

// models now is an object with references to all modules matching the filter
// but if __dirname + /models doesn't exist, instead of throwing an error, {} is returned
// for example:
// { User: { attributes: {}, adapter: 'dirty', ...}, ...}
```

### Filter by filepath
var models = require('include-all')({
  dirname     :  __dirname + '/controllers',
  filterPath  :  /(.+)\/(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/
});