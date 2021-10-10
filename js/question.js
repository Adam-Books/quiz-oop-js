class Question {
  constructor(question) {
    this.questionDom = document.querySelector("#question");

    this.choices = [
      document.querySelector("#a1"),
      document.querySelector("#a2"),
      document.querySelector("#a3"),
      document.querySelector("#a4"),
    ];

    this.correctAnswer = question.correct_answer;

    this.question = question.question;

    this.isCorrect = false;

    this.answers = this.swapAnswers([
      this.correctAnswer,
      ...question.incorrect_answers,
    ]);
    // the spred operator her is standing for the three incorrect ansewrs from the API
  }

  swapAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      // j here is a random number between the first answer & the last answer

      [answers[i], answers[j]] = [answers[j], answers[i]];
      // This is my own way to swap two elements (I know four methods to swap two elements [Adam Mohammed])
    }
    return answers;
    // return none sorted choices randomly in every question;
  }

  checkAnswer(checkedElement) {
    this.isCorrect =
      checkedElement[0].textContent == this.correctAnswer ? true : false;

    // console.log(this.isCorrect);
  }

  renderQuestion() {
    this.questionDom.innerHTML = this.question;

    this.choices.forEach((element, index) => {
      element.innerHTML =
        `<input type="radio" name="choice"/> ` + this.answers[index];
    });
  }
}

export default Question;
