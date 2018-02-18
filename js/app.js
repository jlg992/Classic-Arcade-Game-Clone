// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 100 + Math.random() * 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 505) {
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    //Initial location of player
    this.x = 200;
    this.y = 405;
};


Player.prototype.update = function(dt) {
    switch (this.input) {
        case 'left':
            if (player.x !== 0) {
                player.x = player.x - 100;
            }
            break;
        case 'up':
            if (player.y > 73) {
                player.y = player.y - 83;
            }
            else {
                player.x = 200;
                player.y = 405;
            }
            break;
        case 'right':
            if (player.x !== 400) {
                player.x = player.x + 100;
            }
            break;
        case 'down':
            if (player.y !== 405) {
                player.y = player.y + 83;
            }
            break;
    }
    this.input = null;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    this.input = input;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemy1 = new Enemy(0, 63);
var enemy2 = new Enemy(0, 145);
var enemy3 = new Enemy(0, 229);
allEnemies.push(enemy1, enemy2, enemy3);


// Place the player object in a variable called player
var player = new Player();



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
