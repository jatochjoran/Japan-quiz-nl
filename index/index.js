$(document).ready(function() {
    // Simulate loading for 5 seconds
    setTimeout(function() {
        // Hide the loading screen with fade out animation
        $(".circle").fadeOut("slow", function() {
            // Show the content after the loading screen is hidden
            $("#content2").fadeIn("slow");
        });
    }, 3000);
});
