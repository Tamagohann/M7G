// =====================================

// Meteorite Rocket v7

// Part 1

// =====================================

// ---------- Game ----------

let gameState = "menu";

let difficulty = "";

let score = 0;

let newHighScore = false;

// ---------- High Score ----------

let highScores = {

  easy:0,

  normal:0,

  hard:0

};

// ---------- Player ----------

let playerX;

let playerY;

let targetX;

let rocketAngle = 0;

// ---------- Objects ----------

let meteors = [];

let particles = [];

let stars = [];

// =====================================

// SETUP

// =====================================

function setup(){

  createCanvas(

    windowWidth,

    windowHeight

  );

  textAlign(

    CENTER,

    CENTER

  );

  textFont("Arial");

  playerX = width/2;

  playerY = height/2;

  targetX = width/2;

  createStars();

  // High Score Load

  highScores.easy =

  Number(

    localStorage.getItem(

      "meteorEasy"

    )

  ) || 0;

  highScores.normal =

  Number(

    localStorage.getItem(

      "meteorNormal"

    )

  ) || 0;

  highScores.hard =

  Number(

    localStorage.getItem(

      "meteorHard"

    )

  ) || 0;

}

// =====================================

// DRAW

// =====================================

function draw(){

  rectMode(CORNER);

  background(

    5,

    5,

    20

  );

  drawSpace();

  if(

    gameState==="menu"

  ){

    drawMenu();

  }

  else if(

    gameState==="playing"

  ){

    drawGame();

  }

  else if(

    gameState==="gameover"

  ){

    drawGameOver();

  }

}

// =====================================

// STARS

// =====================================

function createStars(){

  stars = [];

  for(

    let i=0;

    i<320;

    i++

  ){

    stars.push({

      x:random(width),

      y:random(height),

      size:random(1,4),

      alpha:random(80,255),

      speed:random(0.2,0.8)

    });

  }

}

// =====================================

// SPACE

// =====================================

function drawSpace(){

  noStroke();

  for(let s of stars){

    fill(

      255,

      255,

      255,

      s.alpha +

      sin(

        frameCount*0.03 +

        s.x

      )*30

    );

    circle(

      s.x,

      s.y,

      s.size

    );

    s.y += s.speed;

    if(

      s.y > height

    ){

      s.y = 0;

      s.x = random(width);

    }

  }

  fill(

    40,

    120,

    255,

    10

  );

  ellipse(

    width*0.25,

    height*0.30,

    550,

    350

  );

  fill(

    255,

    80,

    200,

    8

  );

  ellipse(

    width*0.75,

    height*0.65,

    650,

    450

  );

  fill(

    80,

    255,

    255,

    6

  );

  ellipse(

    width*0.50,

    height*0.88,

    800,

    300

  );

}

// =====================================

// MENU

// =====================================

function drawMenu(){

  drawTitle();

  drawButtons();

  drawHighScores();

}

// =====================================

// TITLE

// =====================================

function drawTitle(){

  let titleSize = min(

    width*0.28,

    135

  );

  let rocketSize = min(

    width*0.23,

    105

  );

  for(

    let i=0;

    i<10;

    i++

  ){

    fill(

      255,

      230,

      120,

      15

    );

    textSize(

      titleSize+i

    );

    text(

      "Meteorite",

      width/2,

      height*0.16

    );

  }

  fill(

    255,

    235,

    150

  );

  textSize(

    titleSize

  );

  text(

    "Meteorite",

    width/2,

    height*0.16

  );

  for(

    let i=0;

    i<10;

    i++

  ){

    fill(

      120,

      220,

      255,

      15

    );

    textSize(

      rocketSize+i

    );

    text(

      "🚀Rocket🚀",

      width/2,

      height*0.28

    );

  }

  fill(

    120,

    220,

    255

  );

  textSize(

    rocketSize

  );

  text(

    "🚀Rocket🚀",

    width/2,

    height*0.28

  );

}

// =====================================

// BUTTONS

// =====================================

function drawButtons(){

  drawMenuButton(

    width/2,

    height*0.58,

    "EASY"

  );

  drawMenuButton(

    width/2,

    height*0.72,

    "NORMAL"

  );

  drawMenuButton(

    width/2,

    height*0.86,

    "HARD"

  );

}

function drawMenuButton(

  x,

  y,

  txt

){

  rectMode(CENTER);

  fill(

    0,

    120,

    255,

    65

  );

  rect(

    x,

    y,

    min(width*0.75,340),

    85,

    25

  );

  fill(255);

  textSize(32);

  text(

    txt,

    x,

    y

  );

  rectMode(CORNER);

}

// =====================================

// HIGH SCORE

// =====================================

