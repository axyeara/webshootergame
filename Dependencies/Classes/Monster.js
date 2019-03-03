    /*
    Player class

    - AY
 */
import Sprite from "./Sprite.js";

class Monster extends Sprite {

    constructor(canvas, x, y, imageUrl, rotation) {
        super(canvas, x, y-0.1, imageUrl, rotation);
        this.onFloor = 1;
        this.dx = 1;
        this.dy = 0.5;
    }

    draw(ctx) {
        super.draw(ctx);
    }

    update(params){
        if (!super.update(params)) {
            return;
        }

        this.x = Math.min(Math.max(this.x + this.dx, 0),this.canvas.width);
        let touching = this.getTouching();
        if (touching.length) {
            this.x = this.x - this.dx;
            this.dx = -this.dx;
        }

        this.y = this.y + this.dy;
        let tmpx = this.x;
        this.x = this.x + this.dx*40;
        touching = this.getTouching();
        if (!touching.length) {
            this.dx = -this.dx;
        }
        this.x = tmpx;
        this.y = this.y - this.dy;

        return true;
    }
}
export default Monster;

