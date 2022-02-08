const Area = document.getElementById('gameArea');


// Easy
// Medium
// Hard
var Size = [15, 10]
var width = Size[0]
var height = Size[1]
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

            col.setAttribute('x', j)
            col.setAttribute('y', i)
            col.setAttribute('total', j + ' ' + i)
            col.setAttribute('class', 'col box ')
            col.innerText = j + ' ' + i;

            col.style.width = 100 / width + '%'
            col.style.height = '100%'
            col.style.border = '1px solid black'
            row.appendChild(col)

        }
        Area.appendChild(row)

    }
}
CreatePath()
function CreatePath() {
    var AllBoxes = document.getElementsByClassName('box')

    y = 0;
    x = 0;
    previous = AllBoxes[0]
    AllBoxes[0].className = 'box col path'

    for (k = 0; k < 30; k++) {
        next = [];

        n = y - 1;
        s = y + 1;
        e = x + 1;
        w = x - 1;
        console.log(x + ' ' + y)
        console.log(n)
        console.log(e)
        console.log(s)
        console.log(w)

        for (i = 0; i < width * height; i++) {
            if (AllBoxes[i].getAttribute('total') == x + ' ' + n) {
                if (AllBoxes[i].classList[2]  == undefined) {
                    north = AllBoxes[i]
                    next.push(north)
                    console.log('n')
                }

            }
            if (AllBoxes[i].getAttribute('total') == e + ' ' + y) {
                if (AllBoxes[i].classList[2]  == undefined) {
                    east = AllBoxes[i]
                    next.push(east)
                    console.log('e')
                }

            }
            if (AllBoxes[i].getAttribute('total') == x + ' ' + s) {
                if (AllBoxes[i].classList[2]  == undefined) {
                    souht = AllBoxes[i]
                    next.push(souht)
                    console.log('s')
                }
            }
            if (AllBoxes[i].getAttribute('total') == w + ' ' + y) {
                if (AllBoxes[i].classList[2] == undefined) {
                    west = AllBoxes[i]
                    next.push(west)
                    console.log('w')
                
                }
            }
            
        }
        if (next.length < 2) {
            previous
        }
        i = 0
        console.log(next)
        r = Math.floor(Math.random() * next.length)
        next[r].className = 'box col path'

        a = next[r].getAttribute('total').split(' ')
        b = previous.getAttribute('total').split(' ')

        console.log(a)
        console.log(b)
        if (a[0] == b[0] && a[1] > b[1]) {
            console.log(next[r].className = next[r].className + ' top ')
            console.log(previous.className =previous.className + ' bottom ')
        }
        if (a[0] == b[0] && a[1] < b[1]) {
            console.log(previous.className =previous.className + ' top ')
            console.log(next[r].className = next[r].className+ ' bottom ')
        }
        if (a[0] > b[0] && a[1] == b[1]) {
            console.log(next[r].className = next[r].className+ ' left ')
            console.log(previous.className =previous.className + ' right ')

        }
        if (a[0] < b[0] && a[1] == b[1]) {
            console.log(previous.className =previous.className + ' left ')
            console.log(next[r].className = next[r].className+ ' right ')

        }
        console.log(previous)
        console.log(next[r])
        previous = next[r]


        next = next[r].getAttribute('total').split(' ')
        console.log(next)
        x = Number(next[0])
        y = Number(next[1])

    }
}



