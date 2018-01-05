// Set up!
var a_canvas = document.getElementById("a");
var context = a_canvas.getContext("2d");
var HEIGHT = 25;
var WIDTH = 25;
var fH = 500;
var fW = 500;
var cH = fH/HEIGHT;
var cW = fW/WIDTH;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

function mod(n, m) {
        return ((n % m) + m) % m;
};

function randRGB() {
    return Math.floor(Math.random() * 256);
};

function randRange(s, f) {
    range = f - s;
    return Math.floor(Math.random() * range) + s;
};

function bump(a) {
    if (a < 0) {
        return 0;
    }
    if (a > 255) {
        return 255;
    }
    return a;
};

function newGen(cell, x, y) {
    newR = bump(randRange(-10, 11) + cell.r);
    newG = bump(randRange(-10, 11) + cell.g);
    newB = bump(randRange(-10, 11) + cell.b);
    // console.log(newR, newG, newB);
    return Cell(newR, newG, newB, x, y);
}

var drawCells = function (cells) {
    for (i = 0; i < HEIGHT; i++) {
        for (j = 0; j < WIDTH; j++) {
            // console.log(cells[i][j]);
            context.fillStyle = getRGB(cells[i][j]);
            context.fillRect(i*cW, j*cH, cW, cH);
        }
    }    
};

var ageCells = function (cells) {
    for (i = 0; i < HEIGHT; i++) {
        for (j = 0; j < WIDTH; j++) {
            // console.log(cells[i][j]);
            cells[i][j] = newGen(cells[i][j], i, j);
            context.fillStyle = getRGB(cells[i][j]);
            context.fillRect(i*cW, j*cH, cW, cH);
        }
    }    
};

function getRGB(cell) {
    return 'rgb(' + cell.r + ',' + cell.g + ',' + cell.b + ')';
};

function Cell(r, g, b, x, y) {
    var cell = {
        r: r,
        g: g,
        b: b,
        x: x,
        y: y,
    };
    return cell;
};

function newCell(x, y) {
    return Cell(randRGB(), randRGB(), randRGB(), x, y);
};

var cells = new Array(HEIGHT);
for (i = 0; i < HEIGHT; i++) {
    cells[i] = new Array(WIDTH);
}

for (i = 0; i < HEIGHT; i++) {
    for (j = 0; j < WIDTH; j++) {
        cells[i][j] = Cell(randRGB(), randRGB(), randRGB(), i, j);
    }
}

drawCells(cells);

var id = setInterval(frame, 10);

function frame() {
    ageCells(cells);
}
