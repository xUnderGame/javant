import * as handler from "/src/scripts/games.js";
if (!handler.loginCheck()) window.open("/login.html", "_self");

var ground = document.getElementById("ground");
var player = document.getElementById("player");
var maxLeft = window.innerWidth;
player.style.top = "10%";
player.style.left = "50%";
var flag = false;

window.addEventListener("keydown", movePlayer);

// Player movement
function movePlayer(e) {
    if (e.code == "ArrowLeft" && player.style.left >= "0%") {
        movePlayerLeft();
    }
    else if (e.code == "ArrowRight" && parseFloat(player.style.left.replace("%", "")) / 100 * maxLeft + 40 < maxLeft) {
        movePlayerRight();
    }
}
function movePlayerLeft() {
    let left = player.style.left.replace("%", "");
    player.style.left = (parseFloat(left) - 1.5) + "%";
}
function movePlayerRight() {
    let left = player.style.left.replace("%", "");
    player.style.left = (parseFloat(left) + 1.5) + "%";
}

// Runs the game.
handler.runGame(movePlayerDown);

// Moves the player to the left.
function movePlayerDown(intervalTimer) {
    let top = player.style.top.replace("%", "");
    (top < 100 && !flag) ? player.style.top = (parseFloat(top) + 2.5) + "%" : clearInterval(intervalTimer);
    if (checkCollision()) {
        handler.gameWin();
    }
}

// Checks for the player colliding with the diamond. 
function checkCollision() {
    let dirts = document.getElementsByClassName("dirt");
    let diamond = document.getElementById("diamond");
    let diamondHitBox = diamond.getBoundingClientRect();
    let playerHitBox = player.getBoundingClientRect();
    for (let i = 0; i < dirts.length; i++) {
        const dirtHitBox = dirts[i].getBoundingClientRect();
        if (playerHitBox.bottom >= dirtHitBox.top - 16 && !(diamondHitBox.left - 15 <= playerHitBox.left && diamondHitBox.right + 15 >= playerHitBox.right)) {
            handler.gameLost();
        }
    }
    if (diamondHitBox.top <= playerHitBox.bottom && diamondHitBox.left - 15 <= playerHitBox.left && diamondHitBox.right + 15 >= playerHitBox.right && diamondHitBox.bottom >= playerHitBox.top) {
        return true;
    }
}

// Make the ground
function setGround() {
    let max = (maxLeft - 40) / 40;
    let diamond = Math.floor((Math.random()) * (max - 10) + 5);
    ground.style.top = "80%";

    // Ground tiles.
    for (let i = 0; i < max; i++) {
        let img = document.createElement("img");
        if (diamond == i) {
            img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQDd_l2_WZtjze4Z-UQw8ptMc9C_C-FiLhzw&usqp=CAU"
            img.id = "diamond";
        }
        else {
            img.src = 'data:image/jpeg;base64,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';
            img.classList.add("dirt")
        }
        ground.appendChild(img);
    }
}
setGround();