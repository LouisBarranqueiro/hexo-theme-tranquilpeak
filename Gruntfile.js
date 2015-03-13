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
		concat: {
			// Concat all .js file into tranquil-peak.js
			devJs: {
				src: ['source/_js/**/*.js'],
				dest: 'source/assets/js/tranquil-peak.js',
				options: {
					separator: ';',
				}
			},
			// Concat all .css file into style.css
			prodCss: {
				src: ['source/assets/css/*.css'],
				dest: 'source/assets/css/style.css',
			},
			// Concat all .js file in script.js
			prodJs: {
				src: JsFilesToInject,
				dest: 'source/assets/js/script.js',
				options: {
					separator: ';',
				}
			}
		},
		cssmin: {
			// Minify style.css file into style.min.css
			prod: {
				files: [{
					expand: true,
					cwd: 'source/assets/css',
					src: ['style.css'],
					dest: 'source/assets/css',
					ext: '.min.css'
				}]
			}
		},
		uglify: {
			// Minify script.js file into script.min.js
			prod: {
				options: {
					mangle: {
						except: ['jQuery', 'fancybox']
					}
				},
				files: {
					'source/assets/js/script.min.js': ['source/assets/js/script.js']
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