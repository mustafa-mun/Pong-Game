const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


canvas.width = innerWidth;
canvas.height = innerHeight

let playerOneScore = 0;
let playerTwoScore = 0;
let startMsg2 = 'You can use W,A and ArrowUp,ArrowDown for controls'
let startMsg = 'First 6 score wins. Press any key to start the game';
let isGameStarted = false;
let isGameFinished = false;


const startGame = () => {
  if(!isGameFinished && !isGameStarted){
      startMsg = '';
      startMsg2 = '';
      ball.randomStart();
      isGameStarted = true;
      isGameFinished = false;
  }
}

const keys = {
  w:{
    pressed: false
  },
  s:{
    pressed: false
  },
  arrowUp:{
    pressed:false
  },
  arrowDown:{
    pressed:false
  }
}


class Player {
  constructor(x) {
    this.size = {
      width: 20,
      height: 182
    }
    this.position = {
      x: x,
      y: canvas.height / 2 - 90
    }
    this.velocity = {
      y:0
    }

  }


  draw() {
    c.fillStyle = 'white';
    c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
  }

  update() {
    this.position.y += this.velocity.y;
    this.draw();
    console.log();
  }
}



class Ball {
  constructor() {
    this.position = {
      x:parseInt(canvas.width / 2),
      y:parseInt(canvas.height / 2)
    }
    this.velocity = {
      x:0,
      y:0
    }
    this.radius = 8
  }

