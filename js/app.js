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
    this.checkCollisions();
    if (this.x >= 505) {
      this.x = 0;
    }
};

//As enemies move, check to see if they've collided with  player
Enemy.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + 50 && allEnemies[i].x + 50 > player.x &&
        allEnemies[i].y < player.y + 55 && 55 + allEnemies[i].y > player.y) {
            player.x = 200;
            player.y = 405;
        }
    }
};
/*
Source: 2D collision detection
(https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
 */

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


Player.prototype.update = function() {
    switch (this.input) {
        case 'left':
            if (this.x !== 0) {
                this.x = this.x - 100;
            }
            break;
        case 'up':
            if (this.y > -10) {
                this.y = this.y - 83;
                if (this.y === -10) {
                    this.winCondition();
                }
            }
            break;
        case 'right':
            if (this.x !== 400) {
                this.x = this.x + 100;
            }
            break;
        case 'down':
            if (this.y !== 405) {
                this.y = this.y + 83;
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

Player.prototype.winCondition = function() {
    /*
    Open a modal box, when player reaches the river.
    Source: How To Create a Modal Box(https://www.w3schools.com/howto/howto_css_modals.asp)
     */
    // Get the modal
    var modal = document.getElementById('myModal');

    //Get the button in modal
    var button = document.querySelector("button");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
  };

    button.onclick = function() {
        modal.style.display = "none";
        player.x = 200;
        player.y = 405;
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
    }
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
