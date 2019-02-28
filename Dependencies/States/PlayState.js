

/*
This is the PlayState "class". This would normally implement a BaseState interface but
apparently you cannot implement an interface in JavaScript right off the bat.
 */

function PlayState(ctx, canvas) {

    this.enter = function(params) {
        this.monsters = params["monsters"];
        this.blocks = params["blocks"];
        this.player = params["player"];
    }
    this.update = function(params) {
        var i;
        for (i = 0; i < this.monsters.length; i++) {
            this.monsters[i].update();
        }
        this.player.update(params);
    }
    this.draw = function() {
        var i;
        for (i = 0; i < this.blocks.length; i++) {
            this.blocks[i].draw(ctx);
        }
        for (i = 0; i < this.monsters.length; i++) {
            this.monsters[i].draw(ctx);
        }
        this.player.draw(ctx);
    }
}


export default PlayState;