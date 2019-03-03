
var collisionChecker = null;

class CollisionChecker {

    constructor(canvas, playState) {
        this.canvas = canvas;
        this.playState = playState;
        collisionChecker = this;
    }

    getTouching(sprite) {
        var boundingBox = sprite.getBoundingBox();
        var collidedSprites = [];
        var sprites = this.playState.sprites;
        for (var i = 0; i < sprites.length; i++) {
            if (!(sprite.ignoreCollision.includes(sprites[i])) && this.isColliding(boundingBox, sprites[i].getBoundingBox())) {
                collidedSprites.push(sprites[i]);
            }
        }
        return collidedSprites;
    }

    isColliding(sb1, sb2) { // sprite boundingboxes
        let axis1 = {x: sb1.topRight.x - sb1.topLeft.x, y: sb1.topRight.y - sb1.topLeft.y};
        let axis2 = {x: sb1.topRight.x - sb1.botRight.x, y: sb1.topRight.y - sb1.botRight.y};
        let axis3 = {x: sb2.topLeft.x - sb2.botLeft.x, y: sb2.topLeft.y - sb2.botLeft.y};
        let axis4 = {x: sb2.topLeft.x - sb2.topRight.x, y: sb2.topLeft.y - sb2.topRight.y};

        return (this.isOverlapping(axis1, sb1, sb2) && this.isOverlapping(axis2, sb1, sb2) && this.isOverlapping(axis3, sb1, sb2) && this.isOverlapping(axis4, sb1, sb2));
    }

    isOverlapping(axis, sb1, sb2) {
        let proj1 = this.projection(axis, sb1);
        let proj2 = this.projection(axis, sb2);

        let minMax1 = this.minMaxProj(axis, proj1);
        let minMax2 = this.minMaxProj(axis, proj2);

        return (minMax1.max >= minMax2.min && minMax1.min <= minMax2.max);
    }

    projection(axis, sb) {
        return {tR: this.projCalc(axis, sb.topRight),
                 tL: this.projCalc(axis, sb.topLeft),
                 bR: this.projCalc(axis, sb.botRight),
                 bL: this.projCalc(axis, sb.botLeft)};
    }

    projCalc(axis, point) {
        let proj = (point.x * axis.x + point.y * axis.y)/(Math.pow(axis.x, 2) + Math.pow(axis.y, 2));
        return {x: proj*axis.x, y: proj*axis.y};
    }

    minMaxProj(axis, proj) {
        let proj1 = this.dot(axis, proj.tR);
        let proj2 = this.dot(axis,proj.tL);
        let proj3 = this.dot(axis,proj.bR);
        let proj4 = this.dot(axis,proj.bL);
        return {min: Math.min(proj1, proj2, proj3, proj4),
                max: Math.max(proj1, proj2, proj3, proj4)};
    }

    dot(v1, v2) {
        return v1.x*v2.x + v1.y*v2.y;
    }

    inWindow(sprite){
        let boundingBox = sprite.getBoundingBox();
        return this.isPointInWindow(boundingBox.topLeft) ||
                this.isPointInWindow(boundingBox.topRight) ||
                this.isPointInWindow(boundingBox.botLeft) ||
                this.isPointInWindow(boundingBox.botRight);
        }

    isPointInWindow(point) {
        return point.x >= 0 && point.x <= this.canvas.width && point.y >= 0 && point.y <= this.canvas.height;
    }
}
export default CollisionChecker;

export function getTouching(sprite) {
    return collisionChecker.getTouching(sprite);
}

export function inWindow(sprite) {
    return collisionChecker.inWindow(sprite);
}
