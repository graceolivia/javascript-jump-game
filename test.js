"use strict";


// ---- GLOBAL CONSTANTS & VARIABLES ----

// Game screen properties
const screenWidth = 400;
const screenHeight = 300;

// Properties of player's rectangle
const playerColor = "lime";
const playerColorHit = "yellow";
const playerWidth = 25;
const playerHeight = 25;
const playerSpeed = 2;
var playerX = 150;
var playerY = 175;

// Properties of the stationary rectangle
const blockColor = "red";
const blockWidth = 50;
var blockHeight = 200;
var blockX = 200;
var blockY = 100




// ---- MAIN LOOP ----

function mainLoop()
{
	// Move player rectangle
	if(hlKeyHeld("ArrowRight")) playerX+= playerSpeed;
	if(hlKeyHeld("ArrowLeft"))  playerX-= playerSpeed;
	if(hlKeyHeld("ArrowUp"))    playerY+= playerSpeed;
	if(hlKeyHeld("ArrowDown"))  playerY-= playerSpeed;


	// Clear game screen
	hlClear();

	// Draw the block as a wall taking up the left side of the screen
	hlDrawRect(blockX, blockY, blockWidth, blockHeight, blockColor);

	// Draw the player's rectangle, with the color based on whether the blocks are colliding
	if((playerX-12 <= blockX+25 && playerX+12 >=blockX-25)
  && (playerY-12 <= blockHeight)) // FIXME Replace the "false" value with a boolean expression that's true when the player's rectangle overlaps the wall...
	{
		hlDrawRect(playerX, playerY, playerWidth, playerHeight, playerColorHit);
	}
	else
	{
		hlDrawRect(playerX, playerY, playerWidth, playerHeight, playerColor);
	}

}



// ---- MAIN ----

function main()
{
	hlInitCanvas(screenWidth, screenHeight);
	hlStartMainLoop(mainLoop);
}

main();
