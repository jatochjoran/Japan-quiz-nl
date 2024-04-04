<?php
$host = "localhost";
$username = "101177";
$password = "J@p@n101177!";
$database = "docent_quiz";


$con = mysqli_connect(
    $host,
    $username,
    $password,
    $database
);


$playerName = $_POST['playerName'];
$score = $_POST['score'];
$quizType = $_POST['quizType'];

// Voer een SQL query uit om de data in te voegen
$sql = "INSERT INTO leaderboard (Naam, Score, Quiz_Type) VALUES (" . $playerName . ", " . $score . ", " . $quizType . ")";
?>
