class BoundingBox {

    constructor(sprite) {
        this.sprite = sprite;
        this.center = {x: this.sprite.x + this.sprite.width/2, y: this.sprite.y + this.sprite.height/2};
        this.topLeft = this.getNewCorner(this.center, {x: sprite.x, y: sprite.y});
        this.topRight = this.getNewCorner(this.center, {x: sprite.x + sprite.width, y: sprite.y});
        this.botLeft = this.getNewCorner(this.center, {x: sprite.x, y: sprite.y + sprite.height});
        this.botRight = this.getNewCorner(this.center, {x: sprite.x + sprite.width, y: sprite.y + sprite.height});
    }

    getNewCorner(centerPoint, oldPoint) {
        let xDist = oldPoint.x - centerPoint.x;
        let yDist = oldPoint.y - centerPoint.y;
        let newX = centerPoint.x + xDist*Math.cos(-this.sprite.angle) + yDist*Math.sin(-this.sprite.angle);
        let newY = centerPoint.y - xDist*Math.sin(-this.sprite.angle) + yDist*Math.cos(-this.sprite.angle);
        return {x: newX, y: newY};
    }
}
export default BoundingBox;