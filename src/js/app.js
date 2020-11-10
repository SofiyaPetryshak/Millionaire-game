const impQuestions = [...window.questions];
const startBtn = document.getElementById('start_btn');
const skipBtn = document.getElementById('skip_btn');
const startCard = document.getElementById('start_card');
const questionCard = document.getElementById('question_card');
const currQuestion = document.getElementById('question');
const answers = document.getElementById('options');
const optionA = document.getElementById('A');
const optionB = document.getElementById('B');
const optionC = document.getElementById('C');
const optionD = document.getElementById('D');
const gameResults = document.getElementById('results')
const currentPrize= document.getElementById('current_prize')
const totalPrize= document.getElementById('total_prize')
const youlostCard = document.getElementById('youlost_card');
const youwonCard = document.getElementById('youwon_card');
const gameoverPrize = document.getElementById('gameover_prize');

let shuffledQuestions, currentQuestionIndex;
let score, totalScore;

startBtn.addEventListener('click', startGame);
skipBtn.addEventListener('click', skipQuestion);

function startGame() {
  startCard.classList.add('hide');
  youlostCard.classList.add('hide');
  youwonCard.classList.add('hide');
  questionCard.classList.remove('hide');
  gameResults.classList.remove('hide');

  clearScore();
  updateScore();
  shuffledQuestions = impQuestions.sort(() => Math.random() - 0.5);
  console.log(impQuestions);
  currentQuestionIndex = 0;
  setNextQuestion();
  startBtn.disabled = true; 
  skipBtn.disabled = false;
}

function clearScore(){
    score = 100;
    totalScore = 0;
}

function checkAnswer(answer){
    if(shuffledQuestions[currentQuestionIndex].correct === answer){
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
}

function answerIsCorrect(){
    score*=2;
    totalScore+=score;
    questionCard.classList.add('correct');
    currentQuestionIndex++
    if(totalScore >= 1000000){
        youWon();
    } else{
        setTimeout(nextRound, 1500)
    }
}
function youWon(){
    questionCard.classList.add('hide')
    youwonCard.classList.remove('hide')
    startBtn.disabled = false; 
    updateScore();
    skipQuestion.disabled = true;
}
function youLost(){
    gameoverPrize.innerHTML = totalScore;
    gameResults.classList.add('hide');
    questionCard.classList.add('hide')
    youlostCard.classList.remove('hide')
    startBtn.disabled = false; 
    skipBtn.disabled = true;
    updateScore();
}
function answerIsWrong(){
    questionCard.classList.add('wrong');
    setTimeout(youLost, 1500);
}

function clearStatus(){
    questionCard.classList.remove('wrong');
    questionCard.classList.remove('correct');
}

function setNextQuestion() {
    clearStatus()
    displayQuestion(shuffledQuestions[currentQuestionIndex]);

}
function updateScore(){
    currentPrize.innerHTML= score;
    totalPrize.innerHTML = totalScore;
}
function nextRound(){
    setNextQuestion();
    updateScore();
}

function displayQuestion(question) {
  currQuestion.innerHTML = question.question;
  optionA.innerHTML = question.content[0]
  optionB.innerHTML = question.content[1]
  optionC.innerHTML = question.content[2]
  optionD.innerHTML = question.content[3]
}

function skipQuestion() {
    currentQuestionIndex++;
    setNextQuestion();
    skipBtn.disabled = true;
}
