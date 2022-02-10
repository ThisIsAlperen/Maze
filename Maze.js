const Area = document.getElementById('gameArea');

// size of the game area
var Size = [60, 40]
var width = Size[0]
var height = Size[1]

// check if its on the main path. At Detours it turns to false
var check = true

// the main path but has some detours because of the deadend
var way = []

// cleared path from detours
var way2 = []


CreateArea()
// Creating the area
function CreateArea() {
    for (i = 0; i < height; i++) {

        // Rows of the area
        var row = document.createElement('DIV')
        row.setAttribute('class', 'row')
        row.style.height = 100 / height + '%'
        row.style.width = '100%'


        for (j = 0; j < width; j++) {

            // All boxes of the area
            var col = document.createElement('DIV')

            //every box has a certain coordinate
            col.setAttribute('total', j + ' ' + i) // coordinate of the box as an attribute
            col.setAttribute('id', j + '_' + i) // coordinate of the box as ID
            col.setAttribute('class', 'col box ') // col class for bootstrap columns and box class for all boxes


            col.style.width = 100 / width + '%'
            col.style.height = '100%'
            col.style.border = '1px solid black'


            row.appendChild(col) // add columns to rows

        }

        Area.appendChild(row) // add rows to the area

    }
}
// Main path
CreatePath()
function CreatePath() {
    var AllBoxes = document.getElementsByClassName('box')

    y = 0;// coordinates of the first box
    x = 0;

    AllBoxes[0].className = 'box col path'
    previous = AllBoxes[0]

    exits = [AllBoxes[0]]
    way = [AllBoxes[0]]

    for (k = 0; k < 2000; k++) { // function to generate a path. breaks when reach left bottom corner

        Choices(x, y) // by using x,y of the box, checks the next choices

        if (next.length == 0) { // if there is no next choices;
            exits[exits.length - 1].classList.add('dead') // add dead class to that box 
            exits[exits.length - 1].setAttribute('dead', ' ') // add that attribute to that box
            exits[exits.length - 1].classList.remove('path') // remove path class from taht box
            exits.splice(exits.length - 1, 1) // delete that box from exit array

            next = exits[exits.length - 1].getAttribute('total').split(' ') // gets the path before
            previous = exits[exits.length - 1] // gets the path before and run the 'while' again from the path before.

        } else {

            r = Math.floor(Math.random() * next.length) // gets a random number within the length of the next options (0,1,2,3 max)
            next[r].className = 'box col path' // adds path class name
            way.push(next[r]) // add this box to way array

            Next(next[r]) // function to delete the wall between previous and next boxes
            //returns 'next'

        }

        x = Number(next[0]) // after choice, changes x and y and make chosen box the current box
        y = Number(next[1])

        if (x == width - 1 && y == height - 1) { // 

            console.log('Finish')
            break;
        }
    }

}

function Choices(x, y) {
    //function to check if the surrounding box are avalible

    next = [];

    // get the surrounding boxes by adding or substracting 1 from x and y coordinate
    n = y - 1;
    s = y + 1;
    e = x + 1;
    w = x - 1;

    // gets the boxes by using the coordinates 
    var North = document.getElementById(x + '_' + n)

    var East = document.getElementById(e + '_' + y)

    var Souht = document.getElementById(x + '_' + s)

    var West = document.getElementById(w + '_' + y)

    if (check) { // if main path hits to the wall, it will go to the exit

        if (North == undefined) { // no boxes at norht (top), wall 
            West = null; // goes to the right
        }
        else if (Souht == undefined) {
            West = null;

        }
        else if (East == undefined) {
            North = null;

        }
        else if (West == undefined) {
            North = null

        }

    }

    // Check if the box next is avalible

    // if its not already path or its not dead adds to the next array
    if (North != null) {
        if (North.classList[2] == undefined && North.getAttribute('dead') == undefined) {
            next.push(North) // adding to the next array
        }
    }
    if (East != null) {
        if (East.classList[2] == undefined && East.getAttribute('dead') == undefined) {
            next.push(East)

        }
    }

    if (Souht != null) {
        if (Souht.classList[2] == undefined && Souht.getAttribute('dead') == undefined) {
            next.push(Souht)
        }
    }

    if (West != null) {
        if (West.classList[2] == undefined && West.getAttribute('dead') == undefined) {
            next.push(West)
        }
    }
    return next;
}


