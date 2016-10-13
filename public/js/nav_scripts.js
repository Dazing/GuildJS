$(document).ready(function($) {
	$("#login").on("click", function() {
		var visibility_state = $("#login_form").css("visibility");
		if (visibility_state == "hidden") {
			$("#login_form").css("visibility", "visible");
		}
		else {
			$("#login_form").css("visibility", "hidden");
		}
		
	});
});