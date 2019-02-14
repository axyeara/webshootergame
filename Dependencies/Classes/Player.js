/*
    Player class

    - AY
 */

function Player(ctx, canvas) {
    this.image = new Image();
    this.image.src = "player.png";
    this.width = this.image.width;
    this.height = this.image.height;
    this.x = 50;
    this.y = canvas.height - this.height;
    this.dx = 1;
    this.dy = 0;
    this.ctx = ctx;


    this.draw = function () {
        this.ctx.drawImage(this.image, this.x, this.y);
    }
    this.update = function (params){

        this.keys = params;


        if (params["right"]) {
            this.x = Math.min(this.x + this.dx, canvas.width - this.width)
        }
        if (params["left"]) {
            this.x = Math.max(this.x - this.dx, 0);
        }


        if (this.y >= canvas.height - this.height) {

            if (this.keys["space"]) {

                console.log(this.y);
                console.log(this.dy);
                this.dy = -4;
            }
        }

        this.y = Math.min(this.y + this.dy, canvas.height - this.height);
        this.dy += 0.05;
    }
}
export default Player;