function drawHighScores(){

  fill(

    120,

    220,

    255

  );

  textSize(22);

  text(

    "Easy : " +

    highScores.easy,

    width/2,

    height*0.93

  );

  text(

    "Normal : " +

    highScores.normal,

    width/2,

    height*0.965

  );

  text(

    "Hard : " +

    highScores.hard,

    width/2,

    height*0.995

  );

}

// =====================================

// PLACEHOLDER

// =====================================

function drawGame(){}

function drawGameOver(){}

// =====================================

// PART 2

// Rocket System

// =====================================

function startGame(level){

  difficulty = level;

  score = 0;

  newHighScore = false;

  playerX = width/2;

  playerY = height/2;

  targetX = width/2;

  rocketAngle = 0;

  particles = [];

  meteors = [];

  createMeteors();

  gameState = "playing";

}

// =====================================

// GAME

// =====================================

function drawGame(){

  playerX = lerp(

    playerX,

    targetX,

    0.15

  );

  rocketAngle *= 0.90;

  updateParticles();

  updateMeteors();

  drawParticles();

  drawMeteors();

  drawRocket();

  drawScore();

}

// =====================================

// SCORE

// =====================================

function drawScore(){

  textAlign(

    LEFT,

    CENTER

  );

  fill(255);

  textSize(28);

  text(

    "Score : " + score,

    20,

    40

  );

  textAlign(

    CENTER,

    CENTER

  );

}

// =====================================

// PARTICLES

// =====================================

function updateParticles(){

  if(

    frameCount % 3 === 0

  ){

    particles.push({

      x:

      playerX +

      random(-10,10),

      y:

      playerY +

      random(-10,10),

      size:

      random(4,10),

      alpha:255,

      blue:

      random()<0.5

    });

  }

  for(let p of particles){

    p.alpha -= 4;

    p.size *= 0.98;

  }

  particles = particles.filter(

    p => p.alpha > 0

  );

}

function drawParticles(){

  noStroke();

  for(let p of particles){

    if(p.blue){

      fill(

        100,

        220,

        255,

        p.alpha

      );

    }else{

      fill(

        255,

        220,

        100,

        p.alpha

      );

    }

    circle(

      p.x,

      p.y,

      p.size

    );

  }

}

// =====================================

// ROCKET

// =====================================

function drawRocket(){

  push();

  translate(

    playerX,

    playerY

  );

  rotate(

    radians(

      rocketAngle

    )

  );

  noStroke();

  fill(

    80,

    180,

    255,

    25

  );

  ellipse(

    0,

    0,

    120,

    120

  );

  // 本体

  fill(240);

  triangle(

    0,

    -60,

    -22,

    20,

    22,

    20

  );

  // 左翼

  fill(

    255,

    70,

    70

  );

  triangle(

    -18,

    5,

    -42,

    22,

    -8,

    12

  );

  // 右翼

  triangle(

    18,

    5,

    42,

    22,

    8,

    12

  );

  // コックピット

  fill(

    100,

    220,

    255

  );

  ellipse(

    0,

    -10,

    16,

    24

  );

  // 炎

  let flame =

  55 +

  sin(

    frameCount*0.3

  ) * 10;

  fill(

    255,

    180,

    50,

    180

  );

  triangle(

    0,

    flame,

    -10,

    20,

    10,

    20

  );

  fill(

    255,

    80,

    50,

    140

  );

  triangle(

    0,

    flame+8,

    -6,

    20,

    6,

    20

  );

  pop();

}

// =====================================

// TOUCH

// =====================================

function touchStarted(){

  if(

    gameState==="menu"

  ){

    if(

      mouseY >

      height*0.53 &&

      mouseY <

      height*0.63

    ){

      startGame("easy");

    }

    else if(

      mouseY >

      height*0.67 &&

      mouseY <

      height*0.77

    ){

      startGame("normal");

    }

    else if(

      mouseY >

      height*0.81 &&

      mouseY <

      height*0.91

    ){

      startGame("hard");

    }

  }

  else if(

    gameState==="playing"

  ){

    if(

      mouseX < width/2

    ){

      targetX -= 90;

      rocketAngle = -15;

    }

    else{

      targetX += 90;

      rocketAngle = 15;

    }

    targetX = constrain(

      targetX,

      50,

      width-50

    );

  }

  else if(

    gameState==="gameover"

  ){

    if(

      mouseY >

      height*0.55 &&

      mouseY <

      height*0.65

    ){

      startGame(

        difficulty

      );

    }

    else if(

      mouseY >

      height*0.70 &&

      mouseY <

      height*0.80

    ){

      gameState =

      "menu";

    }

  }

  return false;

}


// =====================================

// PART 3

// Meteors + GameOver

// =====================================

