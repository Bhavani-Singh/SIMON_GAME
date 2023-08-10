const buttonColor = ["red", "blue", "green", "yellow"];
const gamePattern = [];

function nextSequence() {
    let randomNum = Math.floor(Math.random() * 4);
    // console.log(randomNum);
    let randomChosenColor = buttonColor[randomNum];

    gamePattern.push(randomChosenColor);

}