module.exports = function(grunt) {
    grunt.config.set('replace', {
        // Replace `EJS_ENDTAG` string to resolve a problem of ejs escaping with sails-linker
        linker:      {
            overwrite:    true,
            src:          [
                'layout/_partial/head.ejs',
                'layout/_partial/script.ejs'
            ],
            replacements: [
                {
                    from: 'EJS_ENDTAG',
                    to:   '%>'
                }
            ]
        },
        // Modify url of images in fancybox.css to resolve images path.
        // Impossible to use an other plugin to do that
        // because in the bower fancybox packages, css files and images are in the same folder
        // and that not the case in assets folder.
        cssFancybox: {
            overwrite:    true,
            src:          [
                'source/assets/css/jquery.fancybox.css'
            ],
            replacements: [
                {
                    from: 'url(\'',
                    to:   'url(\'../images/'
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-text-replace');
};