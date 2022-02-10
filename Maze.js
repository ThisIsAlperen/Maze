const Area = document.getElementById('gameArea');


// Easy
// Medium
// Hard
var Size = [60, 40]
var width = Size[0]
var height = Size[1]
var check = true

CreateArea()

// Creating the area
function CreateArea() {
    for (i = 0; i < height; i++) {
        var row = document.createElement('DIV')
        row.setAttribute('class', 'row')
        row.style.height = 100 / height + '%'
        row.style.width = '100%'
        for (j = 0; j < width; j++) {
            var col = document.createElement('DIV')
            col.setAttribute('total', j + ' ' + i)
            col.setAttribute('id', j + '_' + i)
            col.setAttribute('class', 'col box ')
            

            col.style.width = 100 / width + '%'
            col.style.height = '100%'
            col.style.border = '1px solid black'
            row.appendChild(col)

        }
        Area.appendChild(row)

    }
}
function Choices(x, y) {
    next = [];
    n = y - 1;
    s = y + 1;
    e = x + 1;
    w = x - 1;

    var North = document.getElementById(x + '_' + n)

    var East = document.getElementById(e + '_' + y)

    var Souht = document.getElementById(x + '_' + s)

    var West = document.getElementById(w + '_' + y)

    if (check) {
        console.log('hata')
        if (North == undefined) {
            West = null;

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



    if (North != null) {
        if (North.classList[2] == undefined && North.getAttribute('dead') == undefined) {
            next.push(North)
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

CreatePath()
function CreatePath() {
    var AllBoxes = document.getElementsByClassName('box')

    y = 0;
    x = 0;
    previous = AllBoxes[0]
    AllBoxes[0].className = 'box col path'
    exits = [AllBoxes[0]]

    for (k = 0; k < 2000; k++) {
        Choices(x, y)

        

        if (next.length == 0) {
            exits[exits.length - 1].classList.add('dead')
            exits[exits.length - 1].setAttribute('dead',' ')
            exits[exits.length - 1].classList.remove('path')
            exits.splice(exits.length - 1, 1)
            next = exits[exits.length - 1].getAttribute('total').split(' ')
            previous = exits[exits.length - 1]
           
        } else {
            if(k>width/2 + height/2 && next.length>1){
                
            }
            r = Math.floor(Math.random() * next.length)
            next[r].className = 'box col path'

            Next(next[r])


        }

        x = Number(next[0])
        y = Number(next[1])

        if (x == width - 1 && y == height - 1) {
            console.log('finish')
            break;
        }
        



    }
}
//CreateOthers()
function CreateOthers() {
    console.log('=========================================================')
    check = false;
    var AllBoxes = document.getElementsByClassName('box')
    empty = []

    for (i = 0; i < width * height; i++) {
        if (AllBoxes[i].classList.length < 3) {
            empty.push(AllBoxes[i])
        }
    }

    while (empty.length > 1) {

        r = Math.floor(Math.random() * empty.length)
        total = empty[r].getAttribute('total').split(' ')
        previous = empty[r];
        x = Number(total[0])
        y = Number(total[1])
        Choices(x, y)

        if (next.length == 0) {
            empty.splice(r, 1)
            next = previous;
        }
        else {
            r = Math.floor(Math.random() * next.length)
            next[r].className = 'box col dead'
            Next(next[r])
        }
        x = Number(next[0])
        y = Number(next[1])
    }

}

function Next(x) {
    next[r] = x
    a = next[r].getAttribute('total').split(' ')
    b = previous.getAttribute('total').split(' ')

    b[0] = Number(b[0])
    b[1] = Number(b[1])
    a[0] = Number(a[0])
    a[1] = Number(a[1])
    console.log(a)
    console.log(b)
    if (a[0] == b[0] && a[1] > b[1]) {
        console.log(next[r].className = next[r].className + ' top ')
        console.log(previous.className = previous.className + ' bottom ')
    }
    if (a[0] == b[0] && a[1] < b[1]) {
        console.log(previous.className = previous.className + ' top ')
        console.log(next[r].className = next[r].className + ' bottom ')
    }
    if (a[0] > b[0] && a[1] == b[1]) {
        console.log(next[r].className = next[r].className + ' left ')
        console.log(previous.className = previous.className + ' right ')
    }
    if (a[0] < b[0] && a[1] == b[1]) {
        console.log(previous.className = previous.className + ' left ')
        console.log(next[r].className = next[r].className + ' right ')
    }
    exits.push(next[r])
    previous = next[r]

    next = next[r].getAttribute('total').split(' ')
    return next;
}
CheckPath()
function CheckPath() {
    check = false
    pathBoxes = document.getElementsByClassName('path')
    console.log(pathBoxes)
    for (i = 0; i < pathBoxes.length; i++) {
        x = pathBoxes[i].getAttribute('total').split(' ')[0]
        y = pathBoxes[i].getAttribute('total').split(' ')[1]
        Choices(x, y)
        console.log(pathBoxes)
        console.log(pathBoxes[i])
        if (next.length != 0) {

            CreateDetour(x, y)

        }
        else{

        }
    }
}
function CreateDetour(x, y) {

    console.log(x, y)
    x = Number(x)
    y = Number(y)
    first = [Number(x),Number(y)]
    previous = document.getElementById(x+'_'+y)
    exit = [document.getElementById(x+'_'+y)]
    console.log(previous)
    for (k = 0; k < 200; k++) {
        Choices(x, y)

        if (next.length == 0) {

            exits[exits.length - 1].classList.add('dead')
            exits[exits.length - 1].setAttribute('dead',' ')
            exits.splice(exits.length - 1, 1)
            next = exits[exits.length - 1].getAttribute('total').split(' ')
            previous = exits[exits.length - 1]
           

        } else {
            r = Math.floor(Math.random() * next.length)
            next[r].classList.add('dead')
            console.log(next[r])
            Next(next[r])
            


        }

        x = Number(next[0])
        y = Number(next[1])

        if (x == first[0] && x == first[1]) {
            console.log('Detour')
            break;
        }
    }
}
