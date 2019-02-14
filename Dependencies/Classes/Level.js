function Level(canvas) {

    var height = 0;
    var width = 0;
    var blocks = [];
    var blockSize = 0;

    function parseMap(levelMap) {
        let rows = levelMap.trim().split("\n").map(x => x.trim());
        height = rows.length;
        width = rows[0].length;
        blockSize = canvas.width/width;
        blocks = [];
        var player_x = 0;
        var player_y = 0;

        var i;
        var j;
        for (i = 0; i < height; i++) {
            for (j = 0; j < width; j++) {
                if (rows[i][j] == '#') {
                    blocks.push([j*blockSize,i*blockSize]);
                }
                else if (rows[i][j] == '@') {
                    player_x = j*blockSize;
                    player_y = (i+1)*blockSize;
                }
            }
        }

        return [player_x, player_y, blocks];
    }

    return Object.freeze({
        parseMap,
    });

}

export default Level;