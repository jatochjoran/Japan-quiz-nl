let Quiz_Type = "Japan";

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.correctAnswer = function (choice) {
    return choice === this.answer;
};

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
};

Quiz.prototype.isEnded = function () {
    return this.questions.length === this.questionIndex;
};

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
};

var questions = [
    new Question(
        "Mount Fuji is de hoogste berg van Japan.",
        ["Waar", "Niet waar", "---", "---"],
        "Waar"
    ),
    new Question(
        "De hoofdstad van Japan is Kyoto.",
        ["Waar", "Niet waar", "---", "---"],
        "Niet waar"
    ),
    new Question(
        "Kabuki is een traditionele Japanse vorm van dans.",
        ["Waar", "Niet waar", "---", "---"],
        "Waar"
    ),
    new Question(
        "Sushi is een bekend Japans gerecht.",
        ["Waar", "Niet waar", "---", "---"],
        "Waar"
    ),
    new Question(
        "Origami is de kunst van het vouwen van papier.",
        ["Waar", "Niet waar", "---", "---",],
        "Waar"
    ),
    new Question(
        "Welke berg wordt beschouwd als de heiligste berg van Japan?",
        ["Mount Fuji", "Mount Everest", "Mount Kilimanjaro", "Mount Rainier"],
        "Mount Fuji"
    ),
    new Question(
        "Wat is de hoofdstad van Japan?",
        ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
        "Tokyo"
    ),
    new Question(
        "Welk type theater wordt gekenmerkt door traditionele Japanse podiumkunsten?",
        ["Kabuki", "Opera", "Ballet", "Broadway"],
        "Kabuki"
    ),
    new Question(
        "Wat is een traditionele Japanse theeceremonie bekend als?",
        ["Sushi", "Sake", "Kaiseki", "Chanoyu"],
        "Chanoyu"
    ),
    new Question(
        "Welke traditionele Japanse kunstvorm maakt gebruik van vouwen en papier?",
        ["Origami", "Calligrafie", "Sumi-e", "Ukiyo-e"],
        "Origami"
    ),
    new Question(
        "Wat is de naam van de traditionele Japanse kleding?",
        ["Yukata", "Kimono", "Hakama", "Obi"],
        "Kimono"
    ),
    new Question(
        "Welke Japanse stad staat bekend om zijn neonverlichte uitgaanswijk en entertainment?",
        ["Shibuya", "Akihabara", "Ginza", "Shinjuku"],
        "Shinjuku"
    ),
    new Question(
        "Wat is de naam van de traditionele Japanse architectuur met een kenmerkend schuin dak?",
        ["Pagode", "Teepee", "Yurt", "Pagoda"],
        "Pagode"
    ),
    new Question(
        "Welke Japanse keuken staat bekend om zijn gegrilde gerechten?",
        ["Yakiniku", "Sushi", "Tempura", "Ramen"],
        "Yakiniku"
    ),
    new Question(
        "Wat is de naam van de traditionele Japanse muziekinstrumentenensemble?",
        ["Shakuhachi", "Koto", "Shamisen", "Taiko"],
        "Taiko"
    )
];

questions.sort(function () {
    return 0.5 - Math.random();
});

var quiz = new Quiz(questions);

function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        var element = document.getElementById("question");
        var currentQuestion = quiz.getQuestionIndex();
        element.innerHTML = currentQuestion.text;

        if (currentQuestion.choices.length > 2) {
        
            var choices = currentQuestion.choices;
            for (var i = 0; i < choices.length; i++) {
                var choiceElement = document.getElementById("choice" + i);
                choiceElement.innerHTML = choices[i];
                guess("btn" + i, choices[i]);
            }
        } else {
        
            var trueFalseChoices = ["Waar", "Niet waar"];
            for (var i = 0; i < trueFalseChoices.length; i++) {
                var choiceElement = document.getElementById("choice" + i);
                choiceElement.innerHTML = trueFalseChoices[i];
                guess("btn" + i, trueFalseChoices[i]);
            }
        }

        showProgress();
        hideFeedback();
    }
}

populate();

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        var isCorrect = quiz.getQuestionIndex().correctAnswer(guess);
        quiz.guess(guess);
        populate();
        showFeedback(isCorrect);
    };
}

function showFeedback(isCorrect) {
    var feedback = document.getElementById("feedback");
    if (isCorrect) {
        feedback.classList.remove("incorrect");
        feedback.classList.add("correct");
        feedback.style.animation = "slideIn 1s forwards";

        setTimeout(function () {
            feedback.style.animation = "slideOut 1s forwards";
            feedback.classList.remove("correct");
        }, 750);
    } else {
        feedback.classList.remove("correct");
        feedback.classList.add("incorrect");
        feedback.style.animation = "slideIn 1s forwards";

        setTimeout(function () {
            feedback.style.animation = "slideOutRed 1s forwards";

            setTimeout(function () {
                feedback.classList.remove("incorrect");
                feedback.classList.add("correct");
            }, 750);
        }, 750);
    }
}

function hideFeedback() {
    var feedback = document.getElementById("feedback");
    feedback.innerHTML = "";
}

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML =
        '<div class="progress-number">' +
        currentQuestionNumber +
        "</div>" +
        " of " +
        '<div class="progress-number">' +
        quiz.questions.length +
        "</div>";
}

function showScores() {
    var gameOver = "<h1>Score</h1>";
    gameOver += "<div style='text-align:center; color:white;'>";
    gameOver += "<label for='playerName'>Enter your name:</label>";
    gameOver += "<input type='text' id='playerName' placeholder='Your Name'>";
    gameOver += "<button onclick='submitScore()'>Submit</button>";
    gameOver += "</div>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOver;
}

function submitScore() {
    var playerName = document.getElementById("playerName").value;
    var scoreMessage = "<h2 style='text-align:center; color:white;'>Player: " + playerName + "</h2>";
    scoreMessage += "<h2 style='text-align:center; color:white;'>Your Score: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = scoreMessage;
}






function submitScore() {
    var playerName = document.getElementById("playerName").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "connect.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Je kunt hier feedback geven over het succesvol opslaan van de score
            console.log("Score succesvol opgeslagen:", xhr.responseText);
            var element = document.getElementById("quiz");
            element.innerHTML = "<h2>Bedankt voor het meedoen, " + playerName + "! Je score is opgeslagen.</h2>";
        } else {
            // Foutafhandeling
            console.error("Er is een fout opgetreden: ", xhr.statusText);
        }
    };

    var data = "playerName=" + encodeURIComponent(playerName) +
               "&score=" + encodeURIComponent(quiz.score) +
               "&quizType=" + encodeURIComponent(Quiz_Type);

    xhr.send(data);
}
