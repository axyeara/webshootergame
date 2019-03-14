
import {Shot,Point} from "./Shot.js";
import Sprite from "./Sprite.js";

class Player extends Sprite {

    constructor(canvas, x, y, imageUrl, rotation) {
        super(canvas, x, y-1, imageUrl, rotation);
        this.onFloor = 1;
        this.shoot_cd = 0;
        this.gunloaded = 0;
        this.gun = new Image();
        this.gun.src = 'ak-47.png';
        this.gun.onload = () => {
            this.gunloaded = 1;
        };
        this.gunrotation = 0;
        this.hp = 15;
    }

    draw(ctx) {
        super.draw(ctx);

        if (this.gunloaded) {
            ctx.save();
            ctx.translate(this.x+this.width/2,this.y+this.height/2);
            ctx.rotate(this.gunrotation);
            if (Math.abs(this.gunrotation) > 1.5) {
                ctx.scale(1,-1);
            }
            ctx.drawImage(this.gun,0,0);
            ctx.restore();
        }

        ctx.fillStyle = 'green';
        for (var i = 0; i < this.hp; i++) {
            ctx.fillRect(20*i, 20, 100, 50);
        }
    }

    update(params){
        if (!super.update(params)) {
            return;
        }
        let keys = params;
        if (params["mouseMove"]) {
            let coord = getCursorPosition(this.canvas, params["mouseMove"]);
            this.gunrotation = getTanAngle({x: this.x+this.width/2, y: this.y+this.height/2}, {x: coord.x, y: coord.y});
        }


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
            touching.forEach(sprite => {
                if (sprite.constructor.name == "Monster") {
                    this.dx = (this.dx)*20;
                    this.dy = -1;
                    this.hp -= 1;
                }
            });
            this.x = this.x - this.dx;
            this.dx = this.dx/-3;
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

function getTanAngle(startPoint,endPoint){
    let adj = endPoint.x - startPoint.x;
    let oppo = endPoint.y - startPoint.y;
    let angle = Math.atan2(oppo,adj);
    return angle;
}