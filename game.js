const buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = []; 
let level = 0;

// function to play song when user select a box or to play game over sound
function palySound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// reset all the variable values when the game is over
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

// for generating next sequence
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    let randomNum = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColor[randomNum];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(120, function(){
        $(this).fadeOut(120, function() {
            $(this).fadeIn(120);
        });
    })

    palySound(randomChosenColor);
    
}

// animation effect when user selects a box
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

// to check the user pattern is matching to game pattern
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function() {
                nextSequence();
            },1000);
        }
        
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        palySound("wrong");
        startOver();
        $("#level-title").text("Game Over! Press Any key to restart");
    }
}

// key board input to start or restart the game 
$(document).keydown(function() {
    if(level === 0) {
        nextSequence();
    } 
})

// handling mouse click on the box
$(".btn").click(function() {
    
    let userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    palySound(userChosenColour);
})

