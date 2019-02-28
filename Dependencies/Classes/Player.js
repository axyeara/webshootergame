    /*
    Player class

    - AY
 */

import {Shot,Point} from "./Shot.js";

function Player(canvas, x, y, levelMap) {
    var image = new Image();
    image.src = "./player.png";
    // var y = canvas.height;
    // var x = 0;
    var width = 0;
    var height = 0;
    var dx = 1;
    var dy = 0.05;
    var shots = [];
    var shoot_cd = 200;

    image.onload = function() {
        width = this.naturalWidth;
        height = this.naturalHeight;
        y = y-height;
    }

    function draw(ctx) {
        shots.forEach((shot)=>{
            shot.draw(ctx);
        })
        ctx.drawImage(image, x, y);
    }

    function update(params){
        let keys = params;
        var y_t = Math.max(Math.floor(((y+1)/40)),0);
        var y_b = Math.floor(((y+height-1)/40));
        var y_diff = y_b - y_t;
        var i;
        var collision = false;
        
        { // temporary place form bullet
            shots = shots.filter((v)=>{ return v.update(params)});

            if(shoot_cd<=0 && params["mouse"]){
                let e = params["mouse"];
                shots.push(new Shot(new Point(x+(image.width/2),y+(image.height/2)),
                                    new Point(e.clientX,e.clientY),0.5));
                shoot_cd = 100;
            }else{
                if (shoot_cd>0)
                    shoot_cd -= 1;
            }
        }
        if (params["right"]) {
            var new_x = Math.min(Math.floor(((x + dx + width)/40)),
                Math.floor((canvas.width - width)/40));
            
            for (i = 0; i <= y_diff; i++) { 
            // in case model is bigger than a block, check inside
                if (levelMap[y_t+i][new_x] == '#') {
                    collision = true;
                    break;
                }
            }

            if (!collision) {
                x = Math.min(x + dx, canvas.width - width);
            }
            
        }
        if (params["left"]) {
            var new_x = Math.max(Math.floor(((x - dx)/40)), 0);

            for (i = 0; i <= y_diff; i++) {
                if (levelMap[y_t+i][new_x] == '#') {
                    collision = true;
                    break;
                }
            }

            if (!collision) {
                x = Math.max(x - dx, 0);
            }

        }


        if (levelMap[Math.min(Math.floor(((y + height + 1)/40)),
            Math.floor((canvas.height)/40) - 1)][Math.floor((x/40))] == '#' ||
                 levelMap[Math.min(Math.floor(((y + height + 1)/40)),
                Math.floor((canvas.height)/40) - 1)][Math.floor(((x+width)/40))] == '#') {
            if (keys["space"]) {
                if (dy >= -0.2)
                    dy = -4;
            }
        }

        var new_y_t = Math.max(Math.floor(((y + dy)/40)), 0);
        var new_y_b = Math.min(Math.floor(((y + dy + height)/40)),
            Math.floor((canvas.height)/40) - 1);
        var x_l = Math.floor((x/40));
        var x_r = Math.floor(((x+width)/40));
        
        var x_diff = x_r - x_l;
        var collision_b = false;
        var collision_t = false;
        for (i = 0; i <= x_diff; i++) {
            if (levelMap[new_y_b][x_l+i] == '#' ||
                 Math.floor(((y + dy + height)/40)) > Math.floor((canvas.height)/40) - 1) {

                collision_b = true;
                break;
            }
            if (levelMap[new_y_t][x_l+i] == '#' || Math.floor(((y + dy)/40)) < 0) {
                collision_t = true;
                break;
            }
        }

        if (collision_b) {
            dy = 0.05;
        }
        else if (collision_t) {
            dy /= 2;
        }
        else {
            y = Math.min(y + dy, canvas.height - height);
            y = Math.max(y, 0);
        }
        if (dy < 20){
            dy += 0.05;
        }
    }

    return Object.freeze({
        draw,
        update
    });
}
export default Player;

