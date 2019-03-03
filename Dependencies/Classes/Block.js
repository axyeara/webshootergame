// 16w 12h at 40x40

import Sprite from "./Sprite.js";

class Block extends Sprite {

    constructor (canvas, x, y, imageUrl, rotation) {
        super(canvas, x, y, imageUrl, rotation)
    }

    draw(ctx) {
        super.draw(ctx);
    }
}
export default Block;

