const Area = document.getElementById('gameArea');


// Easy
// Medium
// Hard
var Size = [45, 30]
var width = Size[0]
var height = Size[1]
CreateArea()

function CreateArea() {


    for (i = 0; i < height; i++) {
        var row = document.createElement('DIV')
        row.setAttribute('class', 'row')
        row.style.height = 100 / height + '%'
        row.style.width = '100%'
        for (j = 0; j < width; j++) {
            var col = document.createElement('DIV')
            col.setAttribute('class', 'col box ' + i + ' ' + j )
            col.style.width = 100 / width + '%'
            col.style.height = '100%'
            row.appendChild(col)
        }
        Area.appendChild(row)
    }
}
CreatePath()

function CreatePath() {
    var path = document.getElementsByClassName('box');
    y = 0;
    path[y].classList = path[0].className + ' path';

    n = -width;
    e = 1;
    s = width;
    w = -1;
    var next = [n, e, s, w]

 
    console.log(next[x])





}
