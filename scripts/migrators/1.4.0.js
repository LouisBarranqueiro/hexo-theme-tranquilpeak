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
  var sourceDir = path.resolve(process.cwd(), hexo.config.source_dir);
  
  /**
   * Return an array with all files which don't have an excerpt tag
   * @param {String} dir a directory name
   * @param {String} date a date format YYYY-MM-DD
   * @param {function} cb a callback
   * @return {void}
   */
  function searchPostsWithoutExcerpt(dir, date, cb) {
    var postsDir = path.resolve(sourceDir, dir);
    
    /**
     * Check that the file have an excerpt tag
     * @param {String} filename
     * @param {function} callback
     * @return {function} callback
     */
    function checkFile(filename, callback) {
      var rExcerpt = /(?:<!-- ?more ?-->|<!-- ?excerpt ?-->)/;
      var rFilename = /.md$/;
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
          // parse post (front-matter and content)
          data = frontMatter.parse(data);
          // parse post date
          var postDate = moment(data.date).format('YYYY-MM-DD');
          // search excerpt tag
          if (data._content && !rExcerpt.test(data._content) &&
            date.isSameOrAfter(postDate)) {
            invalidPosts.push(filename);
          }
          return callback();
        });
      }
    }
    
    var invalidPosts = [];
    // parse date (user input)
    date = moment(date);
    // read in posts folder
    fs.readdir(postsDir, function(error, filenames) {
      if (error) {
        return done(error);
      }
      // resolve path for all filenames
      filenames = filenames.map(function(filename) {
        return path.resolve(postsDir, filename);
      });
      console.log(
        'Checking for posts without `<-- more -->` ' +
        'and `<!-- excerpt -->` tag...');
      console.log('------------');
      // check each files
      async.forEach(filenames, checkFile, function(error) {
        if (error) {
          throw error;
        }
        // display all invalid posts name
        invalidPosts.forEach(function(post) {
          console.log(path.basename(post));
        });
        console.log(invalidPosts.length + ' post(s) found');
        cb(invalidPosts);
      })
    });
  }
  
  /**
   * Add `<!-- excerpt -->` tag in each post file
   * which doesn't have an excerpt tag
   * @param {Array} posts an array of filepath
   * @param {function} cb a callback
   * @return {void}
   */
  function fixPostsWithoutExcerpt(posts, cb) {
    var migrationDir = path.resolve(sourceDir, '_migrated_posts');
    
    /**
     * Add `<!-- excerpt -->` tag in the file
     * @param {String} filename
     * @param {function} callback
     * @return {function} callback
     */
    function processFile(filename, callback) {
      
      /**
       * Clean a string - render markdown and remove HTML tags
       * @param {String} str
       * @returns {String}
       */
      function clean(str) {
        var reHtmlTags = /<\/?[^>]+(>|$)/g;
        return marked(str.trim()).replace(reHtmlTags, '');
      }
      
      fs.readFile(filename, 'utf8', function(error, data) {
        if (error) {
          return callback(filename + ' : can\'t access file');
        }
        // update filename with new path (migration directory)
        var newFilename = path.resolve(migrationDir, path.basename(filename));
        // parse data
        var post = frontMatter.parse(data);
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
        // write the file with the new data
        fs.writeFile(newFilename, data, function(error) {
          if (error) {
            return callback(error);
          }
          console.log(path.basename(filename) + ' : processed');
          return callback();
        });
      });
    }
    
    // create migration directory or use existing
    mkdirp(migrationDir, function(error) {
      if (error) {
        console.log(
          'failed to create ' + path.basename(migrationDir) +
          ' directory');
        throw error;
      }
      console.log('------------');
      console.log(path.basename(migrationDir) + ' directory created');
      console.log('------------');
      console.log('Processing posts...');
      console.log('------------');
      // process each files
      async.forEach(posts, processFile, function(error) {
        if (error) {
          throw error;
        }
        cb();
      });
    });
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
    var reYes = /^y(?:es)?$/i;
    var yesSchema = {
      description: '(Y/n)',
      type: 'string',
      pattern: /^(y(?:es)?|n(?:o)?)$/i,
      message: '(Y/n)',
      hidden: false,
      default: 'y',
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
      'Auto excerpt feature doesn\'t exist anymore ' +
      'since Tranquilpeak 1.4.0');
    console.log(
      'To overcome this, the \'<!-- excerpt -->\' tag will be inserted at ' +
      'the end of the first sentence of each posts which don\'t have ' +
      'excerpt tag');
    console.log(
      'Provide the date of your last post written with ' +
      'Tranquilpeak < v1.4.0');
    console.log('------------');
    // ask posts directory and date
    prompt.get([postsDirSchema, dateSchema], function(error, data) {
      searchPostsWithoutExcerpt(data.postsDir, data.date, function(posts) {
        if (posts.length) {
          // ask yes or no
          prompt.get(yesSchema, function(error, data) {
            if (reYes.test(data.question)) {
              fixPostsWithoutExcerpt(posts, function() {
                cb();
              });
            }
            else {
              cb();
            }
          });
        }
        else {
          cb();
        }
      });
    });
  }
  
  /**
   * Register 1.4.0 migrator
   * @param {Array} args
   */
  hexo.extend.migrator.register('1.4.0', function(args) {
    console.log('-> Migration started');
    prompt.start();
    autoExcerptMigration(function() {
      console.log('------------');
      console.log('-> Migration finished')
    });
  });
})();