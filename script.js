var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        else if (timer <= 1) {
            timer--;
        } else if (!acceptingAnswers) {
            timer -= 10
        } else if (timer === 1) {
            return window.location.assign('./end.html') 
        } 
    }, 1000);
}
function stopTimer() {
    if(timer === 0){
        clearInterval(timer)
    }
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#progressBarFull');
    startTimer(fiveMinutes, display);
};

var currentQuestion = {}
var acceptingAnswers = true
var score = 0
var questionCounter = 0
var availbleQuestions = []

var questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript tag?',
        choice1: '<scripting>',
        choice2: '<js>',
        choice3: '<javascipt>',
        choice4: '<script>',
        answer: 4,
    },

    {
        question: 'Where is the correct place to insert a JavaScipt element?',
        choice1: '<Head>',
        choice2: '<Body>',
        choice3: '<Head> & <Body>',
        choice4: 'Nowhere',
        answer: 2,
    },

    {
        question: 'What are JavaScipts Primative Data Types?',
        choice1: 'String, Boolean, Number, Null, undefined',
        choice2: 'Boolean and Object',
        choice3: 'Undefined and Null',
        choice4: 'Number and String',
        answer: 1,
    },

    {
        question: 'Which company developed JavaScript?',
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
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()

