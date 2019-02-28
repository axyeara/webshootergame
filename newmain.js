
/*main class */


import PlayState from "./Dependencies/States/PlayState.js";
import StateMachine from "./Dependencies/StateMachine.js";
import Player from "./Dependencies/Classes/Player.js";
import Monster from "./Dependencies/Classes/Monster.js";
import Block from "./Dependencies/Classes/Block.js";
import Level from "./Dependencies/Classes/Level.js";


/*setting up the canvas */
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// let background = new Image();
// background.src = "cloudbackground.jpg";


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.addEventListener("mousedown", onMouseClick, false);
canvas.addEventListener("mousemove", onMouseClick, false);
canvas.addEventListener("mouseup", onMouseUnClick, false);
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

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

let simpleLevelPlan = httpGet("./Maps/map1");
// `
//     ................
//     ................
//     ####........####
//     ................
//     ........!.......
//     ......####......
//     ................
//     ...........!....
//     ..####....####..
//     ................
//     @...............
//     ################`;

let level = new Level(canvas);
let ret = level.parseMap(simpleLevelPlan);
let player_x = ret[0];
let player_y = ret[1];
let blocks = ret[2];
blocks = blocks.map(x => new Block(canvas, 'floor.png', x[0], x[1]));

let monsters = ret[3];
monsters = monsters.map(x => new Monster(canvas, x[0], x[1], simpleLevelPlan.trim().split('\n').map(x => x.trim())));
stateMachine.change("play", {
    "monsters" : monsters,
    "blocks" : blocks,
    "player" : new Player(canvas, player_x, player_y, simpleLevelPlan.trim().split('\n').map(x => x.trim()))
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

function onMouseClick(e){
    if(e.buttons != 0){
        keyboardKeys["mouse"]=e;
    }else{
        onMouseUnClick();
    }
    // let endX = e.clientX;
    // let endY = e.clientY;
    // let startX = x+(image.width/2);
    // let startY = y+(image.width/2);
    // shots.push(new Shot(new Point(startX,startY),
    //     (new Date()).getTime(),new Point(endX,endY),speed))
}
function onMouseUnClick(){
    keyboardKeys["mouse"]=null;
}
/*function keyPressHandler(e) {
    if (e.key == "Space") {
        keyboardKeys["space"] = true;
    }
}*/

// Initializes the game loop

setInterval(function () {
    update();
}, 1); // set "FPS"

setInterval(function () {
    draw();
}, 1000/60);


