
import {Shot,Point} from "./Shot.js";
import Sprite from "./Sprite.js";

class Player extends Sprite {

    constructor(canvas, x, y, imageUrl, rotation) {
        super(canvas, x, y-1, imageUrl, rotation);
        this.onFloor = 1;
        this.shoot_cd = 0;
    }

    draw(ctx) {
        super.draw(ctx);
    }

    update(params){
        if (!super.update(params)) {
            return;
        }
        let keys = params;

        if(this.shoot_cd<=0 && params["mouse"]){
            let e = params["mouse"];
            let coords = getCursorPosition(this.canvas, e);
            let shot = new Shot(this.canvas, new Point(this.x+(this.image.width/2),this.y+(this.image.height/2)),
                                new Point(coords.x,coords.y),'bullet.png', 2, 1, this);
            shot.ignoreCollision.push(this);
            this.ignoreCollision.push(shot); // removing this line makes it possible to jump on own bullets
            this.shoot_cd = 100;
            this.addSprite(shot);
        }else{
            if (this.shoot_cd>0)
                this.shoot_cd -= 1;
        }
        
        if (keys["right"]) {
            this.dx = 1;
        }
        else if (keys["left"]) {
            this.dx = -1;
        }
        else {
            this.dx = 0;
        }

        this.x = this.x + this.dx;
        let touching = this.getTouching();
        if (touching.length) {
            this.x = this.x - this.dx;
        }

        if (keys["space"] && this.onFloor) {
            this.dy = -4.2;
        }

        this.y = this.y + this.dy;
        touching = this.getTouching();
        if (touching.length) {
            //console.log(touching);
            this.y = this.y - this.dy;
            if (this.dy <= 0) {
                this.dy /= 2;
            }
            else if (this.dy > 0) {
                this.dy = 0.05;
                this.onFloor = 1;
            }
        }
        else {
            if (this.y == 0) {
                this.dy /= 2;
            }
            this.onFloor = 0;
        }
        if (this.dy < 20){ // max gravity
            this.dy += 0.05;
        }
    }

}
export default Player;

function getCursorPosition(canvas, event) {
    let scale = canvas.height/window.innerHeight;
    let x = scale*event.clientX;
    let y = scale*event.clientY;
    return {x: x, y: y};
}