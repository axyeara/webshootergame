
/*main class */


import PlayState from "./Dependencies/States/PlayState.js";
import MenuState from "./Dependencies/States/MenuState.js";
import StateMachine from "./Dependencies/StateMachine.js";
import Player from "./Dependencies/Classes/Player.js";
import Monster from "./Dependencies/Classes/Monster.js";
import Block from "./Dependencies/Classes/Block.js";
import Level from "./Dependencies/Classes/Level.js";
import CollisionChecker from "./CollisionChecker.js";


/*setting up the canvas */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// let background = new Image();
// background.src = "cloudbackground.jpg";


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousedown", onMouseClick, false);
document.addEventListener("mousemove", onMouseClick, false);
document.addEventListener("mouseup", onMouseUnClick, false);
//document.addEventListener("keypress", keyPressHandler, false);

let keyboardKeys = {
    "right": false,
    "left": false,
    "space": false,
};

let playState = new PlayState(ctx, canvas);
let menuState = new MenuState(ctx, canvas);
new CollisionChecker(canvas, playState);

let stateMachine = new StateMachine(
    {
        "menu": menuState,
        "play": playState
    }
);

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

let simpleLevelPlan = httpGet("./Maps/map2");

let level = new Level(canvas);
let ret = level.parseMap(simpleLevelPlan);
let players = ret[0];
players = players.map(x => new Player(canvas, x[0], x[1], 'player.png', 0));
let blocks = ret[1];
blocks = blocks.map(x => new Block(canvas, x[0], x[1], 'floor.png', 0));
let monsters = ret[2];
monsters = monsters.map(x => new Monster(canvas, x[0], x[1], 'monster.png', 0));
let sprites = blocks.concat(monsters).concat(players);

//console.log(sprites);

stateMachine.change("menu", null);


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
    keyboardKeys["mouseMove"]=e;
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

function startGame() {
    stateMachine.change("play", {
    "sprites": sprites
    });
    singleButton.disabled=true;
    multiButton.disabled=true;
    singleButton.style.visibility="hidden";
    multiButton.style.visibility="hidden";
}

let singleButton = document.getElementById("singlebutton");
let multiButton = document.getElementById("multibutton");
singleButton.onclick = startGame;


// Initializes the game loop

setInterval(function () {
    update();
}, 1); // set "FPS"

setInterval(function () {
    draw();
}, 1000/60);


