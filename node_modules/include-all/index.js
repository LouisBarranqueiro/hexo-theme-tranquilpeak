var fs = require('fs');
var ltrim = require('underscore.string').ltrim;


// Returns false if the directory doesn't exist
module.exports = function requireAll(options) {
  var files;
  var modules = {};

  if (typeof(options.force) == 'undefined') {
    options.force = true;
  }

  // Sane default for `filter` option
  if (!options.filter) {
    options.filter = /(.*)/;
  }

  // Reset our depth counter the first time
  if (typeof options._depth === 'undefined') {
    options._depth = 0;
  }

  // Bail out if our counter has reached the desired depth
  // indicated by the user in options.depth
  if (typeof options.depth !== 'undefined' &&
    options._depth >= options.depth) {
    return;
  }

  // Remember the starting directory
  if (!options.startDirname) {
    options.startDirname = options.dirname;
  }

  try {
    files = fs.readdirSync(options.dirname);
  } catch (e) {
    if (options.optional) return {};
    else throw new Error('Directory not found: ' + options.dirname);
  }

  // Iterate through files in the current directory
  files.forEach(function(file) {
    var filepath = options.dirname + '/' + file;

    // For directories, continue to recursively include modules
    if (fs.statSync(filepath).isDirectory()) {

      // Ignore explicitly excluded directories
      if (excludeDirectory(file)) return;

      // Recursively call requireAll on each child directory
      modules[file] = requireAll({
        dirname: filepath,
        filter: options.filter,
        pathFilter: options.pathFilter,
        excludeDirs: options.excludeDirs,
        startDirname: options.startDirname,
        dontLoad: options.dontLoad,
        markDirectories: options.markDirectories,
        flattenDirectories: options.flattenDirectories,
        keepDirectoryPath: options.keepDirectoryPath,
        force: options.force,

        // Keep track of depth
        _depth: options._depth+1,
        depth: options.depth
      });

      if (options.markDirectories || options.flattenDirectories) {
        modules[file].isDirectory = true;
      }

      if (options.flattenDirectories) {

        modules = (function flattenDirectories(modules, accum, path) {
          accum = accum || {};
          Object.keys(modules).forEach(function(identity) {
            if (typeof(modules[identity]) !== 'object' && typeof(modules[identity]) !== 'function') {
              return;
            }
            if (modules[identity].isDirectory) {
              flattenDirectories(modules[identity], accum, path ? path + '/' + identity : identity );
            } else {
              accum[options.keepDirectoryPath ? (path ? path + '/' + identity : identity) : identity] = modules[identity];
            }
          });
          return accum;
        })(modules);

      }

    }
    // For files, go ahead and add the code to the module map
    else {

      // Key name for module
      var identity;

      // Filename filter
      if (options.filter) {
        var match = file.match(options.filter);
        if (!match) return;
        identity = match[1];
      }

      // Full relative path filter
      if (options.pathFilter) {
        // Peel off relative path
        var path = filepath.replace(options.startDirname, '');

        // make sure a slash exists on the left side of path
        path = '/' + ltrim(path, '/');

        var pathMatch = path.match(options.pathFilter);
        if (!pathMatch) return;
        identity = pathMatch[2];
      }

      // Load module into memory (unless `dontLoad` is true)
      if (options.dontLoad) {
        modules[identity] = true;
      } else {
        if (options.force) {
          var resolved = require.resolve(filepath);
          if (require.cache[resolved]) delete require.cache[resolved];
        }
        modules[identity] = require(filepath);
      }
    }
  });

  // Pass map of modules back to app code
  return modules;

  function excludeDirectory(dirname) {
    return options.excludeDirs && dirname.match(options.excludeDirs);
  }
};