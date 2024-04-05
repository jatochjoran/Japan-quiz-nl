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

$sql = "SELECT Naam, Score, Quiz_Type FROM leaderboard ORDER BY Score";
