
module.exports = function(grunt){
	grunt.initConfig({
		sass: {
			prod: {
				files: [{
					expand: true,
					cwd: 'source/scss',
					src: ['style.scss'],
					dest: 'source/css/',
					ext: '.css'
				}]
			}
		},
		cssmin: {
			prod: {
				files: [{
					expand: true,
					cwd: 'source/css',
					src: ['style.css'],
					dest: 'source/css',
					ext: '.min.css'
				}]
			}
		},
		uglify: {
			prod: {
				options: {
					mangle: {
						except: ['jQuery']
					}
				},
				files: {
					'source/js/script.min.js': ['source/js/components/*.js']
				}
			}
		},
		watch: {
			scss: {
				files: ['source/**/*.scss'],
				tasks: ['Compile SCSS', 'Minify CSS']
			},
			js: {
				files: ['source/js/components/*.js'],
				tasks: ['Minify JS']
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('Compile SCSS', ['sass']);
	grunt.registerTask('Minify CSS', ['cssmin']);
	grunt.registerTask('Minify JS', ['uglify']);
	grunt.registerTask('Watch SCSS', ['watch:scss']);
	grunt.registerTask('Watch JS', ['watch:js']);

};