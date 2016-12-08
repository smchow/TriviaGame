
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


  /* The user has entered a letter . So start playing and give feedback to the user*/
    this.playGame =  function(key){

      //console.log("Should I continue" + this.guessCorrect + "Guesses = "  + this.numGuesses);
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
      if they have lost. Win logic in getPartWord() */
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


var text =  '{"response_code":0,"results":[{"category":"Geography","type":"multiple","difficulty":"easy","question":"What is the capital of the American state of Arizona?","correct_answer":"Phoenix","incorrect_answers":["Montgomery","Tallahassee","Raleigh"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"Which state of the United States is the smallest?","correct_answer":"Rhode Island ","incorrect_answers":["Maine","Vermont","Massachusetts"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"What is the capital of Indonesia?","correct_answer":"Jakarta","incorrect_answers":["Bandung","Medan","Palembang"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"How many counties in the Republic of Ireland.","correct_answer":"26","incorrect_answers":["32","28","30"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"What is the capital of Jamaica?","correct_answer":"Kingston","incorrect_answers":["San Juan","Port-au-Prince","Bridgetown"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"What is the name of the capital of Turkey?","correct_answer":"Ankara","incorrect_answers":["Istanbul","Izmir","Bursa"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"What is the capital of Australia?","correct_answer":"Canberra","incorrect_answers":["Sydney","Melbourne","Brisbane"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"What African country has Portuguese as its official language?","correct_answer":"Mozambique","incorrect_answers":["Botswana","Gabon","Togo"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"Which of these is NOT an island that is part of the Philippines?","correct_answer":"Java","incorrect_answers":["Luzon","Mindanao","Palawan"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"What is the capital of the US state Nevada?","correct_answer":"Carson City","incorrect_answers":["Las Vegas","Henderson","Reno"]}]}';
//  '{"name":"", "fname":"", "ach": ""},'+    


var obj = JSON.parse(text);
var sci_ind = 0;
/* 
**Generate a random number and 
**Return the scientist at that position from the JSON
*/
function getRandomName(){ 
   debugger;
  //sci_ind = Math.floor(Math.random()*obj.results.length);
  sci = obj.results[sci_ind];
  console.log(sci);
  console.log(sci_ind);
  sci_ind++;
  if ( sci_ind >= 10){
    sci_ind = 0;
  }
  var pickedSci = new trivia(sci.category, sci.question, sci.correct_answer, sci.incorrect_answers);
  return pickedSci;
}
