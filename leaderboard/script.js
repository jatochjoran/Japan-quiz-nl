$(document).ready(function() {
    setTimeout(function() {
        $(".circle").fadeOut("slow", function() {
            $("#content2").fadeIn("slow");
        });
    }, 1500);
});