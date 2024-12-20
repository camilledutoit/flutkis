// LARGEST INTEGER

// Run the program
const startLargestIntegerButton = document.getElementById("largestintegerbutton");
const largestIntegerInstructions = document.getElementById("largestintegerinstructions");
const jsAppLargestIntegerContainer = document.getElementById("jsapplargestintegercontainer")
const labels = document.getElementById("largestintegerlabels")

const runLargestInteger = () => {    
    startLargestIntegerButton.style.display = "none";
    largestIntegerInstructions.style.display = "none";
    labels.style.display = "block";
    jsAppLargestIntegerContainer.scrollIntoView({ behavior: "smooth" });
}

startLargestIntegerButton.addEventListener('click', runLargestInteger)

// Recover input data from the form, prevent standard submission behavior and return result
let exponentinputted = null;
let integerinputted = null;
const form = document.getElementById('integerform');
const resultMessageContainer = document.getElementById("result-message-container")
const resultMessage = document.getElementById("result-message")

const preventSubmission = event => {
    event.preventDefault();
    exponentinputted = Number(document.getElementById('exponent').value);
    integerinputted = Number(document.getElementById('integerValue').value);
    resultMessageContainer.style.display = "block"    
    labels.style.display = "none"
    resultMessage.innerHTML=`El valor de i^${exponentinputted} más pequeño inmediatamente superior a ${integerinputted} es ${calculateSmallestPower()}`
    jsAppLargestIntegerContainer.scrollIntoView({ behavior: "smooth" });
}

form.addEventListener ('submit',preventSubmission);

// App functionality
const calculateSmallestPower = () => {
let i = 1
while (i**exponentinputted<=integerinputted) {
    i++
} 
return i ** exponentinputted
}

// Go back to instructions
const integerInstructionsButton = document.getElementById("integerinstructionsbutton")

const integerInstructions = () => {
    startLargestIntegerButton.style.display = "block";
    largestIntegerInstructions.style.display = "block";
    labels.style.display = "none";
    resultMessageContainer.style.display = "none"
    form.reset();
    jsAppLargestIntegerContainer.scrollIntoView({ behavior: "smooth" });
}

integerInstructionsButton.addEventListener('click',integerInstructions)

// Try again
const tryAgainLargestInteggerButton = document.getElementById("tryagainlargestinteggerbutton")

const tryAgain = () => {
    resultMessageContainer.style.display = "none"    
    labels.style.display = "block"
    form.reset();
    jsAppLargestIntegerContainer.scrollIntoView({ behavior: "smooth" });
}

tryAgainLargestInteggerButton.addEventListener('click',tryAgain)

// BALL GAME
const startBallGameButton = document.getElementById("ballgamebutton")
const ballGameInstructions = document.getElementById("ballgameinstructions")
const ballGameContainer = document.getElementById("ballgamecontainer")
const winMessage = document.getElementById("winmessage");
const lostMessage = document.getElementById("lostmessage");
const ballGameCommands = document.getElementById("ballgamecommands")
const ballGameRestartButton = document.getElementById("ballgamerestartbutton")
const ballGameInstructionsButton = document.getElementById("ballgameinstructionsbutton")
const startMessage = document.getElementById("startmessage")
const ballGameBall = document.getElementById("ballgameball");
const ballGameBase = document.getElementById("ballgamebase");
const jsAppBallGameContainer = document.getElementById("jsappballgamecontainer")

let gameActive = false;

const runBallGame = () => {
    startBallGameButton.style.display = "none"
    ballGameInstructions.style.display = "none"
    ballGameContainer.style.display = "block"
    ballGameCommands.style.display = "flex"
    startMessage.style.display = "block";
    gameActive = true;
}

startBallGameButton.addEventListener('click',runBallGame)

// Throwing the ball, moving the base
const randomNumber = () => Math.random()*900;
const randomThrow = randomNumber()


const throwBall = () => {        
    if (!gameActive) return;
    ballGameBall.style.bottom = "250px"
    ballGameBall.style.left = `${randomThrow}px`
    startMessage.style.display= "none"
};

