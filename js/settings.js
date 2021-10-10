import Quiz from "./quiz.js";

class Settings {
  constructor() {
    this.setting = document.querySelector(".settings");

    this.quizDom = document.querySelector(".quiz");

    this.category = document.querySelector("#category");

    this.difficulty = [
      document.querySelector("#easy"),
      document.querySelector("#medium"),
      document.querySelector("#hard"),
    ];

    this.number = document.querySelector("#number");

    this.startBtn = document.querySelector("#startbtn");

    this.quiz = {};

    this.startBtn.addEventListener("click", this.startQuiz.bind(this));
  }

  async startQuiz() {
    try {
      let categoryID = this.category.value;

      let difficultyLevel = this.getDifficulty();

      let qnumber = this.getQnumber();

      let url = `https://opentdb.com/api.php?amount=${qnumber}&category=${categoryID}&difficulty=${difficultyLevel}&type=multiple`;

      let { results } = await this.fetchData(url);

      this.quiz = new Quiz(this.quizDom, qnumber, results);

      // console.log(results);
      // To check if the results from the API is OK...

      this.togglePages();
      // To display the questions card
    } catch (error) {
      location.reload();
      // return back to the main window to reset the settings

      alert(error);
      // maybe soon I'll have a time to replace this ugly alert by a beautiful modal
    }
  }

  async fetchData(url) {
    const response = await fetch(url);

    const results = await response.json();

    return results;
  }

  togglePages() {
    this.setting.style.display = "none";

    this.quizDom.style.display = "block";
    // To hide the settings card & show the questions card
  }

  getDifficulty() {
    const difficulty = this.difficulty.filter((e) => e.checked);
    if (difficulty.length == 1) {
      return difficulty[0].id;
    } else {
      alert("Please select the difficulty");
      // maybe soon I'll have a time to replace this ugly alert by a beautiful modal
    }
  }

  getQnumber() {
    if (this.number.value == "") {
      alert("Please enter a Number between 1 and 15");
      // maybe soon I'll have a time to replace this ugly alert by a beautiful modal
    } else {
      return this.number.value;
    }
  }
}

export default Settings;
