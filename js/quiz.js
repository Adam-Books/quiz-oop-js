import Score from "./score.js";
import Question from "./question.js";

class Quiz {
  constructor(quizElement, qnumber, questions) {
    this.quizElement = quizElement;

    this.currentElement = document.querySelector(".current");

    this.totalElement = document.querySelector(".total");

    this.scorePage = document.querySelector(".score");

    this.nextBtn = document.querySelector("#nextBtn");

    this.totalAmount = qnumber;

    this.answeredQuestions = 0;

    this.questions = this.setQuestion(questions);

    this.nextBtn.onclick = this.nextQuestion.bind(this);

    this.renderQuestions();
    // This is The most importent step to render the quiz Card
  }

  setQuestion(questions) {
    return questions.map((question) => new Question(question));
  }

  renderQuestions() {
    this.questions[this.answeredQuestions].renderQuestion();

    this.currentElement.innerHTML = this.answeredQuestions;
    // To put the number of the current question (dynamic number)

    this.totalElement.innerHTML = this.totalAmount;
    // To put the total number of the questions (static number)
  }

  nextQuestion() {
    const checkedElement = this.questions[
      this.answeredQuestions
    ].choices.filter((element) => element.firstChild.checked);
    if (checkedElement.length === 0) {
      alert("please choose an answer!");
    } else {
      this.questions[this.answeredQuestions].checkAnswer(checkedElement);

      this.showResult();

      this.answeredQuestions++;

      this.answeredQuestions < this.totalAmount
        ? this.renderQuestions()
        : this.endquestions();
    }
  }

  showResult() {
    this.questions[this.answeredQuestions].isCorrect
      ? alert("correct! ☺")
      : alert("Wrong");
    // maybe soon I'll have a time to replace this ugly alert by a beautiful modal
  }

  endquestions() {
    this.quizElement.style.display = `none`;

    this.scorePage.style.display = `block`;

    let correct = this.countCorrectAnswers();

    new Score(correct, this.totalAmount);
  }

  countCorrectAnswers() {
    let count = 0;
    this.questions.forEach((el) => {
      if (el.isCorrect) {
        count++;
      }
    });
    return count;
  }
}

export default Quiz;
