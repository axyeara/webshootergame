
/*main class */


import PlayState from "./Dependencies/States/PlayState.js";
import StateMachine from "./Dependencies/StateMachine.js";
import Player from "./Dependencies/Classes/Player.js";


/*setting up the canvas */
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let background = new Image();
background.src = "cloudbackground.jpg";


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("keypress", keyPressHandler, false);

let keyboardKeys = {
    "right": false,
    "left": false,
    "space": false,
};




let stateMachine = new StateMachine(
    {
        "play": new PlayState(ctx, canvas)
    }
);

stateMachine.change("play", {
    "player" : new Player(ctx, canvas)
});


function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    stateMachine.draw();

}

function update() {
    stateMachine.update(keyboardKeys);
}


function keyDownHandler(e) {

    if (e.key == "Right" || e.key == "ArrowRight" || e.keyCode == 68 || e.key == "KeyD") {
        keyboardKeys["right"] = true;

    }
    if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "KeyA" || e.keyCode == 65) {
        keyboardKeys["left"] = true;
    }
    if (e.keyCode == 32 || e.key == "Space") {
        keyboardKeys["space"] = true;
    }

}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" || e.keyCode == 68 || e.key == "KeyD") {
        keyboardKeys["right"] = false;
    }
    if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "KeyA" || e.keyCode == 65) {
        keyboardKeys["left"] = false;
    }
    if (e.keyCode == 32 || e.key == "Space") {
        keyboardKeys["space"] = false;
    }
}

/*function keyPressHandler(e) {
    if (e.key == "Space") {
        keyboardKeys["space"] = true;
    }
}*/

// Initializes the game loop

setInterval(function () {
    draw();
    update();
}, 1); // set "FPS"





