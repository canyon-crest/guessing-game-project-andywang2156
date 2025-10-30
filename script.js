// add javascript here
date.textContent = time();

// global vairables and constants
let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
// event listener
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);

function time(){
    let d = new Date();
    // concatenate the date and time
    str = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear();

    return str;
}

function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    for (let i = 0; i < levelArr.length; i++){
        levelArr[i].disabled = true;
        if (levelArr[i].checked){
            level = levelArr[i].value
        }
    }

    answer = Math.floor(Math.random()*level) + 1;
    msg.textContent = "Guess a number between 1-" + level;
    guess.placeholder = answer;
    score = 0;

}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if (isNaN(userGuess)|| userGuess < 1 || userGuess > level) {
        msg.textContent = "INVALID, guess a number!";
        return;
    }
    score++

    if(userGuess > answer) {
        msg.textContent = "Too high";
    } 
    else if (userGuess < answer) {
        msg.textContent = "Too low";
    } 
    else {
        msg.textContent = "You got it! It took you " + score + " guesses.";
        reset();
        updateScore();
    }
}

function reset(){
    guessBtn.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    playBtn.disabled = false;
    guess.disabled = true; 
    for (let i = 0; i < levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}

function updateScore(){
    scoreArr.push(score); //adds current score
    wins.textContent = "Total wins: " + scoreArr.length;
    let sum = 0;
    scoreArr.sort((a, b) => a - b)
    const lb = document.getElementsByName("leaderboard");

    for (let i = 0; i < scoreArr.length; i++) {
        sum += scoreArr[i]
        if (i < lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
}