  draw() {
    c.beginPath(); // Draw circle on the middle of the screen
    c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    c.fillStyle = 'white';
    c.fill();
    c.stroke();

    const pongMiddle = playerOne.position.y + playerOne.size.height / 2;
    const pong2Middle = playerTwo.position.y + playerTwo.size.height / 2;

    if(ball.position.x < 5 && !ball.position.y >= !playerOne.position.y && !ball.position.y <= !playerOne.position.y + playerOne.size.height) {
      playerTwoScore ++ // When player Two scores
      refreshBall()
    } else if(ball.position.x > canvas.width - 2 && !ball.position.y >= !playerTwo.position.y && !ball.position.y <= !playerTwo.position.y + playerTwo.size.height) {
      playerOneScore ++ // When player One scores
      refreshBall()
    }

    if(ball.position.x <= playerOne.size.width + ball.radius && ball.position.y >= playerOne.position.y && ball.position.y <= playerOne.position.y + playerOne.size.height) { // BALL COLLOSİON
      ball.velocity.x = 10 // When player One hits the ball (ball speed)
    } else if(ball.position.x > canvas.width - playerTwo.size.width - ball.radius && ball.position.y >= playerTwo.position.y && ball.position.y <= playerTwo.position.y + playerTwo.size.height) {
      ball.velocity.x = -10 // When player Two hits the ball (ball speed)
    }


    // Player One ball angle collasion
    if(ball.position.x <= playerOne.size.width + ball.radius && ball.position.y > pongMiddle - 13 && ball.position.y < pongMiddle + 13) {
      ball.velocity.y = 0;
    } else if(ball.position.x <= playerOne.size.width + ball.radius && ball.position.y > pongMiddle + 13 && ball.position.y < pongMiddle + 39) {
      const p = [-2.5,-3]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    } else if(ball.position.x <= playerOne.size.width + ball.radius && ball.position.y > pongMiddle + 39 && ball.position.y < pongMiddle + 65) {
      const p = [-3.5,-4]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    } else if(ball.position.x <= playerOne.size.width + ball.radius && ball.position.y > pongMiddle + 65 && ball.position.y < pongMiddle + 91) {
      const p = [-4.5,-5]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    } else if(ball.position.x <= playerOne.size.width + ball.radius && ball.position.y < pongMiddle - 13 && ball.position.y > pongMiddle - 39) {
      const p = [2.5,3]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    } else if(ball.position.x <= playerOne.size.width + ball.radius && ball.position.y < pongMiddle - 39 && ball.position.y > pongMiddle - 65) {
      const p = [3.5,4]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    }else if(ball.position.x <= playerOne.size.width + ball.radius && ball.position.y < pongMiddle - 65 && ball.position.y > pongMiddle - 91) {
      const p = [4.5,5]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    }


    // Player Two ball angle collasion
    if(ball.position.x > canvas.width - playerTwo.size.width - ball.radius && ball.position.y > pong2Middle - 13 && ball.position.y < pong2Middle + 13) {
      ball.velocity.y = 0;
    } else if(ball.position.x > canvas.width - playerTwo.size.width - ball.radius && ball.position.y > pong2Middle + 13 && ball.position.y < pong2Middle + 39) {
      const p = [-2.5,-3]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    } else if(ball.position.x > canvas.width - playerTwo.size.width - ball.radius && ball.position.y > pong2Middle + 39 && ball.position.y < pong2Middle + 65) {
      const p = [-3.5,-4]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    } else if(ball.position.x > canvas.width - playerTwo.size.width - ball.radius && ball.position.y > pong2Middle + 65 && ball.position.y < pong2Middle + 91) {
      const p = [-4.5,-5]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    } else if(ball.position.x > canvas.width - playerTwo.size.width - ball.radius && ball.position.y < pong2Middle - 13 && ball.position.y > pong2Middle - 39) {
      const p = [2.5,3]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    } else if(ball.position.x > canvas.width - playerTwo.size.width - ball.radius && ball.position.y < pong2Middle - 39 && ball.position.y > pong2Middle - 65) {
      const p = [3.5,4]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    } else if(ball.position.x > canvas.width - playerTwo.size.width - ball.radius && ball.position.y < pong2Middle - 65 && ball.position.y > pong2Middle - 91) {
      const p = [4.5,5]
      ball.velocity.y = p[Math.floor(Math.random() * 2)];
    }


    if(ball.position.y < 5) {
      ball.velocity.y = 4 // If ball hits the top of the screen
    } else if(ball.position.y >= canvas.height ){
      ball.velocity.y = -4
       // If ball hits the bottom of the screen
    }
gi
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  randomStart() {
    const randomX = [-5,5]
    const randomIndex = Math.floor(Math.random() * 2);
    this.velocity.x = randomX[randomIndex]
  }
}

const playerOne = new Player(0)
const playerTwo = new Player(canvas.width - playerOne.size.width - 5)
const ball = new Ball;



const animate  = () => {
  requestAnimationFrame(animate)
  c.clearRect(0,0,canvas.width,canvas.height) // Reset canvas on every iteration
  playerOne.update();
  playerTwo.update();
  ball.update()

  if(keys.s.pressed && playerOne.position.y + playerOne.size.height <= canvas.height) { // Player movement
    playerOne.velocity.y = 6
  } else{
    playerOne.velocity.y = 0
  }

  if(keys.w.pressed && playerOne.position.y >= 7) {
    playerOne.velocity.y = -6
  }

  if(keys.arrowDown.pressed && playerTwo.position.y + playerTwo.size.height <= canvas.height) {
    playerTwo.velocity.y = 6
  } else{
    playerTwo.velocity.y = 0
  }

  if(keys.arrowUp.pressed && playerTwo.position.y >= 7) {
    playerTwo.velocity.y = -6
  }



  c.font = '46px sans-serif'; // Scores and start msg
  c.fillStyle = 'white';
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText('Player 1: ' + playerOneScore, 355,100);
  c.fillText('Player 2: ' + playerTwoScore, canvas.width - 355,100);
  c.fillText(startMsg, canvas.width/2, canvas.height/2 - 100)
  c.fillText(startMsg2, canvas.width/2, canvas.height/2 - 175)


  if(playerOneScore === 6) { // When one player reach the final score
    isGameStarted = false;
    startMsg = 'Player 1 Wins!, Press R if you want to play again.'
    ball.velocity.x = 0;
    ball.velocity.y = 0;
    isGameFinished = true
  } else if(playerTwoScore === 6) {
    isGameStarted = false;
    startMsg = 'Player 2 Wins! Press R if you want to play again.'
    ball.velocity.x = 0;
    ball.velocity.y = 0;
    isGameFinished = true
  }

  if(isGameFinished){ // Restart the game
    addEventListener('keydown', ( {key} ) => {
      if(key === 'r'){
       refreshGame();
      }
    })
  }
}



animate()


addEventListener('keydown', ( {key} ) => { // Press any key to start game event listener
  if(key) {
    startGame()
  }
})


if(!isGameFinished) {
  addEventListener('keydown', ( {key} ) => { // Pong movements
    switch(key) {
      case 'w':
        keys.w.pressed = true
        break
      case 's':
        keys.s.pressed = true
        break
      case 'ArrowUp':
        keys.arrowUp.pressed = true
        break
      case 'ArrowDown':
        keys.arrowDown.pressed = true
        break
    }
  })
}

 if(!isGameFinished) {
  addEventListener('keyup', ( {key} ) => {
    switch(key) {
      case 'w':
        keys.w.pressed = false
        break
      case 's':
        keys.s.pressed = false
        break
      case 'ArrowUp':
        keys.arrowUp.pressed = false
        break
      case 'ArrowDown':
        keys.arrowDown.pressed = false
        break
    }
  })
 }




const refreshBall = () => { // Refresh the balls position
  playerOne.position.y = canvas.height / 2 - 90;
  playerTwo.position.y = canvas.height / 2 - 90;
  ball.velocity.y = 0;
  ball.velocity.x = 0
  ball.position.x = parseInt(canvas.width / 2)
  ball.position.y = parseInt(canvas.height / 2)
  ball.randomStart()
}

const refreshGame = () => {
  isGameFinished = false;
  startMsg = '';
  startMsg2 = '';
  playerOne.position.y = canvas.height / 2 - 90;
  playerTwo.position.y = canvas.height / 2 - 90;
  playerOneScore = 0;
  playerTwoScore = 0;
}


