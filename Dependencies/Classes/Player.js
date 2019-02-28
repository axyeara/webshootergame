    /*
    Player class

    - AY
 */

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Shot{
    constructor(startPoint,startTime,endPoint, speed){
        this.startPoint = startPoint;
        this.startTime = startTime;
        this.currPos = null;
        this.speed = speed;
        this.angle = this.getTanAngle(startPoint,endPoint);
    }

    getTanAngle(startPoint,endPoint){
        let adj = endPoint.x - startPoint.x;
        let oppo = endPoint.y - startPoint.y;
        let angle = Math.atan(oppo/adj);
        if (angle<0){
            angle += 2*Math.PI;
        }
        if (adj<0){
            // the positive values for
            // tangent are on opposite sides
            // of the unit circle
            angle+=Math.PI;
            // remember, arctan (taninv)
            // has a codomain of [-pi/2,pi/2]
            // but we must account for a full circle
        }
        angle = angle%(2*Math.PI);
        return angle;

    }

    pos(time){
        let elapsed = time-this.startTime; // time in ms
        let hyp = elapsed*this.speed;
        let dx = hyp*Math.cos(this.angle);
        let dy = hyp*Math.sin(this.angle);
        this.currPos = new Point(this.startPoint.x+dx, this.startPoint.y+dy);
        return this.currPos;

    }


}

function Player(ctx, canvas, x, y, levelMap) {
    var image = new Image();
    image.src = "./player.png";
    let bullet = new Image();
    bullet.src = "./bullet.png";
    // var y = canvas.height;
    // var x = 0;
    var width = 0;
    var height = 0;
    var dx = 1;
    var dy = 0.05;
    var shots = [];
    var speed = 0.5; // the speed of bullets per millisecond
    canvas.addEventListener("click", onMouseClick, false);

    function onMouseClick(e){
        let endX = e.clientX;
        let endY = e.clientY;
        let startX = x+(image.width/2);
        let startY = y+(image.width/2);
        shots.push(new Shot(new Point(startX,startY),
            (new Date()).getTime(),new Point(endX,endY),speed))



    }

    image.onload = function() {
        width = this.naturalWidth;
        height = this.naturalHeight;
        y = y-height;
    }

    var inWindow = (point) => { return (point.x>0 && point.y>0 && point.x<canvas.width && point.y<canvas.height); }

    function draw() {
        let time = (new Date()).getTime();
        for (let shot of shots){
            let shotPos = shot.pos(time);            
            if (inWindow(shotPos)){
                ctx.translate(shotPos.x,shotPos.y)
                ctx.rotate(shot.angle);
                //rotate bullet image
                ctx.drawImage(bullet,-(bullet.width/2),-(bullet.width/2));
                ctx.rotate(-shot.angle);
                ctx.translate(-shotPos.x,-shotPos.y);
            } else {
                let index = shots.indexOf(shot);
                shots.splice(index,1);
                // remove the shot if it has reached its dest
            }
        }
        ctx.drawImage(image, x, y);
    }

    function update(params){
        let keys = params;
        var y_t = Math.max(Math.floor(((y+1)/40)),0);
        var y_b = Math.floor(((y+height-1)/40));
        var y_diff = y_b - y_t;
        var i;
        var collision = false;
        
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

