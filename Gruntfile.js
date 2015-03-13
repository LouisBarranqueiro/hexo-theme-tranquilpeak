// Js files to inject in 'layout/_partial/script.ejs'
var JsFilesToInject = [
	'source/assets/js/jquery.js',
	'source/assets/js/jquery.fancybox.js',
	'source/assets/js/jquery.fancybox-thumbs.js',
	'source/assets/js/tranquil-peak.js'
];

// Css files to inject in 'layout/_partial/head.ejs'
var CssFilesToInject = [
	'source/assets/css/font-awesome.css',
	'source/assets/css/jquery.fancybox.css',
	'source/assets/css/jquery.fancybox-thumbs.css',
	'source/assets/css/tranquil-peak.css'
];

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
		sync: {
			// Synchronize images
			dev: {
				files: [{
					cwd: 'source/_images',
					src: ['**/*'],
					dest: 'source/assets/images'
				}]
			}
		},
		// Link stylesheets and javascript files
		'sails-linker': {
			devJs: {
				options: {
					startTag: '<!--SCRIPTS-->',
					endTag: '<!--SCRIPTS END-->',
					fileTmpl: '<%- js(\'%s\') EJS_ENDTAG',
					appRoot: 'source/'
				},
				files: {
					'layout/_partial/script.ejs': JsFilesToInject
				}
			},
			devCss: {
				options: {
					startTag: '<!--STYLES-->',
					endTag: '<!--STYLES END-->',
					fileTmpl: '<%- css(\'%s\') EJS_ENDTAG',
					appRoot: 'source/'
				},
				files: {
					'layout/_partial/head.ejs': CssFilesToInject
				}
			},
			prodJs: {
				options: {
					startTag: '<!--SCRIPTS-->',
					endTag: '<!--SCRIPTS END-->',
					fileTmpl: '<%- js(\'%s\') EJS_ENDTAG',
					appRoot: 'source/'
				},
				files: {
					'layout/_partial/script.ejs': 'source/assets/js/script.min.js'
				}
			},
			prodCss: {
				options: {
					startTag: '<!--STYLES-->',
					endTag: '<!--STYLES END-->',
					fileTmpl: '<%- css(\'%s\') EJS_ENDTAG',
					appRoot: 'source/'
				},
				files: {
					'layout/_partial/head.ejs': 'source/assets/css/style.min.css'
				}
			},
		},
		// Delete .tmp folder
		clean: {
			prod: 'source/.tmp'
		},
		watch: {
			// Watch assets and launch 'SyncAssets' task
			assets: {
				files: ['source/_*/**/*'],
				tasks: ['SyncAssets']
			}
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('Compile assets', ['bower', 'sass', 'concat', 'cssmin', 'uglify', 'copy']);
	grunt.registerTask('Build', ['Compile assets', 'clean']);
	grunt.registerTask('Watch', ['watch']);

};