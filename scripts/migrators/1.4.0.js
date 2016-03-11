(function() {
  'use strict';

  var fs = require('fs');
  var path = require('path');
  var async = require('async');
  var prompt = require('prompt');
  var moment = require('moment');
  var mkdirp = require('mkdirp');
  var marked = require('marked');
  var frontMatter = require('hexo-front-matter');

  /**
   * Return an array with all files which don't have an excerpt tag
   * @param {String} dir a directory name
   * @param {String} date a date format YYYY-MM-DD
   * @param {function} cb a callback
   * @return {void}
   */
  function migratePostsWithoutExcerpt(dir, date, cb) {
    var sourceDir = path.resolve(process.cwd(), hexo.config.source_dir);
    var postsDir = path.resolve(sourceDir, dir);
    var migrationDir = path.resolve(sourceDir, '_1.4.0_migrated_posts');

    /**
     * Check that the file have an excerpt tag
     * @param {String} filename
     * @param {function} callback
     * @return {function} callback
     */
    function processFile(filename, callback) {
      var rExcerpt = /(?:<!-- ?more ?-->|<!-- ?excerpt ?-->)/;
      var rFilename = /.md$/;

      /**
       * Clean a string - render markdown and remove HTML tags
       * @param {String} str
       * @returns {String}
       */
      function clean(str) {
        var reHtmlTags = /<\/?[^>]+(>|$)/g;
        return marked(str.trim()).replace(reHtmlTags, '');
      }

      /**
       * Check if a post have a correct structure (front-matter and body)
       * @param {String} data content of a post file
       * @return {Boolean} false: malformed, true: well formed
       */
      function postIsWellFormed(data) {
        var reFrontMatter = /^(-{3,}|;{3,})\n([\s\S]+?)\n\1(?:$|\n([\s\S]*)$)/;
        var reFrontMatterNew = /^([\s\S]+?)\n(-{3,}|;{3,})(?:$|\n([\s\S]*)$)/;
        return reFrontMatter.test(data) || reFrontMatterNew.test(data);
      }

      /**
       * Insert excerpt in data
       * @param {String} data file content
       * @param {Object} post post content parsed with hexo-front-matter
       * @return {String} data data updated
       */
      function insertExcerpt(data, post) {
        // clean post content (render markdown and remove html tags)
        var content = clean(post._content);
        // get index of the first end of line
        var index = content.search('\n');
        // insert `<!-- excerpt -->` tag at `index`
        var excerpt = content.substr(0, index + 1) + '<!-- excerpt -->\n';
        // redefine content with the original content
        content = post._content;
        // insert excerpt between front-matter and content
        data = data.slice(0, data.indexOf(content.substr(0, 80)));
        data += excerpt;
        data += content;
        return data;
      }

      // check that file is a markdown file
      if (rFilename.test(filename)) {
        fs.readFile(filename, 'utf8', function(error, data) {
          if (error) {
            console.log(filename + ' not found');
            return callback(error);
          }
          // check if post is well formed
          if (!postIsWellFormed(data)) {
            return callback(
              filename + ' : malformed. Can\'t parse it. ' +
              'Check its structure.');
          }
          // parse data (front-matter and content)
          var post = frontMatter.parse(data);
          // parse post date
          var postDate = moment(post.date).format('YYYY-MM-DD');
          // update filename with new path (migration directory)
          var newFilename = path.resolve(migrationDir, path.basename(filename));
          // insert excerpt
          if (post._content && !rExcerpt.test(post._content) &&
            date.isSameOrAfter(postDate)) {
            console.log(path.basename(filename) + ' : fixed');
            data = insertExcerpt(data, post);
          }
          // write the file
          fs.writeFile(newFilename, data, function(error) {
            if (error) {
              throw error;
            }
            console.log(path.basename(filename) + ' : copied');
            return callback();
          });
        });
      }
    }

    // parse date (user input)
    date = moment(date);
    // read in posts folder
    fs.readdir(postsDir, function(error, filenames) {
      if (error) {
        throw error;
      }
      // resolve path for all filenames
      filenames = filenames.map(function(filename) {
        return path.resolve(postsDir, filename);
      });
      console.log(
        '-> Checking for posts without `<-- more -->` ' +
        'and `<!-- excerpt -->` tag...');
      console.log('------------');
      // create migration directory or use existing
      mkdirp(migrationDir, function(error) {
        if (error) {
          console.log(
            '-> Failed to create ' + path.basename(migrationDir) +
            ' directory');
          throw error;
        }
        console.log('-> ' + path.basename(migrationDir) + ' directory created');
        console.log('------------');
        // process each files
        async.forEach(filenames, processFile, function(error) {
          if (error) {
            throw error;
          }
          cb(postsDir, migrationDir);
        });
      });
    });
  }

  /**
   * Rename posts and migration directory
   * @param {String} postsDir
   * @param {String} migrationDir
   * @param {function} cb
   * @return {void}
   */
  function renamePostsDir(postsDir, migrationDir, cb) {
    var oldPostsDir = path.normalize(postsDir + '/../_1.4.0_old' + path.basename(postsDir));
    console.log('------------');
    console.log(
      '-> Renaming \'' + path.basename(postsDir) + '\' ' +
      'in \'' + path.basename(oldPostsDir) + '\'');
    fs.renameSync(postsDir, oldPostsDir);
    console.log('-> Renamed complete');
    console.log(
      '-> Renaming \'' + path.basename(migrationDir) + '\' ' +
      'in \'' + path.basename(postsDir) + '\'');
    fs.renameSync(migrationDir, postsDir);
    console.log('-> Renamed complete');
    cb();
  }

  /**
   * Add `<!-- excerpt -->` tag in each post file
   * which doesn't have an excerpt tag
   * @param {function} cb
   * @return {void}
   */
  function autoExcerptMigration(cb) {
    var dateSchema = {
      name: 'date',
      description: 'Enter a date',
      type: 'string',
      pattern: /^\d{4}-\d{2}-\d{2}$/,
      message: 'date format (YYYY-MM-DD)',
      hidden: false,
      required: true
    };
    var postsDirSchema = {
      name: 'postsDir',
      description: 'Enter your post folder',
      type: 'string',
      hidden: false,
      default: '_posts',
      required: true
    };
    console.log('------------');
    console.log(
      '-> Auto excerpt feature doesn\'t exist anymore ' +
      'since Tranquilpeak 1.4.0');
    console.log(
      '-> To overcome this, the \'<!-- excerpt -->\' tag will be inserted at ' +
      'the end of the first line of each posts which don\'t have ' +
      'excerpt tag');
    console.log(
      '-> Provide the name of your posts directory and the date of your ' +
      'last post written with Tranquilpeak < v1.4.0');
    console.log('------------');
    // ask posts directory and date
    prompt.get([postsDirSchema, dateSchema], function(error, data) {
      console.time('-> Migration executed in ');
      migratePostsWithoutExcerpt(data.postsDir, data.date, function(postDir, migrationDir) {
        renamePostsDir(postDir, migrationDir, function() {
          cb();
        });
      });
    });
  }

  /**
   * Register 1.4.0 migrator
   * @param {Array} args
   */
  hexo.extend.migrator.register('1.4.0', function() {
    console.log('-> Migration started');
    prompt.start();
    autoExcerptMigration(function() {
      console.log('------------');
      console.timeEnd('-> Migration executed in ');
    });
  });
})();
