//Create a question bank
// to add more questions just copy and paste this array for x amount of times
// gl dont stress literally follow step by step
var questions = [
    {
        question: "Who said 'Bears, Beets, Battlestar Galactica'?",
        answer: 'Jim',
        // if you want more choices just add more "" for choices
        choices: ['Jim', "Michael", "Dwight", "Ryan"],
        // leave this as blank string
        userAnswer: ""
    }, 
    {
        question: "Where did Jim engage to Pam?",
        answer: 'The Gas Station',
        // if you want more choices just add more "" for choices
        choices: ['The Gas Station', "Dunder Mifflin", "Their House", "Toby's going away party"],
        // leave this as blank string
        userAnswer: ""

    }, 
    {
        question: "What is Stanely's favorite day?",
        answer: 'Pretzle day',
        // if you want more choices just add more "" for choices
        choices: ['Pretzle day', "Valentines Day", "Christmas", "Halloween"],
        // leave this as blank string
        userAnswer: ""
    }, 
    {
        question: "What item of Dwight's did Jim put in jello?",
        answer: 'His Stapler',
        // if you want more choices just add more "" for choices
        choices: ['His Stapler', "His Cell Phone", "His Glasses", "His Watch"],
        // leave this as blank string
        userAnswer: ""
    }, 
    {
        question: "Who said 'Did I Stutter'?",
        answer: 'Stanely',
        // if you want more choices just add more "" for choices
        choices: ['Stanely', "Kelly", "Kevin", "Angela"],
        // leave this as blank string
        userAnswer: ""
    }, 
    {
        question: "What was the worst part of prison?",
        answer: 'The Dementors',
        // if you want more choices just add more "" for choices
        choices: ['The Dementors', "The Inmates", "The Beds", "The Gruel"],
            // leave this as blank string
        userAnswer: ""
     },
     {
        question: "Who won best costume in the halloween costume contest?",
        answer: 'Oscar',
        // if you want more choices just add more "" for choices
        choices: ['Oscar', "Kelly", "Creed", "Pam"],
            // leave this as blank string
        userAnswer: ""
     },
     {
        question: "What is the name of Angela's cat that Dwight mercy killed?",
        answer: 'Sprinkles',
        // if you want more choices just add more "" for choices
        choices: ['Sprinkles', "Garbage", "Bandit", "Fluffy"],
            // leave this as blank string
        userAnswer: ""
     }
];


// Function to print all questions to the page
function renderQuestion(){
    //hiding the quiz form till user hit start function
    $("#quiz-form").hide();

    //loops thru questions in array
    questions.forEach(function(question, index){
        //create div to hold questions
        var $question = $("<div>").addClass("form-group text-center qtext");//how does it know difference between var question and question in the array???

        //adds question to the div 
         var label = $("<h2>").text(question.question).appendTo($question);//shouldnt it be questions.question? why cant i put var infront of label???

        //shuffles the questions in array (.5 shuffles the ?)
        question.choices = question.choices.sort(function(){
            return .5 - Math.random(); 
        });

        //creating loop to iterate through questions choices and creating radio buttons for each one
        for(var i=0; i < question.choices.length; i++){
            //creating a div for choice and adds bootstrap classes
            var choice = $("<div>");
            choice.addClass("form-check form-check-inline atext");
            
            //creating input tag for radio button
            var radio = $("<input>"); 

            //adds attributes to provide answer choices
            //"name" attr is super important, all radio buttons per question need to have the same "name" so they know what question it applies to
            radio.attr({
                type: "radio",
                value: question.choices[i],
                name: index, //index is a "reserved" word
                class: "form-check-input"
            })
            .appendTo(choice);

            //creating label to print to choices to page
            var choiceLabel = $("<label>");
            choiceLabel.text(question.choices[i])
            .addClass("form-check-label")
            .appendTo(choice);

            //adding whole radio button choice to question
            choice.appendTo($question)

        }
        //when done makingn all the choices, add whole question to the page
        //difference between append and appendTo is targeting a specific target
        $("#quiz-form").append($question) 
        
    });
}

//creat on "change" listener for all radio buttons but bind them to quiz-form since its permanently on the page
$("#quiz-form").on("change", ".form-check-input", function(){
    console.log(this);

    // GET question index out of the "name" attr so we know what question you answered
    var questionIndex = $(this).attr("name");
    console.log(questions[questionIndex]);

    //get value out of radio button you have selected
    var answer = $(this).val();
    console.log(answer)

    //sets answer to questions's useranswer property
    questions[questionIndex].userAnswer = answer;

});

//sets variables for time intervals, right and wrong answers
var time = 60;
var intervalId;
var rightAnswer = 0;
var wrongAnswer = 0; 

//startbtn to run the time and Game
$("#startBtn").on("click", function(){
    //removes display none class from jumbotron
    $("#quiz-tron").removeClass("d-none")
    //once user hits startbtn game form will show
    $("#quiz-form").show();

    //start time functions runs with these values
    start();

    //take the timer and decrements it by one second
    function decrement(){
        time--;
        //Prints timer to page
        $("#timer").text("Quiz will end in:" + (time));
        
        //if timer hits 0 STOP game and stops clock
        if (time === 0){
            stop();
            // Form to go away
            // clock stops
            // number of correct/incorrect get displayed
            // $("#quiz-tron").addClass("d-none")


            //checking user answer-using the loop to run thru every question not just one question
            for(var i = 0; i < questions.length; i++){

                //if user answer = answer increment right ans
                if(questions[i].userAnswer === questions[i].answer){
                    rightAnswer++;
                }
                //else increment wrong ans by 1
                else{
                    wrongAnswer++;
                }
            }
            //print right and wrong ans to page
            $("#rightAnswer").text(rightAnswer);
            $("#wrongAnswer").text(wrongAnswer);
        }
    }

    //clock start function and setInterval id to decrement by 1 sec(in miliseconds)
    function start(){
        time = 60
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    //stops clock when hits 0 and clears the intervalId
    function stop(){
        clearInterval(intervalId);
        console.log("stop")
    }


})
renderQuestion();