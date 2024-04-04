<?php
$host = "localhost";
$username = "101177";
$password = "J@p@n101177!";
$database = "docent_quiz";

// Maak verbinding met de database
$con = mysqli_connect($host, $username, $password, $database);

// Controleer of de verbinding succesvol is
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

// Ontvang de gegevens van het AJAX-verzoek
$playerName = $_POST['playerName'];
$score = $_POST['score'];
$quizType = $_POST['quizType'];

// Ontvangen gegevens ontsnappen om SQL-injectie te voorkomen
$playerName = mysqli_real_escape_string($con, $playerName);
$score = mysqli_real_escape_string($con, $score);
$quizType = mysqli_real_escape_string($con, $quizType);

// Voer de query uit om gegevens in te voegen
$sql = "INSERT INTO leaderboard (Naam, Score, Quiz_Type) VALUES ('$playerName', '$score', '$quizType')";
if (mysqli_query($con, $sql)) {
    echo "Score succesvol opgeslagen in de database";
} else {
    echo "Fout bij het opslaan van de score: " . mysqli_error($con);
}

// Sluit de databaseverbinding
mysqli_close($con);
?>
