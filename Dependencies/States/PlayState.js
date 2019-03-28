

/*
This is the PlayState "class". This would normally implement a BaseState interface but
apparently you cannot implement an interface in JavaScript right off the bat.
 */

var playState = null;

class PlayState {

    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.canvas.style.backgroundImage = "url('cloudbackground.jpg')";
        playState = this;
    }

    enter(params) {
        this.sprites = params["sprites"];
    }
    
    update(params) {
        this.sprites.forEach(sprite => {
            sprite.update(params);
        });

        this.sprites = this.sprites.filter((s) => {return s.hp > 0});
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var i;
        for (i = 0; i < this.sprites.length; i++) {
            this.sprites[i].draw(this.ctx);
        }
    }

    removeSprite(sprite) {
        this.sprites = this.sprites.filter((s) => { return s != sprite})
    }
    
    addSprite(sprite) {
        this.sprites.push(sprite);
    }

    
}
export default PlayState;

export function addSprite(sprite) {
    playState.addSprite(sprite);
}