'use strict';

// list of questions and choices with the correct answer
// only put questions in separate object so to not clutter STORE object
const QUESTIONS = [{
  q: 'What is 1 + 1?',
  choices: [1, 2, 3, 4, 5],
  correctAnswer: '2'
},
{
  q: 'What is 3 * 2?',
  choices: [2, 4, 6, 8, 10],
  correctAnswer: '6'
},
{
  q: 'What is derivative of ln(x)?',
  choices: ['1/x', 'x', '2x', '1/2x', '2/3'],
  correctAnswer: '1/x'
},
{
  q: 'Prove the Bolzano–Weierstrass theorem',
  choices: ['Bolzano what??', '42', 'Let epsilon > 0...', "I don't work in the real plane", 'Proof is trival and left to the reader'],
  correctAnswer: 'Proof is trival and left to the reader'
},
{
  q: 'What is the residue of  1/(z(cos(z)) at 0?',
  choices: ['1/2', '1/3', '1/5', '1/6', '1/7'],
  correctAnswer: '1/6'
},
{
  q: 'Find the gcd (435,377)',
  choices: ['12', '15', '14', '12', '29'],
  correctAnswer: '29'
},
{
  q: 'Prove there are infinitely many primes?',
  choices: ['Proof by contradiction...QED', 'There just are', 'There are not', 'Taco', 'Potato'],
  correctAnswer: 'Proof by contradiction...QED'
},
{
  q: 'How many sides does a n-gon have?',
  choices: ['no sides', '3', 'not enough', 'too many', 'n many'],
  correctAnswer: 'n many'
},
{
  q: 'What is 1+9?',
  choices: ['11', '20', '13', '10', '12'],
  correctAnswer: '10'
},
{
  q: 'What is 0!?',
  choices: ['1', '0', '-1', '1.1', '-1.1'],
  correctAnswer: '1'
}
];

const STORE = {
  totalCorrect: 0, // number of correct answers
  totalWrong: 0,
  currentQuestion: -1, // current question. needed to make -1 since it is initially incremented and needs to match QUESTION index
  pageNumber: 0,
};

// function to shuffle QUESTIONS
function randQuestions(){
  for(let i = 0; i < QUESTIONS.length; i++){
    const position = Math.floor(Math.random() * 9);
    const temp = QUESTIONS[position];
    QUESTIONS[position] = QUESTIONS[i];
    QUESTIONS[i] = temp;
  }
}

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
  const correctWrong = getTotalCorrect();
  
  STORE.currentQuestion++;
  for (let i = 0; i < QUESTIONS[STORE.pageNumber - 1].choices.length; i++)
    q += `<input type="radio" name="a1" value="${QUESTIONS[STORE.pageNumber-1].choices[i]}" required > ${QUESTIONS[STORE.pageNumber-1].choices[i]}<br>`;

  return `<form action="" class='question-form'>
  <h2>Question ${STORE.pageNumber}</h2>
  <p>${QUESTIONS[STORE.pageNumber-1].q}</p>
  ${q}
  <button type="submit" class="submit-button" data-submit='submit'>Submit</button>
  <div class='correct-wrong'>${correctWrong[0]} correct, ${correctWrong[1]} wrong</div>
<footer>Page #${STORE.pageNumber}</footer>
</form>
`;
}

function rendersQuestions() {
  if(STORE.pageNumber > 0 && STORE.pageNumber < 11)
    $('.question-section').html(generateQuestions());
}

function getUserAnswer(){
  const ans = $('input[name="a1"]:checked').val();
  return ans;
}

// returns  the total correct and total wrong
function getTotalCorrect(){
  let anw2 = [STORE.totalCorrect,STORE.totalWrong];
  return anw2;
}

// resets the STORE object
function reset(){
  STORE.totalCorrect = 0;
  STORE.totalWrong = 0;
  STORE.pageNumber = 0;
  STORE.currentQuestion = 0;
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

    increasePage();
    removesQuestion();
    rendersFeedBack(generateFeedback(bol),bol);
    
  });
}

// check if answer is right or wrong AND INCREMENTS total correct and wrong accordingly
function answerChecker(input){
  const userAns = input;

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

function generateFeedback(bool){

  if(bool === true){
    return `<div class='feed-back'>
      <h2>Correct! </h2>
      <button type="button">Continue!</button>
      </div>`;
  }
  else{
    return `<div class='feed-back'>
      <h2>Incorrect! </h2>
      <p>The correct answer for "${QUESTIONS[STORE.currentQuestion].q}" is ${QUESTIONS[STORE.currentQuestion].correctAnswer}!
      <button type="button">Continue!</button>
      </div>`;
  }

}

function rendersFeedBack(html,bool){
  $('.feedback-page').html(generateFeedback(bool));
}

function handleFeedbackButton(){
  $('.feedback-page').on('click','button', function(event){
    if(STORE.pageNumber > QUESTIONS.length){
      renderScorePage();
      removesFeedback();
    }
    else{
      removesFeedback();
      rendersQuestions();
    }
  });
}

// makes html for score page
function scorePage(){
  return `<div class='score-display'><h1>You got ${STORE.totalCorrect} out of ${QUESTIONS.length}</h1>
  <p>Do you want to try again?</p><span><button type="button" class='reset'>Ok</button></div>`;
}

function renderScorePage(){
  $('.results').html(scorePage);
}

function removeScorePage(){
  $('.score-display').remove();
}

function handlesScoreReset(){
  $('.results').on('click','.reset',function(event){
    console.log('reset is being clicked');
    reset();
    removeScorePage();
    increasePage();
    rendersQuestions();
    randQuestions();
  });
}

function main() {
  removesIntro();
  handlesSubmit();
  handleFeedbackButton();
  handlesScoreReset();
}

$(main);