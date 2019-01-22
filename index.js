'use strict';

// list of questions and choices with the correct answer
// only put questions in separate object so to not clutter STORE object
const QUESTIONS = [{
  q: 'What is 1+1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+2?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+3?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+4?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+5?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+6?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+7?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+8?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+9?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+10?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
}
];


const STORE = {
  userAnswers: [], // all of user's answers
  totalCorrect: 0, // number of correct answers
  totalWrong: 0,
  currentQuestion: -1, // current question
  pageNumber: 0,
};

// increments page # 
function increasePage() {
  STORE.pageNumber++;
}

// takes out intro
function removesIntro() {
  $('.intro-section').on('click', 'button', function (event) {
    $('.intro-section').remove();
    increasePage(); // intro page is page 0, so +1 when called to next page
    rendersQuestions(); // renders the questions
  });
}

// renders question
function generateQuestions() {
  let q = '';
  const correctWrong =getTotalCorrect();
  
  STORE.currentQuestion++;
  for (let i = 0; i < QUESTIONS[STORE.pageNumber - 1].choices.length; i++)
    q += `<input type="radio" name="a1" value="${QUESTIONS[STORE.pageNumber-1].choices[i]}" > ${QUESTIONS[STORE.pageNumber-1].choices[i]}<br>`;

  return `<form action="" class='question-form'>
  <h2>Question ${STORE.pageNumber}</h2>
  <p>${QUESTIONS[STORE.pageNumber-1].q}</p>
  ${q}
  <button type="submit" class="submit-button" data-submit='submit'>Submit</button>
</form>
<div class='correct-wrong'>${correctWrong[0]} correct, ${correctWrong[1]} wrong</div>
<footer>Page #${STORE.pageNumber}</footer>`;
}

function rendersQuestions() {
  if(STORE.pageNumber > 0)
    $('.question-section').html(generateQuestions());
}

function getUserAnswer(){
  const ans = $('input[name="a1"]:checked').val();
  STORE.userAnswers.push(ans);
  return ans;
}

// returns  the total correct and total wrong
function getTotalCorrect(){
  let anw2 = [STORE.totalCorrect,STORE.totalWrong];
  return anw2;
}

// resets the STORE object
function reset(){
  STORE.userAnswers = [];
  STORE.totalCorrect = 0;
  STORE.totalWrong = 0;
  STORE.pageNumber = 0;
}

function removesQuestion(){
  $('.question-form').remove();
}

function removesFeedback(){
  $('.feed-back').remove();
}

function handlesSubmit() {
  $('.question-section').on('submit','.question-form',function(event){
    event.preventDefault();

    const ans1 = getUserAnswer();
    const  bol = answerChecker(ans1);

    generateFeedback(bol);
    increasePage();
    removesQuestion();
    rendersFeedBack();
    
  });
}

// check if answer is right or wrong AND INCREMENTS total correct and wrong accordingly
function answerChecker(input){
  const userAns = Number(input);

  console.log('checking your answer...');
  
  if(userAns === QUESTIONS[STORE.pageNumber-1].correctAnswer){
    STORE.totalCorrect++;
    return 0;
  }
  else{
    STORE.totalWrong++;
    return 1;
  }
}

// generate feedback page

function generateFeedback(bool){
  console.log(bool);

  if(bool === 0)
    return `<div class='feed-back'>
      <h2>Correct! </h2>
      <button type="button">Continue!</button>
      </div>`;
  
  else
    return `<div class='feed-back'>
      <h2>Incorrect! </h2>
      <p>The correct answer for ${QUESTIONS[STORE.currentQuestion].q} is ${QUESTIONS[STORE.currentQuestion].correctAnswer}
      <button type="button">Continue!</button>
      </div>`;

}

function rendersFeedBack(){
  $('.feedback-page').html(generateFeedback());
}

function handleFeedbackButton(){
  $('.feedback-page').on('click','button', function(event){
    console.log('going to next question');
    if(STORE.currentQuestion === QUESTIONS.length)
      renderScorePage();
    else{
      removesFeedback();
      rendersQuestions();
    }
  });
}

// makes html for score page
function scorePage(){
  return `<div class='score-display'><h1>You got ${STORE.totalCorrect} out of ${QUESTIONS.length}</h1>
  <p>Do you want to try again?</p><span><button type="button">Ok</button></div>`;
}

function renderScorePage(){
  if(STORE.currentQuestion === QUESTIONS.length)
    $('.results').html(scorePage);
}

function removeScorePage(){
  $('.score-display').remove();
}

function handlesScoreReset(){
  $('.result').on('click','button',function(event){
    reset();
    removeScorePage();
    rendersQuestions();
  });
}


function main() {
  removesIntro();
  handlesSubmit();
  handleFeedbackButton();
  handlesScoreReset();
}

$(main);