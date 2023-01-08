const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight

let playerOneScore = 0;
let playerTwoScore = 0;
let startMsg = 'First 6 score wins. Press any key to start the game';
let isGameStarted = false;
let isGameFinished = false;


const startGame = () => {
  if(!isGameFinished && !isGameStarted){
      startMsg = '';
      ball.randomStart();
      isGameStarted = true;
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
      height: 170
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


    if(ball.position.x < 5 && !ball.position.y >= !playerOne.position.y && !ball.position.y <= !playerOne.position.y + playerOne.size.height) {
        playerTwoScore ++
        refreshBall()
    }

    if(ball.position.x > canvas.width - 2 && !ball.position.y >= !playerTwo.position.y && !ball.position.y <= !playerTwo.position.y + playerTwo.size.height) {
        playerOneScore ++
        refreshBall()
    }

    if(ball.position.x <= playerOne.size.width + ball.radius && ball.position.y >= playerOne.position.y && ball.position.y <= playerOne.position.y + playerOne.size.height) { // BALL COLLOSİON
      ball.velocity.x = 7
      console.log('player one hitted the ball');
    }
    if(ball.position.x > canvas.width - playerTwo.size.width - ball.radius && ball.position.y >= playerTwo.position.y && ball.position.y <= playerTwo.position.y + playerTwo.size.height) {
      ball.velocity.x = -7
      console.log('player two hitted the ball');
    }
  
    if(ball.position.y < 5) {
      ball.velocity.y = 6
    }
    if(ball.position.y >= canvas.height ){
      ball.velocity.y = -6
    }

   
    

  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  randomStart() {
    const randomDirection = [3,-3,4,-4]
    const randomIndex1 = Math.floor(Math.random() * 4);
    const randomIndex2 = Math.floor(Math.random() * 4);
    this.velocity.x = randomDirection[randomIndex1]
    this.velocity.y = randomDirection[randomIndex2]
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
    playerOne.velocity.y = 5
  } else{
    playerOne.velocity.y = 0
  }

  if(keys.w.pressed && playerOne.position.y >= 7) {
    playerOne.velocity.y = -5
  }

  if(keys.arrowDown.pressed && playerTwo.position.y + playerTwo.size.height <= canvas.height) {
    playerTwo.velocity.y = 5
  } else{
    playerTwo.velocity.y = 0
  }

  if(keys.arrowUp.pressed && playerTwo.position.y >= 7) {
    playerTwo.velocity.y = -5
  }  

  c.font = '46px sans-serif';
  c.fillStyle = 'white';
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText('Player 1: ' + playerOneScore, 355,100);
  c.fillText('Player 2: ' + playerTwoScore, canvas.width - 355,100);
  c.fillText(startMsg, canvas.width/2, canvas.height/2 - 100)

  if(playerOneScore === 6) {
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

  if(isGameFinished){
    addEventListener('keydown', ( {key} ) => {
      if(key === 'r'){
        isGameFinished = false;
        startMsg = '';
        playerOne.position.y = canvas.height / 2 - 90;
        playerTwo.position.y = canvas.height / 2 - 90;
        playerOneScore = 0;
        playerTwoScore = 0;
      }
    })
  }
}



animate()


addEventListener('keydown', ( {key} ) => {
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





const refreshBall = () => {
    ball.position.x = parseInt(canvas.width / 2)
    ball.position.y = parseInt(canvas.height / 2)
    ball.velocity.x = 4;
    ball.velocity.y = 1
    ball.randomStart()
}


