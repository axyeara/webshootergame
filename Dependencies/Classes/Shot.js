
export class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

const bullet = new Image();
bullet.src = "./bullet.png";

export class Shot{
    constructor(startPoint,endPoint, speed){
        // this.startPoint = startPoint;   
        // this.currPos = startPoint;
        this.x = startPoint.x;
        this.y = startPoint.y;
        // this.speed = speed;
        this.angle = this.getTanAngle(startPoint,endPoint);
        this.dx = speed*Math.cos(this.angle);
        this.dy = speed*Math.sin(this.angle);   
    }

    getTanAngle(startPoint,endPoint){
        let adj = endPoint.x - startPoint.x;
        let oppo = endPoint.y - startPoint.y;
        let angle = Math.atan(oppo/adj);
        if (angle<0){
            angle += 2*Math.PI;
        }
        if (adj<0){
            // the positive values for
            // tangent are on opposite sides
            // of the unit circle
            angle+=Math.PI;
            // remember, arctan (taninv)
            // has a codomain of [-pi/2,pi/2]
            // but we must account for a full circle
        }
        angle = angle%(2*Math.PI);
        return angle;

    }

    inWindow(){
        return (this.x>0 && this.y>0 && this.x<640 && this.y<480); 
    }

    update(keyEvent){
        this.x+=this.dx;
        this.y+=this.dy;
        return this.inWindow();
    }

    draw(ctx){
        // if(this.bullet){
            ctx.save();
            ctx.translate(this.x,this.y)
            ctx.rotate(this.angle);
            //rotate bullet image
            ctx.drawImage(bullet,-(bullet.width/2),-(bullet.width/2));
            ctx.restore();
        // }
    }

}
