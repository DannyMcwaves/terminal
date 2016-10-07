var $ = window.jQuery;

(function () {
    "use strict";

    $.fn.Height = function (sign, param) {
        var current = this;
        function keepHeight() {
            if (sign === "/" || sign === "div" || sign === "d") {
                $(current).height($(window).height() / param);
            } else if (sign === "+" || sign === "add" || sign === "a") {
                $(current).height($(window).height() + param);
            } else {
                $(current).height($(window).height());
            }
        }
        $(window).resize(keepHeight);
        keepHeight();
        return $(this);
    };

    $.fn.Width = function (sign, param) {
        var current = this;
        function keepWidth() {
            if (sign === "/" || sign === "div" || sign === "d") {
                $(current).width($(window).width() / param);
            } else if (sign === "+" || sign === "add" || sign === "a") {
                $(current).width($(window).width() + param);
            } else {
                $(current).width($(window).width());
            }
        }
        $(window).resize(keepWidth);
        keepWidth();
        return $(this);
    };
    
    $.fn.hideOverFlow = function () {
        $(this).css({
            overflow: "hidden"
        });
        return $(this);
    };
    
    $.fn.scrollOverFlow = function () {
        $(this).css({
            overflow: "scroll"
        });
        return $(this);
    };
    
    $.fn.autoOverFlow = function () {
        $(this).css({
            overflow: "auto"
        });
        return $(this);
    };
}());