$('document').ready(function () {
	'use strict';

	// var commentList = $('[data-comments]');

	$('[contenteditable]').keypress(function (event) {
		var value = this.textContent.trim();

		if ( value && event.which === 13 ) {
			event.preventDefault();
			var div = $('<div>')
				.addClass('post-modal__sidebar__comments__item')
				.text(value);

     		$('[data-comments]').prepend(div);
  		}
	});

});
