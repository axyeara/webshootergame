import Sprite from "./Sprite.js";
import { getTouching } from "../../CollisionChecker.js";

export class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

export class Shot extends Sprite {

    constructor(canvas, startPoint,endPoint, imageUrl, speed, damage, owner){
        super(canvas, startPoint.x, startPoint.y, imageUrl, getTanAngle(startPoint,endPoint));
        this.dx = speed*Math.cos(this.angle);
        this.dy = speed*Math.sin(this.angle);
        this.damage = damage;
        this.owner = owner;
        this.collisionChecker;
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
            this.x = this.x - this.width/2;
            this.y = this.y - this.height/2;
            this.loaded++;
        };
    }

    update(params){
        if (!super.update(params)) {
            return;
        }

        this.x+=this.dx;
        this.y+=this.dy;

        let touching = this.getTouching();
        touching.forEach(sprite => {
            this.hp = 0;
            if (sprite.constructor.name != "Block") {
                sprite.hp = 0;
            }
        });

    }

    draw(ctx){
        super.drawBoundingBox(ctx);
        let boundingBox = this.getBoundingBox();
        ctx.save();
        ctx.translate(boundingBox.topLeft.x,boundingBox.topLeft.y)
        ctx.rotate(this.angle);
        ctx.drawImage(this.image,0,0);
        ctx.restore();
    }
}


function getTanAngle(startPoint,endPoint){
    let adj = endPoint.x - startPoint.x;
    let oppo = endPoint.y - startPoint.y;
    let angle = Math.atan2(oppo,adj);
    return angle;
}