const dropBall = () => {
    if (!gameActive) return;
    ballGameBall.style.bottom = "0px"
    setTimeout(() => {
        checkIfLost();
        checkIfWin();
    }, 0);
}

const moveRight = () => {
    if (!gameActive) return;
    ballGameBase.style.left = "850px"    
}

const moveLeft = () => {
    if (!gameActive) return;
    ballGameBase.style.left = "50px"
    
}

const handleShift = (event) => {
    if (event.key === "Shift") {
        throwBall();
    }
};

document.addEventListener('keydown', handleShift)

document.addEventListener('keyup',dropBall)

const handleArrowRight = (event) => {
    if (event.key === "ArrowRight") {
        moveRight();
    }
};

document.addEventListener("keydown", handleArrowRight);

const handleArrowLeft = (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
    }
};

document.addEventListener("keydown", handleArrowLeft);

// Checking if lost
const checkIfLost = () => {
    const ballRect = ballGameBall.getBoundingClientRect();
    const baseRect = ballGameBase.getBoundingClientRect();
    const containerRect = ballGameContainer.getBoundingClientRect();

    const isTouchingHorizontally = ballRect.left < baseRect.right && ballRect.right > baseRect.left;
    const isAtBottom = ballRect.bottom > containerRect.bottom - 25;

    if (isAtBottom && !isTouchingHorizontally) {
        lostMessage.style.display = "block";
        freezeGame();
    }
};

// Checking if won
const checkIfWin = () => {
    const ballRect = ballGameBall.getBoundingClientRect();
    const baseRect = ballGameBase.getBoundingClientRect();
    const containerRect = ballGameContainer.getBoundingClientRect();

    // Check for horizontal overlap with base
    const isTouchingHorizontally = ballRect.left < baseRect.right && ballRect.right > baseRect.left;

    // Check if ball is at the correct height
    const isAtCorrectHeight = ballRect.bottom >= containerRect.bottom - 25;

    if (isTouchingHorizontally && isAtCorrectHeight) {
        winMessage.style.display = "block";
        ballGameBall.style.bottom = "25px";
        ballGameBall.style.left = "50%";
        ballGameBall.style.transform = "translateX(-50%)";
        ballGameBase.style.left = "50%";
        ballGameBase.style.transform = "translateX(-50%)";
        freezeGame();
    }
};

// Freeze the game
const freezeGame = () => {
    document.removeEventListener("keyup", dropBall);
    document.removeEventListener('keydown', handleShift)
    document.removeEventListener("keydown", handleArrowRight)
    document.removeEventListener("keydown", handleArrowLeft)
    gameActive = false;
}

// Go back to instructions or try again and restart game
const reactivateGame = () => {
    document.addEventListener("keyup", dropBall);
    document.addEventListener('keydown', handleShift);
    document.addEventListener("keydown", handleArrowRight);
    document.addEventListener("keydown", handleArrowLeft);
    jsAppBallGameContainer.scrollIntoView({ behavior: "smooth" });
}

const restartBallGameInstructions = () => {
    ballGameInstructions.style.display = "block";
    startBallGameButton.style.display = "flex";
    ballGameContainer.style.display = "none";
    ballGameCommands.style.display = "none";
    winMessage.style.display = "none";
    lostMessage.style.display = "none";
    ballGameBall.style.bottom = "25px";
    ballGameBall.style.left = "50%";
    ballGameBase.style.left = "50%";
    startMessage.style.display= "block"
    gameActive = false;
    reactivateGame();
    jsAppBallGameContainer.scrollIntoView({ behavior: "smooth" });
}

const restartBallGame = () => {
    winMessage.style.display = "none";
    lostMessage.style.display = "none";
    ballGameBall.style.bottom = "25px";
    ballGameBall.style.left = "50%";
    ballGameBase.style.left = "50%";
    startMessage.style.display= "block"
    gameActive = true;
    reactivateGame();
    jsAppBallGameContainer.scrollIntoView({ behavior: "smooth" });
}

ballGameInstructionsButton.addEventListener('click',restartBallGameInstructions)
ballGameRestartButton.addEventListener('click',restartBallGame)


