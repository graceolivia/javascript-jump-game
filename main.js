"use strict"

let gameTiles = [[0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
[0,0,0,0,0,1,0,0, 0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0, 0,0,1,0,0,1,0,0],
[1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1]]

var bW = 100

function findCoordinate(cord){
  let column = Math.floor(cord[0]/bW)
  let row = Math.floor((canvasHeight - cord[1])/bW)
  if (row < 0 || row > 3){
    console.log(row)
    return true
  }
  if (gameTiles[row][column] == 1){
    return true
  }
  else {
    return false
  }
}

//sprite code

var canv = hlInitCanvas(canvasWidth, canvasHeight);
var sprite = new Image();
sprite.src = "pipspritesheet.png";
var ctx = canv.getContext("2d");

var rectX = 100
var rectY = 200

var velX = 0
var velY = 0

var blueX = 400
var blueY = 200

var camX = 0
var camY = 0

var jumping = false

var tick = 0

function mainLoop(){

  hlClear("#776d8a");

  tick++
  if (tick > 60){
    tick=0
  }

  //camera movement
  if(hlKeyHeld("i")){
    camY += 1;
  }
  if(hlKeyHeld("j")){
    camX += -1;
  }
  if(hlKeyHeld("k")){
    camY += -1;
  }
  if(hlKeyHeld("l")){
    camX += 1;
  }

  camX = rectX - 100
  // camY = rectY - 125


  //draw map

  for (var row = 0; row < gameTiles.length; row++){
    for (var column = 0; column < gameTiles[0].length; column++){
      if (gameTiles[row][column] == 0){

      }
      if (gameTiles[row][column] == 1){
        hlDrawRect((bW/2) + (bW * column) - camX, (canvasHeight - (0.5 * bW)) - (row * bW) - camY, bW, bW, "aliceblue")
      }
    }
  }

  // hlDrawRect(blueX, blueY, 50, 50, "aliceblue");



// jump code later
  if(hlKeyHeld("d") || hlKeyHeld("ArrowRight")){
    velX += .1;
  }
  if(hlKeyHeld("a") || hlKeyHeld("ArrowLeft")){
    velX += -.1;
  }
  if(jumping == false){
    if(hlKeyHeld(" ")){
      velY += 10;
      jumping = true;
    }
  }
  // if(hlKeyHeld("w") || hlKeyHeld("ArrowUp")){
  //   velY +=.1;
  // }
  // if(hlKeyHeld("s") || hlKeyHeld("ArrowDown")){
  //   velY += -.1;
  // }
velX = velX * .98
velY = velY * .98

//GRAVITY

velY += GRAVITY

//

let hits = false

//jump check
if(velY == 0){
  jumping = false;
}

  // grid collision

  rectY += velY
  let collision = false
  let half = CW/2
  let topLeft = [rectX - half, rectY + half]
  let topRight = [rectX + half, rectY + half]
  let bottomLeft = [rectX - half, rectY - half]
  let bottomRight = [rectX + half, rectY - half]
  if (findCoordinate(topLeft) || findCoordinate(topRight) || findCoordinate(bottomLeft) || findCoordinate(bottomRight) == true){
    if(velY > 0){
    velY = velY * -1
    rectY += velY
    }
else  {
  hits = true;
  velY = 0
  let currentrow = Math.floor((canvasHeight - (rectY - half))/bW)
  let GROUNDCOORDINATE = (canvasHeight - ((currentrow * bW) - CW/2))
  rectY = GROUNDCOORDINATE + .001;
}

  }

	rectX += velX
   half = CW/2
   topLeft = [rectX - half, rectY + half]
   topRight = [rectX + half, rectY + half]
   bottomLeft = [rectX - half, rectY - half]
   bottomRight = [rectX + half, rectY - half]

  if (findCoordinate(topLeft) || findCoordinate(topRight) || findCoordinate(bottomLeft) || findCoordinate(bottomRight) == true){
velX = velX * -1;
rectX += velX;
  }


  if(hits == true){
    jumping = false;  }
else{
  jumping = true;
}

if(jumping == true){
  ctx.drawImage(sprite, 108, 0, 44, 41, rectX - camX - (CW/2), canvasHeight -(rectY - camY) - (CW/2) - 30, 80, 80);
}
//going right
else if(velX > .1){
  if (tick < 30) {
    ctx.drawImage(sprite, 248, 0, 45, 41, rectX - camX - (CW/2) - 20, canvasHeight -(rectY - camY) - (CW/2) - 30, 80, 80);
  }
  else{
  ctx.drawImage(sprite, 198, 0, 45, 41, rectX - camX - (CW/2) - 20, canvasHeight -(rectY - camY) - (CW/2) - 30, 80, 80);
}
}

//going le.ft
else if(velX < -.1 ){
if (tick < 30) {
  ctx.drawImage(sprite, 248, 0, -45, -41, rectX - camX - (CW/2) - 20, canvasHeight -(rectY - camY) - (CW/2) - 30, 80, 80);
}
else{
ctx.drawImage(sprite, 198, 0, -45, -41, rectX - camX - (CW/2) - 20, canvasHeight -(rectY - camY) - (CW/2) - 30, 80, 80);
}
}

else {
  // hlDrawRect(rectX - camX, rectY - camY, CW, CW, "peachpuff");
  ctx.drawImage(sprite, 17, 0, 40, 40, rectX - camX - (CW/2), canvasHeight -(rectY - camY) - (CW/2) - 30, 80, 80);
}



  //
  //
  // //GRAVITY
  // VELOCITY += GRAVITY
  // rectY += VELOCITY
  //
  // if (rectY < 0) {
  //   rectY = 400
  // }
  //



}

hlStartMainLoop(mainLoop)
