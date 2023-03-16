const displayQuestion = document.querySelector(".display-question");
const answersBtn = document.querySelectorAll(".option");
const countingScore = document.querySelector(".count-score");
const nextBtn = document.querySelector(".next");
const displayEndResult = document.querySelector(".display-end-result");
const tryAgainBtn = document.querySelector(".try-again");
const startBtn = document.querySelector(".start-btn");
const categoryOptions = document.querySelector(".category-options");
const gameBoard = document.querySelector(".game-board");
const homePage = document.querySelector(".home-page");
const resultBoard = document.querySelector(".result-board");
const questionsNum = document.querySelector(".questions-amount");
const questionNumber = document.querySelector(".question-number");
const nextBtnWrapper = document.querySelector(".next-btn-wrapper");
const displayQuestionsAmount = document.querySelector(".display-q-amount");

let questionCounter = 0;
let answerCounter = 0;
let score = 0;
let loadedQuestions = [];

// fetch data from API
function FetchData() {
    const category = categoryOptions.value
    const questionsAmount = questionsNum.value
    const url = `https://opentdb.com/api.php?amount=${questionsAmount}&category=${category}&type=boolean`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        loadedQuestions = data.results.map(q => {
            const formatedQuestions = {
                question: q.question,
                answer: q.correct_answer
            }
            return formatedQuestions
        })
        startGame()
        console.log(data.results)
    })
    .catch(err => console.log(err))
}

// check vqalid number input and call FetchData function on click
startBtn.addEventListener("click", () => {
    if (questionsNum.value <= 0 || questionsNum.value > 30) {
        alert("Number of questions should be between 1 and 30.")
    } else {
        homePage.style.display = "none"
        FetchData()
    }
})

// start new game
function startGame() {
    gameBoard.style.display = "grid"
    resultBoard.style.display = "none"
    displayQuestionsAmount.textContent = questionsNum.value
    
    nextQuestion()
    checkAnswer()
}

tryAgainBtn.addEventListener("click", () => {
    location.reload()
})

// load next question, if any, else show result
function nextQuestion() {
    if (questionCounter < loadedQuestions.length) {
        const actualQuestion = loadedQuestions[questionCounter].question
        displayQuestion.innerHTML = actualQuestion
    } else {
        gameBoard.style.display = "none"
        displayEndResult.innerHTML = `You've got ${score} points!`
        resultBoard.style.display = "grid"       
    }
    questionCounter++
    nextBtnWrapper.style.display = "none"
    answersBtn.forEach(d => d.disabled = false)
}


// call nextQuestion and checkAnswer functions, display current question number
nextBtn.addEventListener("click", () => {
    nextQuestion()
    answersBtn.forEach(b => b.style.backgroundColor = "#404040")
    checkAnswer
    questionNumber.textContent = questionCounter
})

// check correct answer
function checkAnswer() {
    answersBtn.forEach((b) => {
        b.addEventListener("click", () => {
            const correctAnswer = loadedQuestions[answerCounter].answer
            if(correctAnswer === b.value) {
                b.style.backgroundColor = "#8db71c"
                score++
                countingScore.textContent = score
            } else {
                b.style.backgroundColor = "#ed4337"
            }  
            answerCounter++
            nextBtnWrapper.style.display = "flex"
            answersBtn.forEach(d => d.disabled = true)   
        })
    })
}

