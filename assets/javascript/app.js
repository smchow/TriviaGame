$(document).ready(function() {


      var correct = 0;
      var losses = 0;
      var incorrect = 0;
      var ind =0;
      var display = $("#display");
     // var status = document.querySelector("#gameStatus");
     // var details = document.querySelector("#details");
      var displayT = document.querySelector("#displayTime");
      var won = false;
      var Tcounter = 15;
      var number = 60;
      var counter;
      var first = true;
      //


    $("#show-number").html("<h2>" + number + " seconds remaining </h2>");
     //  Execute the run function.
    run();

  
    function run() {
      counter = setInterval(decrement, 1000);
      myTimeoutFunctionTemp(ind);
      ind++;
    }

    //  The decrement function.
    function decrement() {
      number--;
      $("#show-number").html("<h2>" + number + " seconds remaining </h2>");

      if (number === 0) {    
        stop();
        $("#show-number").html("<h2> Time's Up! </h2>");
      }
    }

    //  The stop function
    function stop() {
      clearInterval(counter);
      showResults();
    }

      //var sci_ind = -1;
      //display.innerHTML = "Welcome Welcome";
      
      //setInterval(myTimeoutFunction, 1000);
      
    
     /* function myTimeoutFunction(){
            console.log("counter - myTimeoutFunction" + Tcounter);

            displayT.innerHTML("00:"+ Tcounter);
            Tcounter--;
          }*/
      function showResults(){
          $("#chkButton").hide();
          var d = $("<div>");
            var textStr = "<br/>  Your Results: <br/> <br/> Correct Answers: " ;
            textStr += correct + " <br/><br/> ";
            textStr += "Incorrect/Unanswered: "
            textStr += 10-correct + " <br/>";
            d.html( textStr);
             display.empty();
            d.appendTo(display);
      }

      function myTimeoutFunctionTemp(ind){
        
           /* var d = $("<div>");

            d.text( "The correct answer is : " + trivia.correct_answer);
            d.appendTo(display);*/
        var trivia = getRandomName(ind);
        var n = 4;
        if (first ){
            n = 0;
        } else{
            n = 2;
        }
        first = false;
         
        setTimeout(function(){

        display.empty();
         $("#chkButton").show();
        var q = $("<div>").text(trivia.question);
        q.appendTo(display);
        var pos = Math.floor(Math.random()*3);
        //console.log(pos);
        for (var i = 0; i < 3 ; i++){
          
          //var radioBtn = $('<input type="radio" name="rbtnCount" />');
          

          //console.log(i,pos);
          if(i==pos){
            // debugger; 
            var parent = $("<div>");
            var d = $("<span>");
            //console.log(trivia.correct_answer );
            var x = trivia.correct_answer;
            d.text( trivia.correct_answer );
            var radioBtn = $('<input type="radio" type="rbtnCount" value=4 name="'+ x +  '" ">'  );
            radioBtn.appendTo(parent);
            d.appendTo(parent);
            parent.appendTo(display);
            
          }
            var parent = $("<div>");
            var d = $("<span>");
            d.text( trivia.incorrect_answers[i] );
            var radioBtn = $('<input type="radio" type="rbtnCount" value='+i + ' name='+ trivia.incorrect_answers[i] +  ' >');
            radioBtn.appendTo(parent);
            d.appendTo(parent);
            parent.appendTo(display);
        }
        //display.innerHTML = text;
        //radioBtn.appendTo(display);
      }, n*1000); 
        
        //setInterval(someFunction, 4000);
      }

      function someFunction(){
        display.innerHTML = "Some Text";
      }

      //Start game when button is clicked;
     // var x = document.getElementById("chkButton");

     // x.addEventListener("click", function(){ 
     $("#chkButton").on("click", function() {   
       /* var myScientist = getRandomName();
        document.getElementById("details").innerHTML = "";
        myScientist.playGame("");*/
        console.log("Remaining Time" + number);
        //if (first == false){
              //var myRadio = $('input[name=rbtnCount]');
               var myRadio = $('input[type=radio]');
              var correct_ans ="";
            
            for (var i = 0 ; i < 4; i++){
              
              //console.log(myRadio[i].checked);
              if (myRadio[i].value == "4"){
                  //debugger;
                  if (myRadio[i].checked == true){
                    correct_ans ="You are right! ";
                    correct++;
                  }
                  
                  //setTimeout(function(){ console.log("Hello"); }, 3000);
                  correct_ans += "The correct answer is " +  myRadio[i].name;
                  //debugger;
                  
              } else{
                  if (myRadio[i].checked == true){
                    incorrect++;
                    correct_ans = "You are wrong! " + correct_ans;
                  }
                  
                  //setTimeout(function(){ console.log("Hello"); }, 3000);
                  
                }
              }
            
            display.empty();
             $("#chkButton").hide();
            var d = $("<div>");
            
            d.text(  correct_ans );
            
            d.appendTo(display);
             
            //d.text( trivia.correct_answer);
            //var radioBtn = $('<input type="radio" name="rbtnCount" value='+i + ' >');
            //radioBtn.appendTo(display);
            
        //}
        //
        if (ind < 10 && number > 0){

          myTimeoutFunctionTemp(ind);
          
          
        } else{
          display.innerHTML = "Game Over";
        }
        ind++;

        $("button").click(function(){
            //alert("The button was clicked.");
            
        });
        
        // When user enters a letter play the game!
        /*document.onkeyup = function(event){
        if (myScientist.chkInput(event)){
          myScientist.playGame(event.key.toLowerCase());
          } 
        }*/
      });
    });



