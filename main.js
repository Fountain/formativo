const data = [
  {
    prompt: "Which of these is a valid array?",
    choices: [
      {
        body: 'var myFavoriteDay = ["Monday", "Saturday", "Friday"];',
        correct: true
      },
      {
        body: 'var myFavoriteFruits = ["banana", "cherry", "mango",];',
        correct: false
      },
      { body: 'var myFavoriteThings = ["banana", true, 35,];', correct: false }
    ],
    type: "single-choice"
  },
  {
    prompt: "What is the best fruit?",
    choices: [
      { body: "pear", correct: true },
      { body: "apple", correct: false },
      { body: "banana", correct: false }
    ],
    type: "single-choice"
  }
];

var urlParams = new URLSearchParams(window.location.search);
var questionPresent = urlParams.has("q");
var questionNumber = parseInt(urlParams.get("q"));
if (questionPresent && questionNumber < data.length) {
  question = urlParams.get("q");
} else {
  console.log("invalid question. defaulting to first question");
  question = 0;
}

function showQuestion(index, data) {
  document.getElementById("question").innerHTML = data[index].prompt;
  data[index].choices.forEach((choice, index) => {
    // create label
    let label = document.createElement("label");
    let span = document.createElement("span");
    span.innerHTML = " " + choice.body;
    // create radio button
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "choice");
    input.setAttribute("value", index);
    label.appendChild(input);
    label.appendChild(span);
    document.getElementById("choices").appendChild(label);
  });

  // remove the focus from the next button
  document.getElementById("check-answer").blur();
}

function checkAnswer() {
  var choice = document.querySelector('input[name="choice"]:checked');
  if (!choice) {
    console.log("please choose an answer");
  } else if (choice && data[questionNumber].choices[choice.value].correct) {
    console.log("Correct");
  } else {
    console.log("That's not correct");
  }
}

showQuestion(question, data);
