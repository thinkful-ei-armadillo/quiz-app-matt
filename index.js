'use strict';

// list of questions and choices with the correct answer
// only put questions in separate object so to not clutter STORE object
const QUESTIONS = [{
  q: 'What is 1+1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
},
{
  q: 'What is 1+1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: 2
}
];


const STORE = {
  userAnswers: [], // all of user's answers
  totalCorrect: 0, // number of correct answers
  totalWrong: 0,
  currentQuestion: 1, // current question
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

function reset(){
  STORE.userAnswers = [];
  STORE.totalCorrect = 0;
  STORE.totalWrong = 0;
  STORE.pageNumber = 0;
}

function removesQuestion(){
  $('question-form').remove();
}

function handlesSubmit() {
  $('.question-section').on('submit','.question-form',function(event){
    event.preventDefault();

    const ans1 = getUserAnswer();
    const  bol = answerChecker(ans1);

    generateFeedback(bol);
    removesQuestion();
    rendersFeedBack();
    increasePage();
  });
}

// check if answer is right or wrong AND INCREMENTS total correct and wrong accordingly
function answerChecker(input){
  const userAns = Number(input);

  console.log('checking your answer...');

  if(userAns === QUESTIONS[STORE.pageNumber-1].correctAnswer){
    STORE.totalCorrect++;
    return true;
  }
  else{
    STORE.totalWrong++;
    return false;
  }
}

// generate feedback page

function generateFeedback(boolean){
  if(boolean === true){
    return `<div class='feed-back'>
    <h2>Correct! </h2>
    <button type="button">Continue!</button>
    </div>`;
  }
  else{
    return `<div class='feed-back'>
    <h2>Incorrect! </h2>
    <p>The correct answer for ${QUESTIONS[STORE.pageNumber-1].q} is ${QUESTIONS[STORE.pageNumber-1].correctAnswer}
    <button type="button">Continue!</button>
    </div>`;
  }
}

function rendersFeedBack(){
  $('.feedback-page').html(generateFeedback());
}

function handleFeedbackButton(){
  $('.feedback.page').on('click','button', function(event){
    console.log('going to next question');
    rendersQuestions();
  });
  
}
// template generator 
function generateAnswerList(answers) {

}
//

function main() {
  removesIntro();
  handlesSubmit();
  handleFeedbackButton();

}

$(main);