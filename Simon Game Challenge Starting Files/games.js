var userClickedPattern = [];

var gamePattern = [];

//array of colors to choose from
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;


// this is for when a key is pressed , the nextSequence() is called and we change the text of the H1 while also turning started to true
$(document).keypress(function() {

  if (!started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
    console.log(gamePattern)
  }

});


// when the div is clicked
$(".btn").click(function() {

  // this variable takes the id of the button
  var userChosenColor = this.id;
  // var userChosenColor = $(this).attr("id");


  // this pushes the button id variable into an array
  userClickedPattern.push(userChosenColor);
  playSounds(userChosenColor);

  // lights up the square when a user clicks
  animatePress(userChosenColor);
  //compares the answer to the game pattern
  checkAnswer(userClickedPattern.length - 1);
});


// function selects a random number between 0 & 3
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  // this will choose a random color from the buttonColors array
  var randomChosenColor = buttonColors[randomNumber];

  // this pushes the randomChosenColor item into the gamePattern array
  gamePattern.push(randomChosenColor);

  // this makes a flash on the buttons when games starts
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSounds(randomChosenColor);

  level++;

  $("#level-title").text("Level " + level);

  userClickedPattern = [];

}

//This plays the sound for each color
function playSounds(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

// This makes the class pressed appear & disappear , this makes the square light up when pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    console.log(userClickedPattern);

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    // console.log(gamePattern);

  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over press any key to start again!");
    startOver();
    console.log("wrong");
  }
}

function startOver(){
  started = false;
  level = 0;
  gamePattern =[];

}
