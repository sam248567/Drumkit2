var numberOfDrums = document.querySelectorAll(".drum").length;

function handleClick(){
    // this.style.color = "white";
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
}
    

for(var i=0;i<numberOfDrums;i++)
{
    document.querySelectorAll(".drum")[i].addEventListener("click",handleClick);
}

document.addEventListener("keypress",function(event){
    // console.log(event);
    makeSound(event.key);
    buttonAnimation(event.key);
    // alert("Key was pressed");
});


function makeSound(key){

    switch(key){
        case "w":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
    
        case "a":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;
        
        case "s":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;

        case "d":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;

        case "j":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;

        case "k":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;

        case "l":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;
        default: console.log();
    }
}


function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("."+currentKey);

    activeButton.classList.add("pressed");

    setTimeout(function(){
        activeButton.classList.remove("pressed");
    },50);
}


// ---------------------------






//  FIREWORKS :


// Drum beat patterns for each level
var drumPatterns = [
    ["w", "a", "s", "d"], // Level 1 pattern
    ["j", "k", "l"],       // Level 2 pattern
    ["w", "s", "j", "l"],  // Level 3 pattern
    // Add more patterns for additional levels if desired
  ];
  
  var currentLevel = 0; // The current level index
  var currentStep = 0;  // The current step in the pattern for the current level
  var learningModeActive = false; // Boolean flag to indicate if Learning Mode is active
  var level3Completed = false; // Boolean flag to track if Level 3 is completed
  
  // Function to start or stop the Learning Mode
  function toggleLearningMode() {
    learningModeActive = !learningModeActive;
  
    if (learningModeActive) {
      document.getElementById("learningMode").innerText = "Stop Learning Mode";
      currentLevel = 0;
      currentStep = 0;
      updatePatternDisplay();
      addDrumButtonEventListeners(); // Add event listeners here
      addKeyboardEventListeners(); // Add keyboard event listeners here
    } else {
      document.getElementById("learningMode").innerText = "Start Learning Mode";
      clearPatternDisplay();
      removeDrumButtonEventListeners(); // Remove event listeners here
      removeKeyboardEventListeners(); // Remove keyboard event listeners here
    }
  }
  
  // Function to display the current pattern for the user to follow
  function updatePatternDisplay() {
    var patternDisplay = document.getElementById("patternDisplay");
    patternDisplay.innerText = "Level " + (currentLevel + 1) + " Pattern: " + drumPatterns[currentLevel].join(" ");
  }
  
  // Function to clear the pattern display area
  function clearPatternDisplay() {
    var patternDisplay = document.getElementById("patternDisplay");
    patternDisplay.innerText = "";
  }
  
  // Function to check if the user plays the correct drum in the pattern
  function checkPattern(drumKey) {
    if (learningModeActive) {
      var currentPattern = drumPatterns[currentLevel];
      var expectedKey = currentPattern[currentStep];
  
      if (drumKey === expectedKey) {
        currentStep++;
        if (currentStep === currentPattern.length) {
          currentLevel++;
          currentStep = 0;
          if (currentLevel >= drumPatterns.length) {
            // If completed all levels, show congratulatory message and fireworks
            if (!level3Completed) {
              level3Completed = true;
              showCongratulatoryMessage();
            }
          } else {
            updatePatternDisplay();
          }
        }
      } else {
        // If the user plays the wrong drum, reset the level
        currentLevel = 0;
        currentStep = 0;
        updatePatternDisplay();
      }
    }
  }
  
  // Function to show the congratulatory message with fireworks
  function showCongratulatoryMessage() {
    var messageContainer = document.getElementById("congratulatoryMessage");
    messageContainer.innerText = "Congratulations! You completed all levels!";
    messageContainer.style.display = "block";
  
    // Trigger fireworks animation
    var fireworksContainer = document.getElementById("fireworks");
    fireworksContainer.innerHTML = "";
  
    for (let i = 0; i < 30; i++) {
      var firework = document.createElement("div");
      firework.classList.add("firework");
      firework.style.left = Math.random() * 100 + "vw";
      firework.style.top = Math.random() * 100 + "vh";
      fireworksContainer.appendChild(firework);
    }
  
    setTimeout(() => {
      fireworksContainer.innerHTML = "";
      messageContainer.style.display = "none";
    }, 3000); // Duration for fireworks animation and message display
  }
  
  // Function to add event listeners for drum buttons during Learning Mode
  function addDrumButtonEventListeners() {
    var drumButtons = document.querySelectorAll(".drum");
    for (var i = 0; i < drumButtons.length; i++) {
      drumButtons[i].addEventListener("click", drumButtonClickHandler);
    }
  }
  
  // Function to remove event listeners from drum buttons when Learning Mode is stopped
  function removeDrumButtonEventListeners() {
    var drumButtons = document.querySelectorAll(".drum");
    for (var i = 0; i < drumButtons.length; i++) {
      drumButtons[i].removeEventListener("click", drumButtonClickHandler);
    }
  }
  
  // Event handler for drum button clicks
  function drumButtonClickHandler(event) {
    var drumKey = event.target.innerText;
    makeSound(drumKey);
    buttonAnimation(drumKey);
    checkPattern(drumKey);
  }
  
  // Function to add event listeners for keyboard keys during Learning Mode
  function addKeyboardEventListeners() {
    document.addEventListener("keypress", keyboardKeyPressHandler);
  }
  
  // Function to remove event listeners from keyboard keys when Learning Mode is stopped
  function removeKeyboardEventListeners() {
    document.removeEventListener("keypress", keyboardKeyPressHandler);
  }
  
  // Event handler for keyboard key presses
  function keyboardKeyPressHandler(event) {
    var drumKey = event.key.toLowerCase();
    makeSound(drumKey);
    buttonAnimation(drumKey);
    checkPattern(drumKey);
  }
  
  // Add event listener for the Learning Mode button
  document.getElementById("learningMode").addEventListener("click", toggleLearningMode);
  
  // Your existing JavaScript code (the makeSound, buttonAnimation functions, etc.)
  
