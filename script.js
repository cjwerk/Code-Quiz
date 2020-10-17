var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');

var currentQuestion = {}
var acceptingAnswers = true
var score = 0
var questionCounter = 0
var availbleQuestions = []

var questions = [
    {
          question: 'Inside which HTML element do we put the JavaScript?',
          choice1: 'scripting',
          choice2: 'js',
          choice3: 'javascipt',
          choice4: 'script',
          answer: 4,
    },

    {
        question: 'Where is the correct place to insert a JavaScipt?',
        choice1: 'Head',
        choice2: 'Body',
        choice3: 'Head & Body',
        choice4: 'Nowhere',
        answer: 2,
  },

  {
    question: 'What are JavaScipts Data Types?',
    choice1: 'String, Boolean, Number, Null, undefined',
    choice2: 'Boolean and Object',
    choice3: 'Undefined and Null',
    choice4: 'Number and String',
    answer: 1,
},

{
    question: 'What company developed JavaScript?',
    choice1: 'Apple',
    choice2: 'Microsoft',
    choice3: 'Marvel',
    choice4: 'Netscape',
    answer: 4,
},
]

var SCORE_POINTS = 100
var MAX_QUESTIONS = 4

  startGame = () => {
      questionCounter = 0
      score = 0
      availbleQuestions = [...questions]
      getNewQuestion()
  }

  getNewQuestion = () => {
   if(availbleQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
   }
   questionCounter++
   progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
   progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

   var questionIndex = Math.floor(Math.random() * availbleQuestions.length)
   currentQuestion = availbleQuestions[questionIndex]
   question.innerText = currentQuestion.question

   choices.forEach(choice => {
       var number = choice.dataset['number']
       choice.innerText = currentQuestion['choice' + number]
   })
  
availbleQuestions.splice(questionIndex, 1)

acceptingAnswers = true
  }
  choices.forEach(choice => {
      choice.addEventListener('click', e => {
          if(!acceptingAnswers) return
          acceptingAnswers = false
          var selectedChoice = e.target
          var selectedAnswer = selectedChoice.dataset['number']

          var classToApply = selectedAnswer === currentQuestion.answer ? 'correct' :
          'incorrect'

          if(classToApply === 'correct') {
              increment(SCORE_POINTS)
          }

          selectedChoice.parentElement.classList.add(classToApply)

          setTimeout(() => {
              selectedChoice.parentElement.classList.remove(classToApply)
              getNewQuestion()
          }, 1000)


      }) 
  })
  