var counter = 60;
var timer;
var runningQuestionIndex = 0;
var score = 0;

var highscores = localStorage.getItem('score') ? JSON.parse(localStorage.getItem('score')) : []



const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById("progress");
const timerDiv = document.getElementById('counter')


var questions = [
  {
    question: " Q1:  What is Javascript?",
    choiceA: "it is a study of bio-engineering ",
    choiceB: "It's Cascading Style Sheets ",
    choiceC: "A program that allows you to implement complex features on webpages ",
    answer: "C"

  },
  {
    question: "Q2: what is syntax?",
    choiceA: "ice cream!",
    choiceB: "A set of rules that defines the combination of symbols",
    choiceC: 'a tax agent',
    answer: "B"

    
},
  {
    question: "Q3 :what is css ?",
    choiceA: "Cascading Style Sheets for webpages",
    choiceB: "a cystic fibrosis ",
    choiceC: "I'm not sure",
    answer: "A"
  },
  {
    question: " Q4:  what is the beauty of coding?",
    choiceA: "can create own webpage ",
    choiceB: "can build fully functioning apps",
    choiceC: "all of the above",
    answer: "C"
  }

]
var answer = document.getElementById("#answerDiv")
const lastQuestion = (questions.Length) - 1;

document.getElementById('choices').addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    checkAnswer(e.target.id)
  }
})

// render a question
function renderQuestion() {
  if (runningQuestionIndex === questions.length) {
    endgame()
  } else {
    let q = questions[runningQuestionIndex];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = `<button id='A'>${q.choiceA}</button>`;
    choiceB.innerHTML = `<button id='B'>${q.choiceB}</button>`;
    choiceC.innerHTML = `<button id='C'>${q.choiceC}</button>`;
  }
};

// counter render
function counterRender() {
  if (counter > 0) {
    timerDiv.textContent = counter;
    counter--;
  } else {

    clearInterval(timer)
    endgame()
    scoreRender()
  }
}


// start quiz
function startquiz() {
  start.style.display = "none";
  quiz.style.display = "block";
  timer = setInterval(counterRender, 1000)
  renderQuestion();
}

document.querySelector("#start").addEventListener("click", startquiz);

function scoreRender() {
  scoreRender.style.display = "block";
  let scorepercent = mat.round(100 * score / question.length);
};

function checkAnswer(answer) {

  if (answer == questions[runningQuestionIndex].answer) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
    counter -= 10
  }
}

function endgame() {
  clearInterval(timer)
  document.querySelector('#timer').textContent = 0;
  alert('GAME OVER!')
  scoreRender()
}

//  score render
function scoreRender() {
  appendScores()
  scoreContainer.style.display = "block";
  var input = document.createElement('input');
  input.setAttribute('id', 'name');
  var btn = document.createElement('button');
  btn.textContent = "Submit";
  btn.addEventListener('click', function () {
    highscores.push(`${input.value} - ${score}`);
    localStorage.setItem('score', JSON.stringify(highscores))
    appendScores()
  })
  scoreContainer.appendChild(input);
  scoreContainer.appendChild(btn)
  // calculate the amount of question answer percent answered by the user
  // const scorePerCent = Math.round(100 * score / question.length);
  // scoreContainer.counter.innerHTML += "<p>" + scorepercent + "</p>";

}
function appendScores() {
  document.getElementById('scoreList').innerHTML = ''
  highscores.forEach(highscore => {
    var scoreList = document.createElement('h3');
    scoreList.textContent = highscore;
    document.getElementById('scoreList').appendChild(scoreList)
  })
}


// if the answer was wrong

function answerIsWrong() {
  alert('WRONG!')
  runningQuestionIndex++;
  renderQuestion()
}
// if the answer is correct
function answerIsCorrect() {
  alert('RIGHT!')
  runningQuestionIndex++;
  renderQuestion()
}