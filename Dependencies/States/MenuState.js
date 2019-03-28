

/*
This is the menuState "class". This would normally implement a BaseState interface but
apparently you cannot implement an interface in JavaScript right off the bat.
 */

var menuState = null;

class MenuState {

    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.ctx.font = "100px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.canvas = canvas;
        this.canvas.style.backgroundImage = "None";
        menuState = this;
    }

    enter(params) {}

    update(){}

    draw() {
        this.ctx.fillText("Shooter Game", this.canvas.width / 2, 200);
    }
}
export default MenuState;

