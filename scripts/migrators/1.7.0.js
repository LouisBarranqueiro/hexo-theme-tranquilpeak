(function() {
  'use strict';

  var fm = require('front-matter');
  var fs = require('fs');
  var path = require('path');
  var async = require('async');

  var postsDir = path.resolve(process.cwd(), path.resolve(hexo.config.source_dir, '_tests'));
  var rExcerpt = /(?:<!-- ?more ?-->|<!-- ?excerpt ?-->)/;
  var rFilename = /.md$/;

  /**
   * Return an array with all file which doesn't have excerpt tag
   * @param _callback
   */
  function getInvalidPosts(_callback) {
    /**
     * Open, read, check that the file have an excerpt tag
     * @param filename
     * @param callback
     */
    function readFile(filename, callback) {
      var filepath = path.resolve(postsDir, filename);
      if (rFilename.test(filename)) {
        fs.readFile(filepath, 'utf8', function(error, data) {
          if (error) {
            console.log(filename + ' not found');
            return callback(error);
          }
          data = fm(data);
          var content = data.body;
          if (!rExcerpt.test(content)) {
            invalidPosts.push(filepath);
          }
          return callback();
        })
      }
    }

    var invalidPosts = [];
    fs.readdir(postsDir, function(error, filenames) {
      if (error) {
        return done(error);
      }
      // read each files
      async.forEach(filenames, readFile, function(error) {
        if (error) {
          throw error;
        }
        else {
          _callback(invalidPosts);
        }
      })
    });
  }

  /**
   * Add `<!-- more -->` tag in each post file which doesn't have an excerpt tag
   * @param posts
   * @param _callback
   */
  function fixInvalidPosts(posts, _callback) {

    /**
     * Open, read and add `<!-- more -->` tag in the file
     * @param filename
     * @param callback
     */
    function processFile(filename, callback) {
      if (rFilename.test(filename)) {
        fs.readFile(filename, 'utf8', function(error, data) {
          if (error) {
            return callback(filename + ' : can\'t access file');
          }
          var rSentence = /([.?!。])\s*(?=[A-Z一-龠ぁ-ゔァ-ヴー々〆〤])/;
          var content = fm(data).body;
          var index = content.search(rSentence);
          content = content.slice(0, index + 1) + '<!-- more -->' + content.slice(index + 1);
          data = data.slice(0, data.indexOf(content.slice(0, index))) + content;
          fs.writeFile(filename, data, function(error) {
            if (error) {
              return callback(filename + ' not found');
            }
            console.log(path.basename(filename) + ' : processed');
            return callback();
          });
        })
      }
    }

    async.forEach(posts, processFile, function(error) {
      if (error) {
        throw error;
      }
      else {
        _callback();
      }
    })
  }

  /**
   * Tranquilpeak 1.7.0 migrator
   * Add `<!-- more -->` tag in each post file which doesn't have an excerpt tag
   * @param args
   */
  function migrator(args) {
    console.log('-> Migration started');
    console.log('Checking for posts without `<-- more -->` and `<!-- excerpt -->` tag...');
    getInvalidPosts(function(posts) {
      console.log(posts.length + ' post(s) found');
      if (posts.length) {
        console.log('Since auto excerpt feature doesn\'t exist anymore in Tranquilpeak 1.7.0');
        console.log('The \'<!-- more -->\' tag will be inserted at the end of the first sentence of each posts which don\'t have excerpt tag');
        fixInvalidPosts(posts, function() {
          console.log('-> Migration finished successfully')
        });
      }
      else {
        console.log('-> Migration finished successfully')
      }
    });

  }

  /**
   * Register migrator
   */
  hexo.extend.migrator.register('1.7.0', migrator);
})();