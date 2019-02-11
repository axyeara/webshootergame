

/*
This is the PlayState "class". This would normally implement a BaseState interface but
apparently you cannot implement an interface in JavaScript right off the bat.
 */





function PlayState(ctx, canvas) {



    this.enter = function(params) {
        this.player = params["player"];
    }
    this.update = function(params) {
        this.player.update(params);
    }
    this.draw = function() {
        this.player.draw();
    }
}


export default PlayState;