(function ($) {
    "use strict";
	
	$("#start article.one").Height();

    function position() {
        $("#start article.one div").css({
            top: $(window).height() / 2.7
        });
    }

    $(window).ready(position).resize(position);
	
	
	// this part of the code has to do with handling all the commands that come from the
	// virtual command line and all that.

    var command = require("child_process").exec,
		fs = require("fs"),
		process = require('process'),
		element,
		el;
	
	element =	'<section class="m-b-2"> <form state="active" class="input-group">' +
				'<span class="input-group-addon">&gt;&gt;&gt;</span>' +
				'<input class="form-control" type="text"/></form>' +
				'<article output="true" class="collapse bg-inverse"> <p class="p-a-1"></p>' +
				'</article></section>';
	
	$("h6.dir").html(process.cwd());
	
	function submit(event) {
		event.preventDefault();
		var input = $($("form[state='active']").children("input")[0]);
		
		if (input.val().split(" ")[0] === "cd") {
			process.chdir(input.val().split(" ")[1]);
			$("h6.dir").html(process.cwd());
			
			$("article[output='true'] p").html(process.cwd());
			$("article[output='true']").collapse("show");
			$("article[output='true']").removeAttr("output");
			$("form[state='active']").children("input")[0].setAttribute("disabled", "true");
			$("form[state='active']").removeAttr("state");
			
			$(element).one("submit", submit).appendTo("#terminal");
			
			return;
			
		} else if (input.val() === "reset" || input.val() === "clear" || input.val() === "exit") {
			el = $(element).one("submit", submit);
			$("#terminal").html(el);
			
			if (input.val() === "exit") {
				$("#intModal").modal("hide");
			}
			
			return;
		}
		
		command(input.val(), function (error, stdout, stderr) {
			var output = "";

			if (error) {output = error; }
			if (stderr === "") {
				output += stdout;
			} else {
				output += stderr;
			}
			
			$("article[output='true'] p").html(output.replace(/(\b\n\b)|(\n)/g, "<br/>"));
			$("article[output='true']").collapse("show");
			$("article[output='true']").removeAttr("output");
			$("form[state='active']").children("input")[0].setAttribute("disabled", "true");
			$("form[state='active']").removeAttr("state");
		
			$(element).one("submit", submit).appendTo("#terminal");
		});

	}
	
	$("button[data-dismiss='modal']").click(function (event) {
		el = $(element).one("submit", submit);
		$("#terminal").html(el);
		return;
	});

    $("form[state='active']").one("submit", submit);
	
	$("img.comp").click(function () {
		$("#start").slideUp(700);
		$("#ide").slideDown(700);
	});

}(window.jQuery));