// CREATE CIRCLES
const createCirclesInstructions = document.getElementById("createcirclesinstructions")
const createCirclesButton = document.getElementById("createcirclesbutton")
const createCirclesContainer = document.getElementById("createcirclescontainer")
const createCirclesLabels = document.getElementById("createcircleslabels")
const createBallsCommands = document.getElementById("createballscommands")
const jsAppCreateCirclesContainer = document.getElementById("jsappcreatecirclescontainer")

// Run the program
const runCreateCircles = () => {
    createCirclesInstructions.style.display = "none"
    createCirclesButton.style.display = "none"
    createCirclesLabels.style.display = "block"
    jsAppCreateCirclesContainer.scrollIntoView({ behavior: "smooth" });
}

createCirclesButton.addEventListener('click', runCreateCircles)

// Recover input data from the form, prevent standard submission behavior and create circles
const createCirclesForm = document.getElementById("createcirclesform")

const preventSubmissionCreateCircles = event => {
    event.preventDefault();

    createCirclesLabels.style.display = "none"
    createCirclesContainer.style.display = "block"
    createBallsCommands.style.display = "flex"

    const numberOfCirclesInputted = Number(document.getElementById('circlenumberselection').value);
    const colorInputted = String(document.getElementById('circlecolorselection').value);
    const colorDifferenceInputted = Number(document.getElementById('circlecolordifference').value);
    const containerWidth = createCirclesContainer.offsetWidth;
    const containerHeight = createCirclesContainer.offsetHeight;
    jsAppCreateCirclesContainer.scrollIntoView({ behavior: "smooth" });
    
    createCirclesContainer.innerHTML = ''

    for (let i=0; i<numberOfCirclesInputted; i++) {
        let newCircle = document.createElement('div')
        const circleSize = Math.random() * 50 + 10;
        newCircle.style.width = `${circleSize}px`;
        newCircle.style.height = `${circleSize}px`;
        newCircle.style.borderRadius = '50%';
        newCircle.style.backgroundColor = colorSelector(colorInputted,colorDifferenceInputted)        
        const randomTop = Math.random() * (containerHeight - circleSize);
        const randomLeft = Math.random() * (containerWidth - circleSize);
        newCircle.style.position = 'absolute';
        newCircle.style.top = `${randomTop}px`;
        newCircle.style.left = `${randomLeft}px`;
        createCirclesContainer.appendChild(newCircle)
    }
}

createCirclesForm.addEventListener('submit',preventSubmissionCreateCircles)

// Generate random HSL color values
const colorSelector = (col,diff) => {
    const colorDifferentiator = ((Math.random() * 2) - 1)*120*diff/100
    const saturationDifferentiator = -Math.random()*80*diff/100
    const lightnessDifferentiator = ((Math.random() * 2) - 1)*30*diff/100
    switch (col) {
        case 'blue':
            return `hsla(${240+colorDifferentiator},${100+saturationDifferentiator}%,${50+lightnessDifferentiator}%,0.7)`;
        case 'red':
            return `hsla(${0+colorDifferentiator},${100+saturationDifferentiator}%,${50+lightnessDifferentiator}%,0.7)`;
        case 'green':
            return `hsla(${120+colorDifferentiator},${100+saturationDifferentiator}%,${50+lightnessDifferentiator}%,0.7)`;
    }
}

// Go back to instructions
const createCirclesInstructionsButton = document.getElementById("createcirclesinstructionsbutton")
const createBallsInstructionsButton = document.getElementById("createballsinstructionsbutton")

const goBackToInstrucions = () => {
    createCirclesLabels.style.display="none"
    createCirclesContainer.style.display="none"
    createBallsCommands.style.display = "none"
    createCirclesInstructions.style.display="block"
    createCirclesButton.style.display="block"
    createCirclesForm.reset()
    jsAppCreateCirclesContainer.scrollIntoView({ behavior: "smooth" });
}

createCirclesInstructionsButton.addEventListener('click',goBackToInstrucions)
createBallsInstructionsButton.addEventListener('click',goBackToInstrucions)


// Try again and restart game

const circleGameRestartButton = document.getElementById("circlegamerestartbutton")


