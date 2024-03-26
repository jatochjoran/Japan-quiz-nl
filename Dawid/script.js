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
    ),
  ];

var quiz = new Quiz(questions);

  
  function populate() {
    if (quiz.isEnded()) {
      showScores();
    } else {
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;
  
      var choices = quiz.getQuestionIndex().choices;
      for (var i = 0; i < choices.length; i++) {
        var element = document.getElementById("choice" + i);
        element.innerHTML = choices[i];
        guess("btn" + i, choices[i]);
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
    var gameOver = "<h1>Result</h1>";
    gameOver +=
      "<h2 id='score' style='text-align:center; color:white;'>Your Score: " +
      quiz.score +
      "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOver;
  }
  