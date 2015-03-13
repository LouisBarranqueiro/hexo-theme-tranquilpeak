module.exports = function(grunt){
	grunt.initConfig({
		// Copy all needed files by types
		bower: {
			dev: {
				dest: 'source/assets',
				js_dest: 'source/assets/js',
				css_dest: 'source/assets/css',
				fonts_dest: 'source/assets/fonts',
				options: {
					expand: false,
					keepExpandedHierarchy: false,
					packageSpecific: {
						'fancybox': {
							files: [
								'source/jquery.fancybox.js',
								'source/jquery.fancybox.css',
								'source/helpers/jquery.fancybox-thumbs.css',
								'source/helpers/jquery.fancybox-thumbs.js'
							]
						},
					}
				}
			}
		},
		sass: {
			// Compile tranquil-peak.scss file into tranquil-peak.css
			dev: {
				options: {
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					cwd: 'source/_css',
					src: ['tranquil-peak.scss'],
					dest: 'source/assets/css/',
					ext: '.css'
				}]
			}
		},
		copy: {
			prod: {
				files: [{
					// Copy style.min.css file into prod folder
					expand: true,
					cwd: 'source/.tmp/css',
					src: ['**/*.min.css'],
					dest: 'source/prod/css/'
				}, {
					// Copy script.min.js file into prod folder
					expand: true,
					cwd: 'source/.tmp/js',
					src: ['**/*.min.js'],
					dest: 'source/prod/js/'
				}, {
					// Copy all images into prod folder
					expand: true,
					cwd: 'source/_images',
					src: ['**/*'],
					dest: 'source/prod/images/'
				}, {
					// Copy all fonts into prod folder
					expand: true,
					cwd: 'source/.tmp/fonts',
					src: ['**/*'],
					dest: 'source/prod/fonts/'
				}]
			},
		},
		concat: {
			// Concat css file in style.concat.css
			prodCss: {
				src: ['source/.tmp/css/*.css'],
				dest: 'source/.tmp/css/style.concat.css',
			},
			// Concat js file in script.concat.js
			prodJs: {
				files: {
					'source/.tmp/js/script.js': ['source/_js/**/*.js'],
					'source/.tmp/js/script.concat.js': [
						'source/.tmp/js/jquery.js',
						'source/.tmp/js/jquery.fancybox.js',
						'source/.tmp/js/jquery.fancybox-thumbs.js',
						'source/.tmp/js/script.js'
					]
				},
				options: {
					separator: ';',
				}
			}
		},
		cssmin: {
			// Minify style.concat.css file into style.min.css
			prod: {
				options: {
					relativeTo: ''
				},
				files: [{
					expand: true,
					cwd: 'source/.tmp/css',
					src: ['style.concat.css'],
					dest: 'source/.tmp/css',
					ext: '.min.css'
				}]
			}
		},
		uglify: {
			// Minify script.concat.js file into script.min.js
			prod: {
				options: {
					mangle: {
						except: ['jQuery', 'fancybox']
					}
				},
				files: {
					'source/.tmp/js/script.min.js': ['source/.tmp/js/script.concat.js']
				}
			}
		},
		// Delete .tmp folder
		clean: {
			prod: 'source/.tmp'
		},
		// Watch .scss and .js files in _css and _js folder and launch task : Build
		watch: {
			dev: {
				files: ['source/_css/**/*.scss', 'source/_js/**/*.js'],
				tasks: ['Build']
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('Compile assets', ['bower', 'sass', 'concat', 'cssmin', 'uglify', 'copy']);
	grunt.registerTask('Build', ['Compile assets', 'clean']);
	grunt.registerTask('Watch', ['watch']);

};