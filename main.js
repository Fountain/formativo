const data = [
  {
    prompt: "Which of these is a valid array?",
    choices: [
      {
        body: 'var myFavoriteDay = ["Monday", "Saturday", "Friday"];',
        correct: true,
        code: true
      },
      {
        body: 'var myFavoriteFruits = ["banana", "cherry", "mango",];',
        correct: false,
        code: true
      },
      {
        body: 'var myFavoriteThings = ["banana", true, 35,];',
        correct: false,
        code: true
      }
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

// extract the question from the url
function questionNumber() {
  var urlParams = new URLSearchParams(window.location.search);
  var questionPresent = urlParams.has("q");
  var questionNumber = parseInt(urlParams.get("q"));
  if (questionPresent && questionNumber < data.length) {
    return (questionNumber = urlParams.get("q"));
  } else {
    console.log("invalid question. defaulting to first question");
    return (questionNumber = 0);
  }
}

function showQuestion(index, data) {
  document.getElementById("question").innerHTML = data[index].prompt;
  data[index].choices.forEach((choice, index) => {
    // create label
    let label = document.createElement("label");
    let wrapper;
    if (choice.code) {
      wrapper = document.createElement("code");
    } else {
      wrapper = document.createElement("span");
    }

    wrapper.innerHTML = " " + choice.body;
    // create radio button
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "choice");
    input.setAttribute("value", index);
    label.appendChild(input);
    label.appendChild(wrapper);
    document.getElementById("choices").appendChild(label);
  });

  // remove the focus from the next button
  document.getElementById("check-answer").blur();
}

function checkAnswer(questionNumber, data) {
  var choice = document.querySelector('input[name="choice"]:checked');
  let el = document.getElementById("response");
  if (!choice) {
    el.innerHTML = "Please select an answer.";
    el.setAttribute("class", "incorrect");
  } else if (choice && data[questionNumber].choices[choice.value].correct) {
    el.innerHTML = "Correct!";
    el.setAttribute("class", "correct");
    let question = document.getElementById("question");
    question.style.display = "none";
    let choices = document.getElementById("choices");
    choices.style.display = "none";
    let button = document.getElementById("check-answer");
    button.innerHTML = "Review";
    button.blur();
    button.onclick = () => resetQuestion(questionNumber, data);
  } else {
    el.innerHTML = "That's not correct";
    el.setAttribute("class", "incorrect");
  }
}

function setButton(questionNumber, data) {
  let button = document.getElementById("check-answer");
  button.innerHTML = "check answer";
  button.blur();
  button.onclick = () => checkAnswer(questionNumber, data);
}

function resetQuestion(questionNumber, data) {
  let el = document.getElementById("response");
  el.innerHTML = "";
  let button = document.getElementById("check-answer");
  button.innerHTML = "check answer";
  button.blur();
  button.onclick = checkAnswer;
  let question = document.getElementById("question");
  question.style.display = "block";
  let choices = document.getElementById("choices");
  choices.style.display = "block";
}

showQuestion(questionNumber(), data);
setButton(questionNumber(), data);