Way() // after getting the whole path as way array, it should be cleaned from detours.
// deadends causes detours 
function Way() {
    var k = 0;
    for (i = 0; i < way.length; i++) {
        // if there is no path class (removed at exit / line 75) do not add to the way2
        if (way[i].classList[2] == 'path') {
            way2[k] = way[i]
            k = k + 1
        }
    }

}


function Next(x) {
    //gets the chosen box as next[r] (line 87)
    next[r] = x
    // gets the coordinates of the next and previous boxes
    a = next[r].getAttribute('total').split(' ')
    b = previous.getAttribute('total').split(' ')
    // gets the coordinates as numbers
    b[0] = Number(b[0])
    b[1] = Number(b[1])
    a[0] = Number(a[0])
    a[1] = Number(a[1])

    // decide which direction the next box at
    if (a[0] == b[0] && a[1] > b[1]) {
        next[r].className = next[r].className + ' top '
        previous.className = previous.className + ' bottom '
    }
    if (a[0] == b[0] && a[1] < b[1]) {
        previous.className = previous.className + ' top '
        next[r].className = next[r].className + ' bottom '
    }
    if (a[0] > b[0] && a[1] == b[1]) {
        next[r].className = next[r].className + ' left '
        previous.className = previous.className + ' right '
    }
    if (a[0] < b[0] && a[1] == b[1]) {
        previous.className = previous.className + ' left '
        next[r].className = next[r].className + ' right '
    }

    exits.push(next[r])// add this box to the exits box
    previous = next[r]

    next = next[r].getAttribute('total').split(' ') // gets the coordinate values of the box
    return next;
}
// ===== Creating detour ========================================================

// first gets the path boxes and check if they still have an avalible next box
CheckPath()
function CheckPath() {
    check = false // no need to reach end (line 119)
    pathBoxes = document.getElementsByClassName('path')

    for (i = 0; i < pathBoxes.length; i++) {  // gets the coordinate of every box of path 
        x = pathBoxes[i].getAttribute('total').split(' ')[0]
        y = pathBoxes[i].getAttribute('total').split(' ')[1]
        Choices(x, y) // check if they have a next box

        if (next.length != 0) { // if they have next

            CreateDetour(x, y) // create detour from that next

        }
        else {

        }
    }
}
function CreateDetour(x, y) {
    // gets the box from CheckPath function and use as a first part of another maze
    x = Number(x)
    y = Number(y)
    first = [Number(x), Number(y)]
    previous = document.getElementById(x + '_' + y)

    for (k = 0; k < 200; k++) { // there is no certain and. it tries long enough
        Choices(x, y)

        if (next.length == 0) {

            // do not add path 

            exits[exits.length - 1].classList.add('dead')
            exits[exits.length - 1].setAttribute('dead', ' ')
            exits.splice(exits.length - 1, 1)

            if (exits[exits.length - 1] == null) {
                console.log('null')
                break;
            }

            next = exits[exits.length - 1].getAttribute('total').split(' ')
            previous = exits[exits.length - 1]


        } else {
            r = Math.floor(Math.random() * next.length)
            next[r].classList.add('dead')
            Next(next[r])

        }

        x = Number(next[0])
        y = Number(next[1])

        if (x == first[0] && x == first[1]) { // breaks if there is no next left
            // controls every box and by coming back when reach to the start point it breaks

            break;
        }
    }

}
var j = 0;

document.getElementById('Show').onclick = function Show() { // click function to show the path
    // create circles
    circle = document.createElement('DIV')
    circle.setAttribute('class', 'circle')

    way2[j].appendChild(circle) // add the circles to the way array since it is the right path

    if (way2[j].getAttribute('total') == width - 1 + ' ' + height - 1) { // if reach end, returns
        return
    }

    j = j + 1;
    setTimeout(Show, 100) // goes step by step, runs the code every 0.1 second
}
