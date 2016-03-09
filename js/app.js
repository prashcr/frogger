'use strict';

// Globals
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;
var NUM_COLS = 5;
var NUM_ROWS = 6;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x * TILE_WIDTH;
    this.y = y * TILE_HEIGHT;
    this.speed = speed === undefined ? 1.2 : speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt * TILE_WIDTH;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {

    this.x = x * TILE_WIDTH;
    this.y = y * TILE_HEIGHT;

    this.sprite = 'images/char-boy.png';
}

Player.prototype.handleInput = function(key) {

    if (key === 'left' && this.x - TILE_WIDTH >= 0) {
        this.x -= TILE_WIDTH;
    }
    if (key === 'up' && this.y - TILE_HEIGHT >= -0.5 * TILE_HEIGHT) {
        this.y -= TILE_HEIGHT;
    }
    if (key === 'right' && this.x + TILE_WIDTH < NUM_COLS * TILE_WIDTH) {
        this.x += TILE_WIDTH;
    }
    if (key === 'down' && this.y + TILE_HEIGHT <= 4.5 * TILE_HEIGHT) {
        this.y += TILE_HEIGHT;
    }

    console.log(key, 'this.x =', this.x, 'this.y=', this.y)
}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(-1, 0.5, 2.1),
    new Enemy(-1, 1.5, 1.5),
    new Enemy(-1, 2.5, 1.8)
];
var player = new Player(2, 4.5);

// When any of the movement keys are pressed,
// cancels the keydown event without stopping propogation
// to avoid webpage from scolling/moving.
document.addEventListener('down', function(e) {
    // PgUp, PgDn, End, Home, Left, Up, Right, Down
    var arr = [33, 34, 35, 36, 37, 38, 39, 40];
    if (arr.indexOf(e.keyCode) !== -1) {
        e.preventDefault();
        return false;
    }
    return true;
})


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
