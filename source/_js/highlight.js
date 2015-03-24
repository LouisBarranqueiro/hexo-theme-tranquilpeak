+function($) {
	$(document).ready(function() {
		$('.highlight pre').each(function(i, block) {
			hljs.highlightBlock(block);
		});
	});
}(jQuery);