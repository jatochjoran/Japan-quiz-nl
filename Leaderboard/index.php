<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-list.svg" />
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="../Menu/style.css" />
    <link rel="icon" href="../img/wegjimlogo.png">
</head>

<body>
    <img src="../img/sakura.png" id="sakuraTwig1" alt="Sakura Twig">
    <img src="../img/sakura.png" id="sakuraTwig2" alt="Sakura Twig">

    <div class="loading-screen">
        <div class="circle">
            <div class="wave"></div>
        </div>
    </div>

    <div id="content2" style="display: none;">
        <div class="center menu">
            <div id="myMenu"></div>
        </div>

        <?php
        require_once 'connect.php';

        $query = "SELECT * FROM leaderboard";
        $result = mysqli_query($con, $query);

        while ($row = mysqli_fetch_assoc($result)) {
            ?>

            <p>
                <?= $row['Naam']; ?>
            </p>
            <p>
                <?= $row['Score']; ?>
            </p>
            <p>
                <?= $row['Quiz_Type']; ?>
            </p>

            <?php

        }

        ?>

        <div class="info">
            <h2>Leaderboard</h2>
        </div>
        <div class="leaderboard" id="leaderboard">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Quiz Type</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>


        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/1.0.0/anime.js"></script>
        <script src="script.js"></script>
        <script src="../Menu/script.js"></script>
</body>

</html>