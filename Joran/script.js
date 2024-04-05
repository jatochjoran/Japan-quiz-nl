let Quiz_Type = "Geschiedenis";

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
    "Wie was de eerste keizer van Japan?",
    ["Keizer Hirohito", "Keizer Meiji", "Keizer Jimmu", "Keizer Akihito"],
    "Keizer Jimmu"
  ),
  new Question(
    "Welke gebeurtenis markeert het begin van de Japanse feodale periode?",
    [
      "De slag bij Sekigahara",
      "De bouw van de eerste keizerlijke paleizen",
      "De komst van het boeddhisme in Japan",
      "De val van de Heian-periode",
    ],
    "De val van de Heian-periode"
  ),
  new Question(
    "Wat was de belangrijkste oorzaak van de val van het Tokugawa-shogunaat?",
    [
      "Een invasie van Mongoolse troepen",
      "Binnenlandse opstanden van boeren en samurai",
      "De aankomst van Amerikaanse oorlogsschepen onder leiding van Commodore Perry",
      "Een epidemie van de Zwarte Dood",
    ],
    "De aankomst van Amerikaanse oorlogsschepen onder leiding van Commodore Perry"
  ),
  new Question(
    "Wie was de leider van de gewelddadige opstand tegen het Tokugawa-shogunaat in 1868?",
    ["Oda Nobunaga", "Emperor Meiji", "Toyotomi Hideyoshi", "Tokugawa Ieyasu"],
    "Emperor Meiji"
  ),
  new Question(
    "Welke invloedrijke Japanner is verantwoordelijk voor de oprichting van het Kamakura-shogunaat?",
    [
      "Minamoto no Yoshitsune",
      "Minamoto no Yoritomo",
      "Taira no Kiyomori",
      "Hojo Tokimune",
    ],
    "Minamoto no Yoritomo"
  ),
  new Question(
    "Tijdens welke periode werd Japan bestuurd door een militaire dictatuur bekend als het Kamakura-shogunaat?",
    ["Nara-periode", "Heian-periode", "Kamakura-periode", "Edo-periode"],
    "Kamakura-periode"
  ),
  new Question(
    "Wat was de belangrijkste reden voor de opening van Japan voor buitenlandse handel in de 19e eeuw?",
    [
      "De Japanse hongersnood van 1833",
      "De interesse van Japan in westerse technologie",
      "De dreiging van Amerikaanse kanonneerboten",
      "Het verlangen naar exotische producten uit Europa",
    ],
    "De dreiging van Amerikaanse kanonneerboten"
  ),
  new Question(
    "Welke Japanse stad werd op 6 augustus 1945 getroffen door een atoombom?",
    ["Nagoya", "Hiroshima", "Nagasaki", "Kyoto"],
    "Hiroshima"
  ),
  new Question(
    "Welke gebeurtenis markeert het einde van de Edo-periode en het begin van de Meiji-restauratie?",
    [
      "De aankomst van Portugese handelaren in Japan",
      "De val van het Ming-dynastie in China",
      "De Boshin-oorlog",
      "De bouw van de Tokugawa-paleizen",
    ],
    "De Boshin-oorlog"
  ),
  new Question(
    "Wie was de eerste buitenlandse missionaris die naar Japan reisde en het christendom introduceerde?",
    ["St. Francis Xavier", "Marco Polo", "Matteo Ricci", "Vasco da Gama"],
    "Matteo Ricci"
  ),
  new Question(
    "Tijdens de Edo-periode was Japan geïsoleerd van de rest van de wereld.",
    ["Waar", "Niet waar", "---", "---"],
    "Waar"
  ),
  new Question(
    "De samurai waren een sociale klasse van boeren in het oude Japan.",
    ["Waar", "Niet waar", "---", "---"],
    "Niet waar"
  ),
  new Question(
    "De Tokugawa-shogun verplaatste de hoofdstad van Japan naar Kyoto.",
    ["Waar", "Niet waar", "---", "---"],
    "Niet waar"
  ),
  new Question(
    "Het Tokugawa-shogunaat stond bekend om zijn beleid van actieve buitenlandse handel.",
    ["Waar", "Niet waar", "---", "---"],
    "Niet waar"
  ),
  new Question(
    "De Meiji-restauratie leidde tot de modernisering van Japan en de afschaffing van het feodale systeem.",
    ["Waar", "Niet waar", "---", "---"],
    "Waar"
  ),
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
          // Feedback over succesvol opslaan van de score
          console.log("Score succesvol opgeslagen:", xhr.responseText);
          var element = document.getElementById("quiz");
            element.innerHTML = "<h2 style= 'color:white;'>Bedankt voor het meedoen, " + playerName + "! Je score: " + quiz.score + " </h2>";
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