const tryAgainCreateCircles = () => {
    createCirclesContainer.style.display="none"
    createBallsCommands.style.display = "none"
    createCirclesLabels.style.display = "block"
    createCirclesForm.reset()
    jsAppCreateCirclesContainer.scrollIntoView({ behavior: "smooth" });
}

circleGameRestartButton.addEventListener('click',tryAgainCreateCircles)

// DIVIDE AND ORDER NUMBERS

//Get elements
const divideAndOrderInstructions = document.getElementById("divideandorderinstructions")
const divideAndOrderButton = document.getElementById("divideandorderbutton")
const divideAndOrderLabels = document.getElementById("divideandorderlabels")
const divideAndOrderFormButtons = document.getElementById("divideandorderformbuttons")
const divideAndOrderOrderButton = document.getElementById("divideandorderorderbutton")
const divideAndOrderInstructionsButton = document.getElementById("divideandorderinstructionsbutton")
const addNumberButton = document.getElementById("addnumberbutton")
const cleanNumberButton = document.getElementById("cleannumberbutton")
const selectedNumbers = document.getElementById("selectednumbers")
const divisorForUser = document.getElementById("divisorforuser")
const addDivisorButton = document.getElementById("adddivisorbutton")
const outputForUser = document.getElementById("outputforuser")
const divideAndOrderRestartButton = document.getElementById("divideandorderrestartbutton")
let divisorInputted = null
const userArray = []

// Run the program
const runDivideAndOrder = () => {
    divideAndOrderInstructions.style.display = "none"
    divideAndOrderLabels.style.display = "block"
}

divideAndOrderButton.addEventListener("click",runDivideAndOrder)

// Recover input data from inputted numbers, prevent standard submission behavior
const preventSubmissionDivideAndOrder = (event) => {
    event.preventDefault ()
    const input = document.getElementById("addnumber").value;

    if (input === "") {
        return;
    }

    const numberInputted = Number(input);
    userArray.push(numberInputted)
    selectedNumbers.innerHTML=`Has capturado los siguientes números: ${userArray.join(", ")}`
    document.getElementById("addnumber").value = "";
}

addNumberButton.addEventListener('click',preventSubmissionDivideAndOrder)

// Clean numbers

const cleanArray = () => {
    userArray.length=0
    selectedNumbers.innerHTML=''
}

cleanNumberButton.addEventListener('click',cleanArray)

// Recover input data from divisor, prevent standard submission behavior
const preventSubmissionDivideAndOrderDivisor = (event) => {
    event.preventDefault()
    const userInput = document.getElementById("adddivisor").value

    if (userInput==="") {
        return;
    }

    divisorInputted = Number(userInput)
    divisorForUser.innerHTML = `El divisor seleccionado es ${divisorInputted}`
    document.getElementById("adddivisor").value = ""
}

addDivisorButton.addEventListener('click',preventSubmissionDivideAndOrderDivisor)

// Order numbers and deliver result

const orderAndResult = () => {
    if (userArray.length===0 || divisorInputted===null) {
        return outputForUser.innerHTML="No has terminado de ingresar los datos"
    }

    const filteredArray = userArray.filter(item => {
        return item%divisorInputted===0
    })

    outputForUser.innerHTML=`El resultado es: ${filteredArray.sort().join(", ")}`
}

divideAndOrderOrderButton.addEventListener('click',orderAndResult)

// Restart game
const restartDivideAndOrder = () => {
    userArray.length=0
    divisorForUser.innerHTML =""
    divisorInputted=null
    selectedNumbers.innerHTML=""
    outputForUser.innerHTML=""
}

divideAndOrderRestartButton.addEventListener('click',restartDivideAndOrder)

// Back to instructions
const instructionsDivideAndOrder = () => {
    userArray.length=0
    divisorForUser.innerHTML =""
    divisorInputted=null
    selectedNumbers.innerHTML=""
    outputForUser.innerHTML=""
    divideAndOrderLabels.style.display="none"
    divideAndOrderInstructions.style.display="block"
}

divideAndOrderInstructionsButton.addEventListener('click',instructionsDivideAndOrder)