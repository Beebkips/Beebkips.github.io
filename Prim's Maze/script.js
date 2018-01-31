// Set up!
var a_canvas = document.getElementById("a");
var context = a_canvas.getContext("2d");
var H = 125;
var W = 125;
var fH = 500;
var fW = 500;
var cH = fH/H;
var cW = fW/W;

var vs = new Array()

function mod(n, m) {
        return ((n % m) + m) % m;
}

function compare(n, m) {
    if (n[0] > m[0]) {
        return 1;
    } else if (n[0] < m[0]) {
        return -1;
    } else if (n[0] === m[0] && n[1] > m[1]) {
        return 1;
    } else if (n[0] === m[0] && n[1] < m[1]) {
        return -1;
    } else {
        return 0;
    }
};

function sortedInsert(t, array) {
    // console.log("here")
    return sortedInsertR(t, array, 0, array.length);
};

function sortedInsertR(t, array, l, h) {
    m = Math.floor((h + l) / 2)
    if (h < l) {
        array.splice(l, 0, t);
        // return -1
    } else if (array.length === m) {
        array.push(t);
    } else if (compare(t, array[m]) === 0) {
        return -1;
    } else if (compare(t, array[m]) === -1) {
        return sortedInsertR(t, array, l, m - 1);
    } else {
        return sortedInsertR(t, array, m + 1, h);
    }
};

var addWalls = function(cell, cells, walls) {
    // console.log('here')
    if (cell[0] - 1 > 0 && cells[cell[0] - 1][cell[1]] === 0 && sortedInsert([cell[0] - 1, cell[1]], vs) !== -1) {
        walls.push([cell[0] - 1, cell[1]]);
        // console.log('here')
    }
    if (cell[0] + 1 < H && cells[cell[0] + 1][cell[1]] === 0 && sortedInsert([cell[0] + 1, cell[1]], vs) !== -1) {
        walls.push([cell[0] + 1, cell[1]]);
        // console.log('here')
    }
    if (cell[1] - 1 > 0 && cells[cell[0]][cell[1] - 1] === 0 && sortedInsert([cell[0], cell[1] - 1], vs) !== -1) {
        walls.push([cell[0], cell[1] - 1]);
        // console.log('here')
    }
    if (cell[1] + 1 < W && cells[cell[0]][cell[1] + 1] === 0 && sortedInsert([cell[0], cell[1] + 1], vs) !== -1) {
        walls.push([cell[0], cell[1] + 1]);
        // console.log('here')
    }
};

var checkWall = function (wall, cells, walls) {
    // console.log(wall)
    if (!((wall[1] - 1) < 1 || (wall[1] + 1) > W - 1)) {
        l = cells[wall[0]][wall[1] - 1];
        r = cells[wall[0]][wall[1] + 1];
        if ((l === 1 || r === 1) && l !== r) {
            if (l === 1) {
                cells[wall[0]][wall[1] + 1] = 1
                cells[wall[0]][wall[1]] = 1
                addWalls([wall[0], wall[1] + 1], cells, walls)
                context.fillRect(wall[0] * cW, (wall[1] + 1) * cH, cW, cH);
                context.fillRect(wall[0] * cW, wall[1] * cH, cW, cH);
            } else {
                cells[wall[0]][wall[1] - 1] = 1
                cells[wall[0]][wall[1]] = 1
                addWalls([wall[0], wall[1] - 1], cells, walls)
                context.fillRect(wall[0] * cW, (wall[1] - 1) * cH, cW, cH);
                context.fillRect(wall[0] * cW, wall[1] * cH, cW, cH);
            }
        }
    }
    if (!(wall[0] - 1 < 1 || (wall[0] + 1) > H - 1)) {
        u = cells[wall[0] + 1][wall[1]];
        d = cells[wall[0] - 1][wall[1]];
        if ((u === 1 || d === 1) && u !== d) {
            if (d === 1) {
                cells[wall[0] + 1][wall[1]] = 1
                cells[wall[0]][wall[1]] = 1
                addWalls([wall[0] + 1, wall[1]], cells, walls)
                context.fillRect((wall[0] + 1) * cW, wall[1] * cH, cW, cH);
                context.fillRect(wall[0] * cW, wall[1] * cH, cW, cH);
            } else {
                cells[wall[0] - 1][wall[1]] = 1
                cells[wall[0]][wall[1]] = 1
                addWalls([wall[0] - 1, wall[1]], cells, walls)
                context.fillRect((wall[0] - 1) * cW, wall[1] * cH, cW, cH);
                context.fillRect(wall[0] * cW, wall[1] * cH, cW, cH);
            }
        }
    }
};

var cells = new Array(H);
for (i = 0; i < H; i++) {
    cells[i] = new Array(W);
}
for (i = 0; i < H; i++) {
    for (j = 0; j < W; j++) {
        cells[i][j] = 0;
    }
}

cells[1][1] = 1;
context.fillRect(cW, cH, cW, cH);

var walls = new Array();
// walls.push([1,1])

addWalls([1,1], cells, walls);
console.log(walls);

var id = setInterval(frame, 1);

// for (i = 0 ; i < 100; i++) {
//     frame();
// }

function frame() {
    if (walls.length > 0) {
        // console.log(walls.length)
        choice = Math.floor(Math.random() * walls.length);
        wall = walls[choice];
        // console.log(choice)
        // console.log(walls[0])
        // console.log(wall)
        checkWall(wall, cells, walls)
        // console.log("Current walls: " + walls);
        // console.log("Visited set: " + vs)
        walls.splice(choice, 1);
        // console.log("After splice: " + walls);
        // console.log (walls)
    }
}