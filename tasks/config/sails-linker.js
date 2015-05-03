module.exports = function(grunt) {
    grunt.config.set('sails-linker', {
        devJs:   {
            options: {
                startTag: '<!--SCRIPTS-->',
                endTag:   '<!--SCRIPTS END-->',
                fileTmpl: '<%- js(\'%s\') EJS_ENDTAG',
                appRoot:  'source/'
            },
            files:   {
                'layout/_partial/script.ejs': require('../pipeline').tranquilpeakJsFilesToInject
            }
        },
        devCss:  {
            options: {
                startTag: '<!--STYLES-->',
                endTag:   '<!--STYLES END-->',
                fileTmpl: '<%- css(\'%s\') EJS_ENDTAG',
                appRoot:  'source/'
            },
            files:   {
                'layout/_partial/head.ejs': require('../pipeline').tranquilpeakCssFilesToInject
            }
        },
        prodJs:  {
            options: {
                startTag: '<!--SCRIPTS-->',
                endTag:   '<!--SCRIPTS END-->',
                fileTmpl: '<%- js(\'%s\') EJS_ENDTAG',
                appRoot:  'source/'
            },
            files:   {
                'layout/_partial/script.ejs': 'source/assets/js/script.min.js'
            }
        },
        prodCss: {
            options: {
                startTag: '<!--STYLES-->',
                endTag:   '<!--STYLES END-->',
                fileTmpl: '<%- css(\'%s\') EJS_ENDTAG',
                appRoot:  'source/'
            },
            files:   {
                'layout/_partial/head.ejs': 'source/assets/css/style.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-sails-linker');
};