/* Creating scientist object and all related methods*/
function trivia(category, question, correct_answer, incorrect_answers) {
  this.category = category;
  this.question = question;
  this.correct_answer = correct_answer;
  this.incorrect_answers = incorrect_answers;
  this.guesses = [];
  this.guessCorrect = false;
  this.numGuesses = 10;
  this.error = " ";

    this.playGame =  function(key){

      
      if (this.numGuesses > 0 && !(this.guessCorrect) ){
            this.newGuess(key);
          	display.innerHTML = this.getPartWord() + "<br/> <br/>Your Letter Guesses: " + this.guesses + 
                                "<br/><br/> You have " +  + this.numGuesses + " guesses remaining!";
            gameStatus.innerHTML = "<br/> # of Correct Guesses : " + wins + "<br/> # of Incorrect Guesses : " + 
                            losses + "<br/>" + this.error;
     		}
 		};

    /*Update the guesses array and total number of guesses variable.
      Check if the user has exceeded the number of guesses and determine
      if they have lost. */
   this.newGuess = function(key){
   	  if (key==""){
   	  		return;
   	  }else if(this.guesses.indexOf(key) < 0){
   	  		this.guesses.push(key);
   	  		this.error = " ";
   	  } else{
   	  		this.error = "You have alreary picked this letter. Guess again";
   	  		return;
   	  }
   	  
   	  if(this.name.indexOf(key) <0) {
              this.numGuesses--;
        }
       if (this.numGuesses <= 0){
       			this.guessCorrect = false;
       			console.log("You Lost");
       			losses++;
       			this.toggleDetails();
       }
   }

   /* Check which letters have been guessed correctly and display the partially completed
     word on the screen. Check if the player has won in the end*/
  this.getPartWord = function(){
            dispWord ="";
            wordarr = this.name;

            for(i = 0; i < wordarr.length; i++){          
                if (this.guesses.indexOf(wordarr[i]) > -1){
                  dispWord = dispWord + wordarr[i] ;
                }else{
                  dispWord = dispWord + "- ";
                }       
            }
            if (wordarr==dispWord){
                this.whenCorrect();
            }
            return dispWord;
      };


   /* When the user guesses the correct word increment number of wins
   */
   this.whenCorrect = function(){
   			this.guessCorrect = true;
      		wins++;
      		this.toggleDetails();
   }

    /* Checks user input, only allows a-z or A-Z
    */
   this.chkInput = function(event){ 
       if(event.which >= 65 && event.which <=122){  
          	return true;  
         } else {   
         	return false;  
         }  
      }


  /* Display some extra details about the scientist.
  Called once the word has been guessed or user has used up all guesses.*/
  this.toggleDetails = function () {
    display.innerHTML =  "";
    var msg = "";
    if(this.guessCorrect) 
      msg = "You rock! ";
    else
      msg = "Oops! You couldn't guess the scientist! ";

    details.innerHTML =  msg +
           "<br/><img class='detailImg' src='" + this.imgFile + "'</img>"  + "<br/>Name: " +
           this.fname + "<br/>Famous for: " + this.ach ;
           // +"<br/>For more information " +
           //'<a href="'+this.url+'" target="_blank">click here.</a>'
  };
  
}// End tag - scientist object

/*function run(){
            myTimer = setInterval(decrement, 1000);
      }

      function increment(){
          counter++;
          $("#display").html("00:"+ counter);
      }

      function stop(){
        console.log("stop");
        clearInterval(myTimer);
      }
      function reset(){
        clearInterval(myTimer);
        counter = 0;
        $("#display").html("00:"+ counter);
      }*/


var text =  '{"response_code":0,"results":[{"category":"Geography","type":"multiple","difficulty":"easy","question":"What is the capital of the American state of Arizona?","correct_answer":"Phoenix","incorrect_answers":["Montgomery","Tallahassee","Raleigh"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"Which state of the United States is the smallest?","correct_answer":"Rhode Island ","incorrect_answers":["Maine","Vermont","Massachusetts"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"What is the capital of Indonesia?","correct_answer":"Jakarta","incorrect_answers":["Bandung","Medan","Palembang"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"How many counties in the Republic of Ireland.","correct_answer":"26","incorrect_answers":["32","28","30"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"What is the capital of Jamaica?","correct_answer":"Kingston","incorrect_answers":["San Juan","Port-au-Prince","Bridgetown"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"What is the name of the capital of Turkey?","correct_answer":"Ankara","incorrect_answers":["Istanbul","Izmir","Bursa"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"What is the capital of Australia?","correct_answer":"Canberra","incorrect_answers":["Sydney","Melbourne","Brisbane"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"What African country has Portuguese as its official language?","correct_answer":"Mozambique","incorrect_answers":["Botswana","Gabon","Togo"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"Which of these is NOT an island that is part of the Philippines?","correct_answer":"Java","incorrect_answers":["Luzon","Mindanao","Palawan"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"What is the capital of the US state Nevada?","correct_answer":"Carson City","incorrect_answers":["Las Vegas","Henderson","Reno"]}]}';
//  '{"name":"", "fname":"", "ach": ""},'+    


var obj = JSON.parse(text);
//var sci_ind = 0;
/* 
**Generate a random number and 
**Return the scientist at that position from the JSON
*/
function getRandomName(sci_ind){ 
   //debugger;
   console.log(sci_ind)
  //sci_ind = Math.floor(Math.random()*obj.results.length);
  sci = obj.results[sci_ind];
  /*console.log(sci);
  console.log(sci_ind);
  sci_ind++;
  if ( sci_ind >= 10){
    sci_ind = 0;
  }*/
  var pickedSci = new trivia(sci.category, sci.question, sci.correct_answer, sci.incorrect_answers);
  return pickedSci;
}
