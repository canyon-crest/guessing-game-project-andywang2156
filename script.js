// add javascript here
date.textContent = time();
setInterval(function() {
    date.textContent = time();
}, 1000);


// global vairables and constants
let score, answer, level, gameStart, sums, count, fast;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
const averageTime = document.getElementById("averageTime");

// event listener
enterName.addEventListener("click", nameStuff);
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpbtn.addEventListener("click", giveUp);

function nameStuff(){
    let userName = nameInput.value.charAt(0).toUpperCase() + nameInput.value.slice(1).toLowerCase();
    nameInput.textContent = userName;
    enterName.disabled = true; 
    nameInput.disabled = true;
    nameMsg.textContent = "Welcome: " + userName;
    return userName;
}

function time(){
    let d = new Date();
    let day = d.getDate();
    const monthArray = ["January", "February","March","April","May","June","July","August","September","October","November","December"];
    let month = monthArray[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;
    
    let suffix = "th";
    if (day %10 == 1 && day != 11){
        suffix = "st";
    }
    else if (day %10 == 2 && day != 12){
        suffix = "nd";
    }
    else if (day %10 == 3 && day != 13){
        suffix = "rd";
    }

    let completeDate = month + " " + day + suffix + ", " + year + " " + hour + ":" + minute + ":" + second;
    return completeDate
}

function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    giveUpbtn.disabled = false;
    for (let i = 0; i < levelArr.length; i++){
        levelArr[i].disabled = true;
        if (levelArr[i].checked){
            level = levelArr[i].value
        }
    }

    answer = Math.floor(Math.random()*level) + 1;
    msg.textContent = nameStuff() + ", Guess a number between 1-" + level;
    guess.placeholder = answer;
    score = 0;
    start = new Date().getTime();
    gameStart = start;
}

function makeGuess(){

    let userGuess = parseInt(guess.value);
    if (isNaN(userGuess)|| userGuess < 1 || userGuess > level) {
        msg.textContent = nameStuff() + ", INVALID, guess a number/number in the range!";
        return;
    }
    score++

    if(userGuess > answer) {
        msg.textContent = "Too high";
    } 
    else if (userGuess < answer) {
        msg.textContent = "Too low";
        if(userGuess >= (answer - Math.ceil(Math.sqrt(level))/2)){
            msg.textContent += " but Hot";
        }
        else if(userGuess >= (answer - Math.floor(Math.sqrt(level)))){
            msg.textContent += " but Warm";
        }
        else {
            msg.textContent += " and Cold";
        }
    } 
    else {
        msg.textContent = nameStuff() + ", you got it! It took you " + score + " guess(es).";
        if (score <= Math.log2(level)){
            goodness.textContent = "Your score is good";
        } else if (score <= 2*Math.log2(level)){
            goodness.textContent = "Your score is OK";
        } else {
            goodness.textContent = "Your score is bad";
        }
        reset();
        updateScore();
        Timer();
    }
}
function Timer() {
    let end = new Date().getTime();
    let timeTaken = (end - gameStart) / 1000;

    if (isNaN(sums)) sums = 0;
    if (isNaN(count)) count = 0;

    sums += timeTaken;
    count++;

    if (fast === undefined || timeTaken < fast) {
        fast = timeTaken;
    }

    goodness.textContent += " | Time: " + timeTaken.toFixed(2) + "s";
    averageTime.textContent = "Average time: " + (sums / count).toFixed(2) + "s | Fastest: " + fast.toFixed(2) + "s";
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
function giveUp(){
    msg.textContent = "You gave up, your score is " + level;
    score = level;
    reset();
    updateScore();
}

function updateScore(){
    scoreArr.push(score); //adds current score
    wins.textContent = "Total games: " + scoreArr.length;
    let sum = 0;
    scoreArr.sort((a, b) => a - b)
    const lb = document.getElementsByName("leaderboard");

    for (let i = 0; i < scoreArr.length; i++) {
        sum += parseInt(scoreArr[i])
        if (i < lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/parseInt(scoreArr.length)
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
}