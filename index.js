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
  <button type="submit" class="submit-button">Submit</button>
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
  let  anw2 = [STORE.totalCorrect,STORE.totalWrong];
  return anw2;
}

function handlesSubmit() {
  $('.question-section').on('submit','.question-form',function(event){
    event.preventDefault();
    console.log('handle submit ran');
    const ans1 = getUserAnswer();
    increasePage();
  });
}

// template generator 
function generateAnswerList(answers) {

}
//

function main() {
  removesIntro();
  
  handlesSubmit();

}

$(main);