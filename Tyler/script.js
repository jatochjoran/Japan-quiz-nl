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
    new Question("Welk eiland is zowel de grootste als de meest bevolkte van de Japanse archipel?", ["Hokkaido", "Kyushu", "Shikoku", "Honshu"], "Honshu"),
    new Question("Hoe heet het Japanse gerecht van gekookte rijst met rijstazijn, vaak geserveerd met rauwe vis of groenten?", ["Ramen", "Sushi", "Tempura", "Udon"], "Sushi"),
    new Question("Wat is de naam van de traditionele Japanse theeceremonie?", ["Ikebana", "Origami", "Sado", "Kabuki"], "Sado"),
    new Question("Wat is de naam van de Japanse animatiestijl die wereldwijd populair is?", ["Manga", "J-Pop", "Hentai", "Anime"], "Anime"),
    new Question("Waar of niet waar: In Japan is het gebruikelijk om je schoenen uit te doen voordat je iemands huis", ["Waar", "Niet waar"], "waar"),
  
    new Question("Noem een traditioneel Japans gerecht dat rauwe vis bevat.", ["Miso soep", "Yakitori", "Takoyaki", "Sashimi"], "Sashimi"),
    new Question("Wat is de naam van de bloesem die elk voorjaar over heel Japan wordt gevierd, vaak door middel van picknicks onder de bomen?", ["Ume (pruimenbloesem)", "Tsubaki (camellia)", "Sakura (kersenbloesem)", "Ajisai (hortensia)"], "Sakura (kersenbloesem)"),
    new Question("Wat is de term voor de Japanse stripboeken en grafische romans die wereldwijd populair zijn?", ["Comicbook", "Manga", "Light novel", "Visual novel"], "Manga"),
    new Question("Waar of niet waar: Sumoworstelen, de nationale sport van Japan, laat alleen mannelijke deelnemers toe.", ["Waar", "Niet waar"], "Waar"),
    new Question("Hoe wordt de Japanse keizerlijke familie genoemd, die als een van de oudste ononderbroken monarchieën ter wereld wordt beschouwd?", ["Samoerai", "Shogunaat", "Yamato", "Heian"], "Shogunaat"),
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
  

  