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
            col.setAttribute('total', j + ' ' + i)
            col.setAttribute('id', j + '_' + i)
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
    exits = [AllBoxes[0]]
    minus = 0
    for (k = 0; k < 200; k++) {
        next = [];
        
        n = y - 1;
        s = y + 1;
        e = x + 1;
        w = x - 1;

        var North = document.getElementById(x + '_' + n)

        var East = document.getElementById(e + '_' + y)

        var Souht = document.getElementById(x + '_' + s)

        var West = document.getElementById(w + '_' + y)

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
        console.log(next)
        if (next.length == 0) {
            
            console.log(exits[k-minus])

            exits[exits.length-1].className = 'box col dead'
            
            exits.splice(exits.length-1,1)
            console.log(exits)
            console.log(exits[exits.length-1 ])
            console.log(exits[exits.length-1].classList.remove())
            cl = exits[exits.length-1 ].className.split(' ');
            exits[exits.length-1 ].className = cl[0] + ' ' + cl[1] + ' ' + cl[2] + ' ' + cl[3];
            console.log(exits[exits.length-1 ].getAttribute('total'))
            next = exits[exits.length-1 ].getAttribute('total').split(' ')
            previous = exits[exits.length-1]
            // minus = minus + 2;
            
        }else{
            r = Math.floor(Math.random() * next.length)
            next[r].className = 'box col path'
    
            a = next[r].getAttribute('total').split(' ')
            b = previous.getAttribute('total').split(' ')
    
            b[0] = Number(b[0])
            b[1] = Number(b[1])
            a[0] = Number(a[0])
            a[1] = Number(a[1])
            console.log(a)
            console.log(b)
            if (a[0] == b[0] && a[1] >= b[1]) {
                console.log(next[r].className = next[r].className + ' top ')
                console.log(previous.className = previous.className + ' bottom ')
            }
            if (a[0] == b[0] && a[1] <= b[1]) {
                console.log(previous.className = previous.className + ' top ')
                console.log(next[r].className = next[r].className + ' bottom ')
            }
            if (a[0] >= b[0] && a[1] == b[1]) {
                console.log(next[r].className = next[r].className + ' left ')
                console.log(previous.className = previous.className + ' right ')
            }
            if (a[0] <= b[0] && a[1] == b[1]) {
                console.log(previous.className = previous.className + ' left ')
                console.log(next[r].className = next[r].className + ' right ')
            }
            exits.push(next[r])
            console.log(exits)
    
    
            
            previous = next[r]
    
            next = next[r].getAttribute('total').split(' ')

        }
        
        
        console.log(k)
        x = Number(next[0])
        y = Number(next[1])
        if(k>30){
            if(x==width-1 && y == height-1){
                console.log('finish')
                break;
            }
        }

        console.log(x+' '+y)

    }
}




