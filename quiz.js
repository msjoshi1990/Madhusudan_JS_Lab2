
function Answer(answerText) {
    this.answerText = answerText;
}

function Question(questionNo, questionText, answerChoices, rightAnswer) {

    this.questionNo = questionNo;
    this.questionText = questionText;
    this.answerChoices = answerChoices;
    this.rightAnswer = rightAnswer;

    this.isUserAnswerCorrect = function (userSelectedAnswer) {
        if (this.rightAnswer.answerText == userSelectedAnswer) {
            return true;
        } else {
            return false;
        }
    }
}

function QuizResult(questionAnswerObj) {
    this.questionAnswerObj = questionAnswerObj;
    this.score = 0;

    this.getScrore = function () {
        return this.score;
    }

    this.incrementScore = function () {
        this.score++;
    }

    this.calculatePercentage = function () {
        const percentage = (this.score / this.questionAnswerObj.length) * 100;    
        return percentage;
    }
}

const answerFunctions = new Answer("Functions");
const answerXHTML = new Answer("XHTML");
const answerCSS = new Answer("CSS");
const answerHTML = new Answer("HTML");

const question1 = new Question(1, "Javascript Support", [answerFunctions, answerXHTML, answerCSS, answerHTML], answerFunctions)

const answerJQuery = new Answer("JQuery")
const answerXML = new Answer("XML");

const question2 = new Question(2, "Which language is used for styling web pages?", [answerHTML, answerJQuery, answerCSS, answerXML], answerCSS)

const answerPythonScript = new Answer("Python Script");

const answerDjango = new Answer("Django");
const answerNodeJS = new Answer("Node JS");

const question3 = new Question(3, "Which is not a Javascript framework?", [answerPythonScript, answerJQuery, answerDjango, answerNodeJS], answerPythonScript);

const answerPHP = new Answer("PHP");
const answerJS = new Answer("JS");
const answerAll = new Answer("All");

const question4 = new Question(4, "Which is used to connect to Database?", [answerPHP, answerHTML, answerJS, answerAll], answerPHP);

const answerLanguage = new Answer("Language");
const answerProgrammingLanguage = new Answer("Programming Language");
const answerDevelopment = new Answer("Development");

const question5 = new Question(5, "Java Script is a ", [answerLanguage, answerProgrammingLanguage, answerDevelopment, answerAll], answerProgrammingLanguage)

function QuizApplication(questionAnswerObj) {

    this.questionAnswerObj = questionAnswerObj;
    this.quizResult = new QuizResult(questionAnswerObj);
    this.pageIndex = 0;
    this.load = function () {
        this.attachListeners();
        this.displayQuizPage();
    }

    this.isLastQuestionAnswerPair = function () {
        if (this.pageIndex === (this.questionAnswerObj.length - 1)) {
            return true;
        } else {
            return false;
        }
    }

    this.displayQASection = function () {

        const qaPair = this.questionAnswerObj[this.pageIndex];
        const answerChoices = qaPair.answerChoices;
        const questionPara = document.getElementById("question");

        questionPara.innerText = qaPair.questionText;

        for (let index = 0; index < answerChoices.length; index++) {
            const spanId = "choice" + index;
            const answerChoiceSpan = document.getElementById(spanId);
            answerChoiceSpan.innerText = answerChoices[index].answerText;
        }
    }

    this.displayProgressSection = function () {

        const progressElement = document.getElementById("progress");
        const qaPair = this.questionAnswerObj[this.pageIndex]
        const progressText = `Question ${qaPair.questionNo} of ${this.questionAnswerObj.length}`;
        progressElement.innerText = progressText;
    }

    this.displayQuizPage = function () {
        this.displayQASection();
        this.displayProgressSection();
    }

    this.attachListeners = function () {

        const qaPair = this.questionAnswerObj[this.pageIndex]
        const answerChoices = qaPair.answerChoices
        const currentQuizAppObj = this;

        for (let index = 0; index < answerChoices.length; index++) {
            const buttonId = "btn" + index;
            const answerChoiceButton = document.getElementById(buttonId);
            this.addEventListener(answerChoiceButton, currentQuizAppObj);
        }
    }

    this.addEventListener = function (answerChoiceButton, currentQuizAppObj) {

        answerChoiceButton.onclick = function (event) {
            const target = event.currentTarget;
            const userSelectedAnswer = target.children[0].innerText;
            const currentQuestionObj = currentQuizAppObj.questionAnswerObj[currentQuizAppObj.pageIndex];
            const outcome = currentQuestionObj.isUserAnswerCorrect(userSelectedAnswer);

            if (outcome) {
                currentQuizAppObj.quizResult.incrementScore();
            }
            
            currentQuizAppObj.next();
        }
    }

    this.next = function () {

        const isLastPage = this.isLastQuestionAnswerPair();

        if (this.isLastQuestionAnswerPair()) {
            this.displayResultPage();
        } else {
            this.displayNextQuizPage();
        }
    }

    this.displayNextQuizPage = function () {
        this.pageIndex++;
        this.attachListeners();
        this.displayQuizPage();
    }

    this.displayResultPage = function () 
    {
        const quizElement = document.getElementById("quiz");
        const content =
            `<h1>Result </h1>
        <h2 id='score'>Your score : ${this.quizResult.getScrore()}. Percentage is ${this.quizResult.calculatePercentage()} </h2>`;
        quizElement.innerHTML = content;
    }

}

const javascriptQuizApp = new QuizApplication([question1, question2, question3, question4, question5])
javascriptQuizApp.load();
