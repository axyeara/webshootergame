    /*
    Player class

    - AY
 */

function Monster(canvas, x, y, levelMap) {
    var image = new Image();
    var levelMap = levelMap;
    image.src = "./player.png";
    var width = 0;
    var height = 0;
    var dx = 0.3;
    var dy = 0.05;

    image.onload = function() {
        width = this.naturalWidth;
        height = this.naturalHeight;
        y = y-height;
    }


    function draw(ctx) {
        ctx.drawImage(image, x, y);
    }

    function update(){
        var y_t = Math.max(Math.floor(((y+1)/40)),0);
        var y_b = Math.floor(((y+height-1)/40));
        var y_diff = y_b - y_t;
        var i;
        var collision = false;
        
        // var new_x = (x + dx)/40;
        // for (i = 0; i <= y_diff; i++) {
        //     if (levelMap[y_t+i][new_x] == '#') {
        //         collision = true;
        //         break;
        //     }
        // }
        // if (!collision) {
        //     x = Math.max(x - dx, 0);
        // }
        x = x - dx;
        // if (dx > 0) {
        //     dx -= 0.2;
        // }
        // else {
        //     dx += 0.2;
        // }

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
export default Monster;

