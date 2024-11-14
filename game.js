const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;
let countdownInterval;


$(document).on("keypress click", function () {
    if (!started) {
        startGame();
    }
});


function startGame() {
    level = 0;              
    gamePattern = [];        
    started = true;          
    $("h1").text("Level " + level);
    nextSequence();
}


function nextSequence() {
    userPattern = [];        
    level++;
    $("h1").text("Level " + level);

    const randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour); 
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(name) {
    const audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


$(".btn").click(function () {
    if (started) {
        const userChosenColour = $(this).attr("id");
        userPattern.push(userChosenColour); 
        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userPattern.length - 1);
    }
});


function checkAnswer(currentIndex) {
    if (userPattern[currentIndex] === gamePattern[currentIndex]) {
       
        if (userPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000); 
        }
    } else {
        promptRestart(); 
    }
}


function promptRestart() {
    playSound("wrong"); 
    $("body").addClass("game-over"); 
    $("h1").text("Game Over! Press Any Key or Click to Continue."); 

  
    $(document).one("keypress click", startCountdown);
}


function startCountdown() {
    $("body").removeClass("game-over"); 
    let countdown = 3;
    $("h1").text("Game over, Restarting in " + countdown + "...");

    countdownInterval = setInterval(function () {
        countdown--;
        if (countdown > 0) {
            $("h1").text("Game over, Restarting in " + countdown + "...");
        } else {
            clearInterval(countdownInterval); 
            location.reload(); 
        }
    }, 600);
}
