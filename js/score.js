class Score {
  constructor(correctAnswers, totalQuestons) {
    this.finalScore = document.querySelector(".finalScore");

    this.again = document.querySelector("#again");

    this.renderScore(correctAnswers, totalQuestons);

    this.again.onclick = this.startAgain.bind(this);
  }

  renderScore(correctAnswers, totalQuestons) {
    this.finalScore.innerHTML = `Your score is: ${correctAnswers} of ${totalQuestons}`;
    // display the final score inside (.score h2) element
  }

  startAgain() {
    location.reload();
    // to return to the main window
  }
}

export default Score;
