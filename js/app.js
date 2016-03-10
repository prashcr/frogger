'use strict';

// Globals
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;
var NUM_COLS = 5;
var NUM_ROWS = 6;

// Enemies our player must avoid
var Enemy = function() {
    this.x = _.random(-15, -1, true);
    this.y = _.sample([0.5, 1.5, 2.5]);
    this.speed = _.random(1.2, 3.5, true);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Check enemy's position, and perform certain actions if necessary
Enemy.prototype.checkPosition = function() {
    // Get absolute distance between enemy and player using Pythagoras' Theorem
    if (player !== undefined) {
        var dx = this.x - player.x;
        var dy = this.y - player.y;
        var abs = Math.sqrt(dx * dx + dy * dy);
        if (abs < 0.4) {
            console.log('Collision!');
            player.x = 2;
            player.y = 4.5;
        }
    }
    // If enemy goes off the right end of the screen, call its constructor again
    if (this.x >= NUM_COLS) {
        Enemy.call(this);
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.checkPosition();
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * TILE_WIDTH, this.y * TILE_HEIGHT);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = 'images/char-boy.png';
}

// Check player's position and perform certain actions if necessary
Player.prototype.checkPosition = function() {
    // Check if player has won
    if (this.y === -0.5) {
        console.log('You win!')
    }
}

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x - 1 >= 0) {
        this.x -= 1;
    }
    if (key === 'up' && this.y - 1 >= -0.5) {
        this.y -= 1;
    }
    if (key === 'right' && this.x + 1 < NUM_COLS) {
        this.x += 1;
    }
    if (key === 'down' && this.y + 1 <= 4.5) {
        this.y += 1;
    }

    console.log(key, 'this.x =', this.x, 'this.y=', this.y)
}

Player.prototype.update = function(dt) {
    this.checkPosition();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * TILE_WIDTH, this.y * TILE_HEIGHT);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

_.times(15, function() {
    allEnemies.push(new Enemy());
});

var player = new Player(2, 4.5);

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
