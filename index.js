var ansi = require('ansi-256-colors')
  , program = require('commander')
  ;

//              0  1  2  3  4  5   6   7  8   9 10  11
//var colors = [5, 4, 7, 8, 3, 9, 10, 11, 2, 12, 6, 13];
var colors = [  5, 4, 7, 8, 3, 9, 10, 11, 2, 12, 6, 13];

var order = [0, 5, 7, 6, 8, 10, 9, 1, 0, 11];


function mult(size, x, y, variablePadding) {
    var sx = x + size;
    var sy = y + size;
    var pad = ("" + sx * sy).length;
    var colPad = ("" + sx).length - 1;
    var len = ("" + sy).length;
    for(var row = x; row <= sx; row++) {
        var line = "";
        for(var col = y; col <= sy; col++) {
            pad = variablePadding ? ("" + col * sx).length : pad;
            if(row !== x && col === y) {
                line += padding(colPad, row);
            } else if (col !== y && row === x) {
                line += padding(pad, col);
            } else if (row === x && col === y) {
                line += padding(colPad, ' ');
            } else {
                line += padding(pad, row * col);
            }
        }
        line += ansi.reset;
        console.log(line);
    }
}

function padding(pad, num) {
    var numStr = "" + num;
    var len = numStr.length;
    var code = ansi.fg.codes[colors[order[parseInt(numStr[0])]]];
    var colorNumStr = code ? code + numStr : numStr;
    for(var i = 0; i <= pad - len; i++) {
        colorNumStr = " " + colorNumStr;
    }
    return colorNumStr;
}

program
.version('1.0.0')
.option('-s, --size [n]', 'Print a multiplication table [n] * [n]', parseInt, 10)
.option('-r, --row-offset [offset]', 'Start your rows at 0 plus [offset]', parseInt, 0)
.option('-c, --col-offset [offset]', 'Start your cols at 0 plus [offset]', parseInt, 0)
.option('-p, --variable-padding', 'Enable minimal variable width padding.')
.parse(process.argv);

mult(program.size, program.rowOffset, program.colOffset, program.variablePadding);
