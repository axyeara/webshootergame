import BoundingBox from "../../BoundingBox.js";
import {getTouching, inWindow} from "../../CollisionChecker.js";
import {addSprite} from "../States/PlayState.js";

class Sprite {

    image = new Image();
    dx = 0;
    dy = 0;
    width = 0;
    height = 0;
    loaded = 0;
    total = 0;
    hp = 1;
    ignoreCollision = [];

    constructor(canvas, x, y, imageUrl, angle) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.image.src = imageUrl;
        this.total++;
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
            this.y = this.y - this.height;
            this.loaded++;
        };
        this.angle = angle;
        this.ignoreCollision.push(this);
    }

    getBoundingBox() {
        var boundingBox = new BoundingBox(this,0);
        return boundingBox;
    }

    getTouching() {
        return getTouching(this);
    }

    inWindow() {
        return inWindow(this);
    }

    update(params) {
        this.ignoreCollision = this.ignoreCollision.filter((s) => {return s.hp > 0});
        if (this.loaded != this.total) {
            return false;
        }
        if (!this.inWindow()) {
            this.hp = 0;
            return false;
        }
        return true;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
        this.drawBoundingBox(ctx); // turn on bounding boxes drawing
    }

    drawBoundingBox(ctx) {
        let boundingBox = this.getBoundingBox();
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.moveTo(boundingBox.topLeft.x, boundingBox.topLeft.y);
        ctx.lineTo(boundingBox.topRight.x, boundingBox.topRight.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(boundingBox.topRight.x, boundingBox.topRight.y);
        ctx.lineTo(boundingBox.botRight.x, boundingBox.botRight.y);
        ctx.lineTo(boundingBox.botLeft.x, boundingBox.botLeft.y);
        ctx.lineTo(boundingBox.topLeft.x, boundingBox.topLeft.y);
        ctx.stroke();
    }

    addSprite(sprite) {
        addSprite(sprite);
    }

}
export default Sprite;