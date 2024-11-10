let buttonColours=["red","blue","green","yellow"];

var gamePattern =[];

var userStep=[];

var started = false;
var level=0;

// click listener

$(".btn").click( function(){
   var userChoosenColour=  $(this).attr("id");
   userStep.push(userChoosenColour);
   console.log(userChoosenColour);
   playSound(userChoosenColour);
   animatePress(userChoosenColour);
   checkAnswer(userStep.length-1);
   });

//keypress listener

   $(document).on("keypress",function(){

      if(!started){
       $("h1").text("level "+level);
      nextSequence();
      started=true;
      }
      
    
   })
   

function nextSequence(){

   userStep=[];

   level++;
   $("h1").text("level "+level);

var randomNumber= Math.floor((Math.random(0,1)*4));
var chosenColor=buttonColours[randomNumber];
gamePattern.push(chosenColor);
playSound(chosenColor);
animatePress(chosenColor);

}


function playSound(name){
   $("#"+ name).fadeIn(100).fadeOut(100).fadeIn(100);
   var audio = new Audio("./sounds/"+name+".mp3");
   audio.play();
}

function animatePress(currentColour){
   var btnpressed= $("#"+currentColour);
 btnpressed.addClass("pressed");

setTimeout(function(){
   btnpressed.removeClass("pressed");  
},100);
}


function checkAnswer(currentLevel){
if(userStep[currentLevel]===gamePattern[currentLevel])
{
   console.log("Succes");
   if(userStep.length===gamePattern.length){

      setTimeout(function(){
         nextSequence();
      },1000);

      
   }

}
else{ 
console.log("wrong");
var audio = new Audio("./sounds/wrong.mp3");
audio.play();
$("body").addClass("game-over");

setTimeout(function(){
   $("body").removeClass("game-over");  
},200);


$("h1").text("Game Over, Press Any Key to Restart");

startOver();

}
}




function startOver(){
   level=0;
   gamePattern=[];
   started=false;
}

















function steps(){
console.log("Number of steps: "+gamePattern.length);
for( var i =0; i<gamePattern.length;i++){
   
   $("."+gamePattern[i]).fadeOut(100).fadeIn(100);
   var audio = new Audio("./sounds/"+gamePattern[i]+".mp3");
   audio.play();
   setTimeout(function(){ console.log("break")},3000);
   
}
}