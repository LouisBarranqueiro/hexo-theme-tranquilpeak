(function() {
  'use strict';
  
  var fm = require('front-matter');
  var fs = require('fs');
  var path = require('path');
  var async = require('async');
  var prompt = require('prompt');
  var moment = require('moment');
  
  /**
   * Return an array with all files which don't have an excerpt tag
   * @param {function} cb a callback
   */
  function searchInvalidPosts(date, cb) {
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
        fs.readFile(filename, 'utf8', function(error, post) {
          if (error) {
            console.log(filename + ' not found');
            return callback(error);
          }
          // parse post (front-matter and body)
          post = fm(post);
          // parse post date
          var postDate = moment(post.attributes.date).format('YYYY-MM-DD');
          // search excerpt tag
          if (post.body && !rExcerpt.test(post.body) &&
            date.isSameOrAfter(postDate)) {
            invalidPosts.push(filename);
          }
          return callback();
        });
      }
    }
    
    var invalidPosts = [];
    var postsDir = path.resolve(process.cwd(), path.resolve(hexo.config.source_dir, '_tests'));

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
      cb();
    })
  }
  
  /**
   * Add `<!-- more -->` tag in each post file which doesn't have an excerpt tag
   */
  function autoExcerptMigration(cb) {
    var date = {
      description: 'Enter a date',
      type: 'string',
      pattern: /^\d{4}-\d{2}-\d{2}$/,
      message: 'date format (YYYY-MM-DD)',
      hidden: false,
      required: true
    };
    
    console.log('------------');
    console.log('Auto excerpt feature doesn\'t exist anymore since Tranquilpeak 1.4.0');
    console.log(
      'To overcome this, the \'<!-- more -->\' tag will be inserted at the end of the first ' +
      'sentence of each posts which don\'t have excerpt tag');
    console.log('Provide the date of your last post written with Tranquilpeak < v1.4.0');
    console.log('------------');
    // ask a date
    prompt.get(date, function(error, data) {
      console.log('Checking for posts without `<-- more -->` and `<!-- excerpt -->` tag...');
      console.log('------------');
      searchInvalidPosts(data.question, function(posts) {
        if (posts.length) {
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
    });
    
  }
  
  /**
   * Register migrator
   * @param {Array} args
   */
  hexo.extend.migrator.register('1.7.0', function(args) {
    console.log('-> Migration started');
    prompt.start();
    autoExcerptMigration(function() {
      console.log('------------');
      console.log('-> Migration finished')
    });
  });
})();