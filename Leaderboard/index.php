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

        <div class="info">
            <h2>Leaderboard</h2>
        </div>
        <div class="leaderboard" id="leaderboard">
            <table>
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Score</th>
                        <th>Quiz Type</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    require_once 'connect.php';

                    $query = "SELECT * FROM leaderboard";
                    $result = mysqli_query($con, $query);


                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo '<tr>';
                            echo '<td>' . htmlspecialchars($row['Naam']) . '</td>';
                            echo '<td>' . htmlspecialchars($row['Score']) . '</td>';
                            echo '<td>' . htmlspecialchars($row['Quiz_Type']) . '</td>';
                            echo '</tr>';
                        }
                    } else {
                        echo '<tr><td colspan="3">No data found</td></tr>';
                    }
                    ?>
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