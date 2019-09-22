(function($) {
  'use strict';

  /**
   * Animate tabs and tab contents of tabbed codeblocks
   * @param {Object} $tabbedCodeblocks
   * @return {undefined}
   */
  function animateTabbedCodeBlocks($tabbedCodeblocks) {
    $tabbedCodeblocks.find('.tab').click(function() {
      var $currentTabButton = $(this);
      var $currentTabbedCodeblock = $currentTabButton.parent().parent().parent();
      var $codeblocks = $currentTabbedCodeblock.find('.tabs-content').children('pre, .highlight');
      var $activeCodeblock = $codeblocks.eq($currentTabButton.index());
      var $tabButtons = $currentTabButton.siblings();

      $tabButtons.removeClass('active');
      $currentTabButton.addClass('active');
      $codeblocks.hide();
      $activeCodeblock.show();

      // Resize the active codeblock according to the width of the window.
      var $gutter = $activeCodeblock.find('.gutter');
      var $code = $activeCodeblock.find('.code');
      var codePaddings = $code.width() - $code.innerWidth();
      var width = $activeCodeblock.outerWidth() - $gutter.outerWidth() + codePaddings;
      $code.css('width', width);
      $code.children('pre').css('width', width);
    });
  }

  $(document).ready(function() {
    animateTabbedCodeBlocks($('.codeblock--tabbed'));
  });
})(jQuery);
