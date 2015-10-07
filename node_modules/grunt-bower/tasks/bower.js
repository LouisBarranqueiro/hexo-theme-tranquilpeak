/*
 * grunt-bower
 * https://github.com/curist/grunt-bower
 *
 * Copyright (c) 2012 curist
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  var task_name = 'bower';
  var task_desc = 'Copy bower installed components to dist folder.';
  var _ = grunt.utils ? grunt.utils._ : grunt.util._;
  var path = require('path');
  var bower = require('bower');
  var log = grunt.log.write;
  var helpers = require('./lib/helpers').init(grunt);

  grunt.registerMultiTask(task_name, task_desc, function() {
    var done = this.async();
    var targets = (this.file) ? [this.file] : this.files;
    var options = this.data.options || {};
    var stripAffix = options.stripJsAffix || options.stripAffix;
    var copyOptions = {
        process: options.process || null
    };
      
    bower.commands.list({paths: true, relative: false})
      .on('end',  function (data) {
        _(data).each(function(lib_path, lib_name) {
          var dest_file_path;
          var src_paths = helpers.getLibFilenames(
            lib_path,
            bower.config.directory,
            lib_name
          );

          try {
            if(options.ignorePackages) {
              if(!Array.isArray(options.ignorePackages)) {
                throw "`ignorePackages` is not an array";
              }
              if(options.ignorePackages.indexOf(lib_name) != -1) {
                return;
              }
            }

            if(src_paths.length == 0) {
              throw "no files";
            }

            targets.forEach(function(target) {
              var dest = target.dest || path.join('public', 'scripts' ,'vendor');
              var dest_file_name;

              var dests = helpers.getDests(target);

              var package_dest = '';
              var package_dests = {};
              var package_opt = options.packageSpecific &&
                options.packageSpecific[lib_name];
              var strip_glob_base = false;
              var relative_glob_expanded_path = {};

              if(package_opt) {
                strip_glob_base = typeof package_opt.stripGlobBase !== 'undefined'
                    ? package_opt.stripGlobBase : options.stripGlobBase;
                package_dest = package_opt.dest;
                package_dests = helpers.getDests(package_opt);

                if(_(package_opt.files).isArray()) {
                  // FIXME src_paths should be concat with the original src_paths
                  src_paths = _(package_opt.files).reduce(function(p, file) {
                    var full_path = path.join(bower.config.directory, lib_name, file);
                    if(/\*/.test(file)) {
                      // var glob_base = path.join(bower.config.directory, lib_name, file.replace(/\*.*$/, ''));
                      // var glob_pattern = file.replace(/^[^\*]*/,'');
                      var expanded_paths = grunt.file.expand({filter: 'isFile'}, full_path);

                      if(strip_glob_base) {
                        var glob_base = path.join(bower.config.directory, lib_name, file.replace(/\*.*$/, ''));
                        var glob_base_re = new RegExp('^' + glob_base);
                        expanded_paths.forEach(function(expanded_path) {
                          var relatie_path = expanded_path.replace(glob_base_re, '');
                          relative_glob_expanded_path[expanded_path] = relatie_path;
                        });
                      }
                      return p.concat(expanded_paths);

                    } else {
                      return p.concat(full_path);
                    }
                  }, []);
                }
              }

              // check if we want to strip file type affix in lib_name
              var ext = src_paths[0].split('.').pop()
              if(stripAffix) {
                var regexp = new RegExp("\\W?" + ext + "$");
                dest_file_name = lib_name.replace(regexp, '') + '.' + ext;
              } else {
                dest_file_name = lib_name + '.' + ext;
              }

              var expanded_dir = '', file_name, ext_name, dest_dir;
              var flatten =
                (package_opt && typeof package_opt.keepExpandedHierarchy != 'undefined')
                ? !package_opt.keepExpandedHierarchy
                : options.keepExpandedHierarchy === false;

              if(!flatten) {
                expanded_dir = grunt.file.expand(path.join(bower.config.directory, lib_name)).shift();
              }

              _(src_paths).chain().map(function(src_path) {
                return grunt.file.expand(src_path);
              }).flatten().map(function(src_path) {
                var baseDirRegex = new RegExp(bower.config.cwd.replace(/\\/g,'[\\\/]') + '/?');
                return src_path.replace(baseDirRegex, '');
              }).each(function(src_path) {

                if (!flatten && expanded_dir && src_path.indexOf(expanded_dir) > -1) {
                  file_name = src_path.replace(expanded_dir, '');
                } else {
                  file_name = src_path.split(/[\\\/]/).pop();
                }
                ext_name = file_name.split('.').pop();
                dest_dir = package_dests[ext_name] ||
                  dests[ext_name] || package_dest || dest;

                dest_file_path = path.join(
                  dest_dir,
                  options.expand ? lib_name : '',
                  (!flatten && strip_glob_base) ? relative_glob_expanded_path[src_path] : file_name
                );

                try{
                  if (file_name && grunt.file.isDir(src_path)) {
                    if (!flatten && !expanded_dir) {
                      expanded_dir = src_path;
                    } else if (!flatten && src_path.indexOf(expanded_dir) == -1) {
                      expanded_dir = '';
                    }
                  } else if (file_name) {
                    grunt.file.copy(src_path, dest_file_path, copyOptions);
                    log(dest_file_path.cyan + ' copied.\n');
                  }
                } catch(e) {
                  log(('Fail to copy ').red +
                      src_path.yellow + (' for ').red +
                      lib_name.yellow + ('!\n').red);
                }
              });
            });
          } catch (err) {
            log(('Fail to copy lib file for ' + lib_name + '!\n').red);
          }
        });
        done();
      })
      .on('error', function (err) {
        grunt.fail.warn(err);
      });
  });
};
