// 16w 12h at 40x40

// @ = player, # = floor
// let simpleLevelPlan = `
// ................
// ................
// ####........####
// ................
// ................
// ......####......
// ................
// ................
// ..####....####..
// ................
// @...............
// ################`;

function Block(ctx, canvas, imageUrl, x, y) {
    var image = new Image();
    image.src = imageUrl;
    var width = 0;
    var height = 0;

    image.onload = function() {
        width = this.naturalWidth;
        height = this.naturalHeight;
    }

    function draw() {
        ctx.drawImage(image, x, y);
    }

    return Object.freeze({
        draw,
    });
}
export default Block;

