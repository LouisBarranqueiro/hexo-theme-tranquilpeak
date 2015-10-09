# Grunt-sync

A [grunt](http://github.com/gruntjs/grunt/) task to keep directories in sync.
It is very similar to [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy) but
tries to copy only those files that has actually changed.

## Usage

```bash
npm install grunt-sync --save
```

Within your grunt file:

```javascript
grunt.initConfig({

sync: {
main: {
files: [{
  cwd: 'src',
  src: [
    '**', /* Include everything */
    '!**/*.txt' /* but exclude txt files */
  ],
  dest: 'bin',
}],
pretend: true, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
verbose: true // Display log messages when copying files
}
}

});

grunt.loadNpmTasks('grunt-sync');
grunt.registerTask('default', 'sync');
```

## More examples
```javascript
sync: {
  main: {
    files: [
      {src: ['path/**'], dest: 'dest/'}, // includes files in path and its subdirs
      {cwd: 'path/', src: ['**/*.js', '**/*.css'], dest: 'dest/'}, // makes all src relative to cwd
    ],
    verbose: true, // Default: false
    pretend: true, // Don't do any disk operations - just write log. Default: false
    failOnError: true, // Fail the task when copying is not possible. Default: false
    ignoreInDest: "**/*.js", // Never remove js files from destination. Default: none
    updateAndDelete: true // Remove all files from dest that are not found in src. Default: false

  }
}
```

## Installation
```
npm install grunt-sync --save
```

## How it works?
In the first phase the plugin compares modification times of files in `src` and `dest`. It only copies files with newer modification time. Second phase deletes files that exists in `dest` but have not been found in `src`.

Details:

1. [1st phase] Read modification time of all files in `src`.
1. [1] Overwrite destination if modification time is newer or destination is directory not file.
1. [2nd phase] Read all files in `dest` and calculate difference between files in destination and source files.
1. [2] Delete all files (and directories) that have been found in `dest` but are not found `src` excluding ignored files.


## Changelog
* 0.2.4 - `failOnError` option
* 0.2.3 - Fixed issue with files defined as array when using `updateAndDelete`.
* 0.2.2 - Fixed issue with `updateAndDelete` when source patterns matches only files.
* 0.2.1 - Fixed grunt Compact Format.
* 0.2.0 - Default configuration will not remove any files any more. You have to specify `updateAndDelete` option to remove any files from destination.
* 0.1.2 - Deleting all files in destination on Windows solved.
* 0.1.1 - Fixed issue with trailing slash in destination.
* 0.1.0 - Files missing that are not in `src` are deleted from `dest` (unless you specify `updateOnly`)

## Migration 0.1.x -> 0.2.x
In version 0.2 you have to explicitly specify that you want the plugin to remove files from destination. See `updateAndDelete` option and run with `pretend:true` first to make sure that it doesn't remove any crucial files. You can tune what files should be left untouched with `ignoreInDest` property.

If you have `updateOnly:true` in your 0.1 config you can remove this option. For those who used `updateOnly:false` you have to include `updateAndDelete:true` in 0.2 config to keep the same behavior.

## TODO

* Research if it's possible to have better integration with `grunt-contrib-watch` - update only changed files instead of scanning everything.
* Some tests for common problems
* Some tests to assure performance
* Rewrite `updateAndDelete` in more elegant way (maybe use patterns from source?)
