(function() {
  'use strict';

  var fm = require('front-matter');
  var fs = require('fs');
  var path = require('path');
  var async = require('async');

  /**
   * Return an array with all files which don't have an excerpt tag
   * @param {function} cb a callback
   */
  function getInvalidPosts(cb) {
    /**
     * Check that the file have an excerpt tag
     * @param {String} filename
     * @param {function} callback
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
          data = fm(data);
          var content = data.body;
          // search excerpt tag
          if (content && !rExcerpt.test(content)) {
            invalidPosts.push(filename);
          }
          return callback();
        })
      }
    }

    var invalidPosts = [];
    var postsDir = path.resolve(process.cwd(), path.resolve(hexo.config.source_dir, '_tests'));
    // read in posts folder
    fs.readdir(postsDir, function(error, filenames) {
      if (error) {
        return done(error);
      }
      // resolve path for all filenames
      filenames = filenames.map(function(filename) {
        return path.resolve(postsDir, filename);
      });
      // check each files
      async.forEach(filenames, checkFile, function(error) {
        if (error) {
          throw error;
        }
        else {
          filenames.forEach(function(filename) {
            console.log(path.basename(filename));
          });
          console.log(filenames.length + ' post(s) found');
          cb(invalidPosts);
        }
      })
    });
  }

  /**
   * Add `<!-- more -->` tag in each post file which doesn't have an excerpt tag
   * @param {Array} posts an array of filepath
   * @param {function} cb a callback
   */
  function fixInvalidPosts(posts, cb) {

    /**
     * Add `<!-- more -->` tag in the file
     * @param filename
     * @param callback
     */
    function processFile(filename, callback) {
      fs.readFile(filename, 'utf8', function(error, data) {
        if (error) {
          return callback(filename + ' : can\'t access file');
        }
        // regex to search a sentence (japanese, chinese allowed)
        var rSentence = /([.?!。])\s*(?=[A-Z一-龠ぁ-ゔァ-ヴー々〆〤])/;
        // get body of post
        var content = fm(data).body;
        // get index of the first sentence
        var index = content.search(rSentence);
        // insert `<!-- more -->` tag at `index`
        content = content.slice(0, index + 1) + '<!-- more -->' + content.slice(index + 1);
        // erase the old body of post with the new
        data = data.slice(0, data.indexOf(content.slice(0, index))) + content;
        // write the file with the new data
        fs.writeFile(filename, data, function(error) {
          if (error) {
            return callback(filename + ' not found');
          }
          console.log(path.basename(filename) + ' : processed');
          return callback();
        });
      })
    }

    // process each files
    async.forEach(posts, processFile, function(error) {
      if (error) {
        throw error;
      }
      else {
        cb();
      }
    })
  }

  /**
   * Add `<!-- more -->` tag in each post file which doesn't have an excerpt tag
   */
  function autoExcerptMigration(cb) {
    console.log('------------');
    console.log('Checking for posts without `<-- more -->` and `<!-- excerpt -->` tag...');
    console.log('------------');
    getInvalidPosts(function(posts) {
      if (posts.length) {
        console.log('------------');
        console.log('Since auto excerpt feature doesn\'t exist anymore in Tranquilpeak 1.7.0');
        console.log(
          'The \'<!-- more -->\' tag will be inserted at the end of the first ' +
          'sentence of each posts which don\'t have excerpt tag');
        console.log('------------');
        console.log('Processing posts...');
        console.log('------------');
        fixInvalidPosts(posts, function() {
          cb();
        });
      }
      else {
        cb();
      }
    });

  }

  /**
   * Register migrator
   * @param {Array} args
   */
  hexo.extend.migrator.register('1.7.0', function(args) {
    console.log('-> Migration started');
    autoExcerptMigration(function() {
      console.log('-> Migration finished successfully')
    });
  });
})();