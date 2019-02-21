// CONFIGURATION ////////////////////////////////////////////
// Form variables
var id_form =				'#subscribe';
var id_emailInput =			'#email';
var id_submitButton =		'#submit';
var id_indicator =			'#indicator';
// Message IDs
var id_msgErrorPost =		'#error-post';
var id_msgErrorEmail =		'#error-email';
var id_msgSuccess =			'#success';
// Times
var fadeTime =				500;
var delayTime =				5000;
// Miscellaneous
var regexEmail =			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// SUBSCRIBE ////////////////////////////////////////////////
$(document).ready(function() {
	$(id_msgErrorPost+', '+id_msgErrorEmail+', '+id_msgSuccess+', '+id_indicator).hide();
// Submit Form - fadeIn messages
	$(id_form).submit(function(event) {
		event.preventDefault();
		$(id_msgErrorPost+', '+id_msgErrorEmail+', '+id_msgSuccess+', '+id_indicator).hide();
		$(id_submitButton).prop('disabled', true);
		$(id_indicator).show();
		if (!regexEmail.test($(id_emailInput).val())) {
			$(id_submitButton).prop('disabled', false);
			$(id_msgSuccess+', '+id_msgErrorPost+', '+id_indicator).hide();
			$(id_msgErrorEmail).fadeIn(fadeTime);
		} else {
			$.ajax({ 
				type:'POST',
				url:$(id_form).attr('action'),
				data:$(id_form).serialize()
			})
			.done(function(html) {
				$(id_emailInput).val('');
				$(id_submitButton).prop('disabled', false);
				$(id_msgErrorPost+', '+id_msgErrorEmail+', '+id_indicator+', '+id_form).hide();
				$(id_msgSuccess).fadeIn(fadeTime);
			})
			.fail(function(xhr, status, error) {
				$(id_submitButton).prop('disabled', false);
				$(id_msgErrorEmail+', '+id_msgSuccess+', '+id_indicator).hide();
				$(id_msgErrorPost).fadeIn(fadeTime);
			})
		}
	});
});