// define function to search index in an array with a regex
if (typeof Array.prototype.reIndexOf === 'undefined') {
    Array.prototype.reIndexOf = function(rx) {
        for (var i in this) {
            if (this[i].toString().match(rx)) {
                return i;
            }
        }
        return -1;
    };
}

var rPath          = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))|^[A-Za-z0-9_\/-]+\.\w{2,4})/;
var rClass         = /^[_a-zA-Z0-9-]+$/;
var rSize          = /^\d+(?:|\.\d+)(?:px|%)?$/;
var rFigClass      = /(^fig-\d{2,3}$|^center$)/;
var fancyboxClass  = 'fancybox';
var figureClass    = 'figure';
var captionClass   = 'caption';
var noCaptionClass = 'nocaption';
var clearClass     = 'clear';

/**
 * Image tag
 *
 * Syntax:
 *     {% image [classes] /path/to/image [/path/to/thumbnail] [width of thumbnail] [height of thumbnail] [title text] %}
 * E.g:
 *     {% image fig-50 right fancybox image2.png http://google.fr/images/image125.png "A beautiful sunrise" %}
 */
hexo.extend.tag.register('image', function(args) {
    var original;
    var thumbnail       = '';
    var thumbnailWidth  = '';
    var thumbnailHeight = '';
    var classes         = [];
    var html            = '';
    var fancybox        = '';
    var clear           = '';

    // Get CSS classes
    while (args.length && rClass.test(args[0])) {
        classes.push(args.shift());
    }

    // Get path of original image
    original = args.shift();

    // Get path of thumbnail image
    if (args.length && rPath.test(args[0])) {
        thumbnail = args.shift();
    }

    // Get width of thumbnail image
    if (args.length && rSize.test(args[0])) {
        thumbnailWidth = args.shift();
    }

    // Get height of thumbnail image
    if (args.length && rSize.test(args[0])) {
        thumbnailHeight = args.shift();
    }

    // Get title of image
    var title = args.join(' ');
    // Build the image HTML structure
    var image = '<img class="fig-img" src="' + (thumbnail || original) + '" width="' +
                thumbnailWidth + '" height="' + thumbnailHeight + '" alt="' + title + '">';

    // Build div to retrieve normal flow of document
    if (classes.indexOf(clearClass) >= 0) {
        clear = '<div style="clear:both;"></div>';
        // remove `clear` class of `classes` to not be attached on the main div
        classes.splice(classes.indexOf(clearClass), 1);
    }

    // Add Fancybox structure around image
    if (classes.indexOf(fancyboxClass) >= 0) {
        fancybox += '<a class="' + fancyboxClass + '" href="' + original + '" title="' + title + '">';
        fancybox += image;
        fancybox += '</a>';
        // remove `fancyfox` class of `classes` to not be attached on the main div
        classes.splice(classes.indexOf(fancyboxClass), 1);
    }

    // Build HTML structure
    html += '<div class="' + figureClass + ' ' + classes.join(' ') + '"' +
            (classes.reIndexOf(rFigClass) === -1 ? ' style="width:' + thumbnailWidth + ';"' : '' ) + '>';
    html += fancybox || image;

    // Add caption
    if (title && classes.indexOf(noCaptionClass) === -1) {
        html += '<span class="' + captionClass + '">';
        html += title;
        html += '</span>';
    }

    html += '</div>';
    // add `clear` div
    html += clear;

    return html;
});