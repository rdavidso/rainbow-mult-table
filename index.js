var ansi = require('ansi-256-colors')
  , program = require('commander')
  ;

//              0  1  2  3  4  5   6   7  8   9 10  11
//var colors = [5, 4, 7, 8, 3, 9, 10, 11, 2, 12, 6, 13];
var colors = [  5, 4, 7, 8, 3, 9, 10, 11, 2, 12, 6, 13];

var order = [0, 5, 7, 6, 8, 10, 9, 1, 0, 11];


function mult(size, x, y, variablePadding, block, disableAxis) {
    var sx = x + size[0];
    var sy = y + size[1];
    var pad = block ? ("" + sx).length : ("" + sx * sy).length;
    pad = disableAxis ? 0 : pad;
    var colPad = disableAxis ? 0 : ("" + sx).length - 1;
    var len = ("" + sy).length;
    for(var row = x; row <= sx; row++) {
        var line = "";
        for(var col = y; col <= sy; col++) {
            pad = variablePadding ? ("" + col * sx).length : pad;
            if(row !== x && col === y) {
                line += padding(colPad, row, disableAxis);
            } else if (col !== y && row === x) {
                line += padding(pad, col, disableAxis);
            } else if (row === x && col === y) {
                line += padding(colPad, ' ');
            } else {
                line += padding(pad, row * col, block);
            }
        }
        line += ansi.reset;
        console.log(line);
    }
}

function padding(pad, num, block) {
    var numStr = "" + num;
    var code = ansi.fg.codes[colors[order[parseInt(numStr[0])]]];
    numStr = block ? "\u25ae" : numStr;
    var len = numStr.length;
    var colorNumStr = code ? code + numStr : numStr;
    for(var i = 0; i <= pad - len; i++) {
        colorNumStr = " " + colorNumStr;
    }
    return colorNumStr;
}

function parseArr(str) {
    var sp = str.split(',');
    if(sp.length > 1) {
        return [parseInt(sp[0]), parseInt(sp[1])];
    } else {
        return [parseInt(sp[0]), parseInt(sp[0])];
    }
}

program
.version('1.0.0')
.option('-s, --size [n]', 'Print a multiplication table [n] * [n]', parseArr, [10, 10])
.option('-r, --row-offset [offset]', 'Start your rows at 0 plus [offset]', parseInt, 0)
.option('-c, --col-offset [offset]', 'Start your cols at 0 plus [offset]', parseInt, 0)
.option('-p, --variable-padding', 'Enable minimal variable width padding.')
.option('-b, --block', 'Render a colored block character instead of numbers')
.option('-x, --disable-axis', 'Don\'t show the x,y axis')
.parse(process.argv);

mult(program.size, program.rowOffset, program.colOffset, program.variablePadding, program.block, program.disableAxis);