function createMeteors(){

  let count = 10;

  if(difficulty==="normal"){

    count = 14;

  }

  if(difficulty==="hard"){

    count = 18;

  }

  for(let i=0;i<count;i++){

    spawnMeteor();

  }

}

// =====================================

// METEOR

// =====================================

function spawnMeteor(){

  let fromTop = random()<0.5;

  meteors.push({

    x:random(

      80,

      width-80

    ),

    y:fromTop

      ? -50

      : height+50,

    size:random(

      35,

      65

    ),

    speed:random(

      3,

      6

    ),

    dir:

      fromTop ? 1 : -1,

    wave:

      random(1000),

    passed:false

  });

}

function updateMeteors(){

  for(let m of meteors){

    m.y +=

    m.speed *

    m.dir;

    m.x +=

    sin(

      frameCount*0.03 +

      m.wave

    ) * 1.5;

    m.x = constrain(

      m.x,

      40,

      width-40

    );

    let d = dist(

      playerX,

      playerY,

      m.x,

      m.y

    );

    if(

      d <

      m.size*0.45 + 25

    ){

      gameOver();

    }

    if(

      !m.passed

    ){

      if(

        (m.dir===1 &&

        m.y>playerY)

        ||

        (m.dir===-1 &&

        m.y<playerY)

      ){

        score++;

        m.passed = true;

      }

    }

  }

  meteors = meteors.filter(

    m =>

    m.y > -120 &&

    m.y < height+120

  );

  while(

    meteors.length <

    (

      difficulty==="easy"

      ? 4

      :

      difficulty==="normal"

      ? 6

      : 8

    )

  ){

    spawnMeteor();

  }

}

function drawMeteors(){

  noStroke();

  for(let m of meteors){

    // 炎

    fill(

      255,

      150,

      50,

      120

    );

    ellipse(

      m.x,

      m.y -

      m.dir*35,

      m.size*0.6,

      m.size*1.6

    );

    fill(

      255,

      80,

      50,

      100

    );

    ellipse(

      m.x,

      m.y -

      m.dir*22,

      m.size*0.35,

      m.size

    );

    // 銀色隕石

    fill(

      210

    );

    circle(

      m.x,

      m.y,

      m.size

    );

    fill(

      170

    );

    circle(

      m.x-8,

      m.y-4,

      m.size*0.25

    );

    circle(

      m.x+10,

      m.y+6,

      m.size*0.18

    );

    fill(

      255,

      255,

      255,

      100

    );

    ellipse(

      m.x-10,

      m.y-10,

      m.size*0.25,

      m.size*0.18

    );

  }

}

// =====================================

// GAME OVER

// =====================================

function gameOver(){

  if(

    difficulty==="easy"

  ){

    if(

      score >

      highScores.easy

    ){

      newHighScore = true;

    }

    highScores.easy = max(

      highScores.easy,

      score

    );

    localStorage.setItem(

      "meteorEasy",

      highScores.easy

    );

  }

  else if(

    difficulty==="normal"

  ){

    if(

      score >

      highScores.normal

    ){

      newHighScore = true;

    }

    highScores.normal = max(

      highScores.normal,

      score

    );

    localStorage.setItem(

      "meteorNormal",

      highScores.normal

    );

  }

  else{

    if(

      score >

      highScores.hard

    ){

      newHighScore = true;

    }

    highScores.hard = max(

      highScores.hard,

      score

    );

    localStorage.setItem(

      "meteorHard",

      highScores.hard

    );

  }

  gameState = "gameover";

}

// =====================================

// DRAW GAME OVER

// =====================================

function drawGameOver(){

  fill(

    0,

    0,

    0,

    170

  );

  rect(

    0,

    0,

    width,

    height

  );

  fill(255);

  textSize(60);

  text(

    "GAME OVER",

    width/2,

    height*0.25

  );

  textSize(34);

  text(

    "Score : " + score,

    width/2,

    height*0.35

  );

  if(

    newHighScore

  ){

    let pulse =

    sin(

      frameCount*0.15

    ) * 8;

    fill(

      255,

      220,

      50

    );

    textSize(

      42 + pulse

    );

    text(

      "🏆 HIGH SCORE!! 🏆",

      width/2,

      height*0.45

    );

  }

  drawEndButton(

    width/2,

    height*0.62,

    "RESTART"

  );

  drawEndButton(

    width/2,

    height*0.76,

    "MENU"

  );

}

function drawEndButton(

  x,

  y,

  txt

){

  rectMode(CENTER);

  fill(

    0,

    120,

    255,

    70

  );

  rect(

    x,

    y,

    280,

    80,

    20

  );

  fill(255);

  textSize(30);

  text(

    txt,

    x,

    y

  );

  rectMode(CORNER);

}







     
















