//Arreglo de Nodos y Conectores 
let nodos = [];
let conectores = [];
let startIndex;
let endIndex;

//Recupera información del  canvas 
let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * (2 / 3);
canvas.height = window.innerHeight;
let dragging;
let startX;
let startY;
let x_offset = canvas.offsetLeft;
let y_offset = canvas.offsetTop;
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmousemove = mouseMove;

//Texto para los nodos 
let txt = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"
];
let countTXT=0;

//Definición de los nodos 
function Nodo(x, y) {
    this.x = x;
    this.y = y;
    this.rx = 25;
    this.text = "";
    this.bg_color = "#FFFFFF";
    this.text_color = "black";
    this.stroke_color = "black";
    this.nodos_adj = [];
    this.dragging = false;
    this.selected = false;
}

//Crea y dibuja el nodo
function CrearNodo(e){
        let x_cord = e.clientX - x_offset;
        let y_cord = e.clientY - y_offset;
        canvas.onclick = null;
        let nod = new Nodo(x_cord,y_cord);
        nod.text=txt[countTXT];
        countTXT++;
        nodos.push(nod)
        ctx.beginPath();
        ctx.arc(nod.x, nod.y, 30, 0, 2 * Math.PI);
        ctx.fillStyle = nod.bg_color;
        ctx.fill();
        ctx.fillStyle = nod.text_color;
        ctx.font = "12px Montserrat";
        ctx.fillText(nod.text, nod.x - nod.rx / 4, nod.y);
        ctx.strokeStyle = nod.stroke_color;
        ctx.lineWidth = 1;
        ctx.stroke();
}

//Dibujar Nodo 
function DibujarNodo(nod){
    ctx.beginPath();
    ctx.arc(nod.x, nod.y, 30, 0, 2 * Math.PI);
    ctx.fillStyle = nod.bg_color;
    ctx.fill();
    ctx.fillStyle = nod.text_color;
    ctx.font = "12px Montserrat";
    ctx.fillText(nod.text, nod.x - nod.rx / 4, nod.y);
    if (nod.selected) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;
    } else {
        ctx.strokeStyle = nod.stroke_color;
        ctx.lineWidth = 1;
    }
    ctx.stroke();
}

//Para arrastrar la figura 
//Calcula que nodo esta tocando el mouse
function mouseInShape(shape, mx, my) {
    if (shape instanceof Nodo) {
        let x = Math.pow(mx - shape.x, 2) / Math.pow(shape.rx, 2);
        let y = Math.pow(my - shape.y, 2) / Math.pow(shape.rx, 2);
        return x + y <= 1;
    }
}
//Agarra la Figura
function mouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    let mouseX = e.clientX - x_offset;
    let mouseY = e.clientY - y_offset;
    dragging = false;
    for (let i = 0; i < nodos.length; i++) {
        if (mouseInShape(nodos[i], mouseX, mouseY)) {
            document.getElementById("main-canvas").style.cursor = "grabbing";
            dragging = true;
            nodos[i].dragging = true;
        }
    }
    reDraw();
    startX = mouseX;
    startY = mouseY;
}
//Suelta la figura
function mouseUp(e) {
    e.preventDefault();
    e.stopPropagation();
    dragging = false;
    for (let i = 0; i < nodos.length; i++) {
        document.getElementById("main-canvas").style.cursor = "-webkit-grab";
        nodos[i].dragging = false;
    }
}
//Cuando el mouse se mueve con la figura 
function mouseMove(e) {
    let mouseX = e.clientX - x_offset;
    let mouseY = e.clientY - y_offset;
    for (let i = 0; i < nodos.length; i++) {
        if (mouseInShape(nodos[i], mouseX, mouseY)) {
            document.getElementById("main-canvas").style.cursor = "-webkit-grab";
        } else {
            document.getElementById("main-canvas").style.cursor = "auto";
        }
    }
    if (dragging) {
        document.getElementById("main-canvas").style.cursor = "grabbing";
        e.preventDefault();
        e.stopPropagation();
        let mx = e.clientX - x_offset;
        let my = e.clientY - y_offset;
        let dx = mx - startX;
        let dy = my - startY;
        for (let i = 0; i < nodos.length; i++) {
            if (nodos[i].dragging) {
                nodos[i].x += dx;
                nodos[i].y += dy;
            }
        }
        reDraw();
        startX = mx;
        startY = my;
    }
}

// Redibujar 
function reDraw() {
    clearCanvas();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    for (let i = 0; i < conectores.length; i++) {
        DibujarConector(conectores[i]);
    }
    for (let i = 0; i < nodos.length; i++) {
        DibujarNodo(nodos[i]);
    }
    
}
//Limpia el canvas 
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//Limpia la pantalla
function limpiarPantalla() {
    clearCanvas();
    nodos = [];
    conectores=[];
    countTXT=0;
    if(document.title == "Arbol"){
        removElementos();
    }
}


//Definición de los conectores
function Conector(nodo1, nodo2) {
    this.nodo1 = nodo1;
    this.nodo2 = nodo2;
    this.text = "0";
}
//Regresa el nodo seleccionado 
function getNodo(e) {
    let nodoSeleccionado;
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    for (let i = 0; i < nodos.length; i++) {
        if (mouseInShape(nodos[i], x_cord, y_cord)) {
            nodoSeleccionado = nodos [i];
        }
    }
    return nodoSeleccionado;
}
//Limpia la selección de nodos
function cleanSeleccion() {
    for (let i = 0; i < nodos.length; i++) {
        if (nodos[i].selected) {
            nodos[i].selected = false;
        }
    }
    reDraw();
}

let startShape = null;
let endShape = null;

function startLink(e) {
    startShape = getNodo(e);
    if (startShape) {
        canvas.onclick = endLink;
        startShape.selected = true;
        reDraw();
    } else {
        canvas.onclick = null;
    }
}

function endLink(e) {
    endShape = getNodo(e);
    if (endShape) {
        endShape.selected = true;
        let valor = prompt("Ponga un valor a este conector:", " ");
        let connection = new Conector(startShape, endShape);
        if(valor!=null){
            connection.text=valor;
        }else{
            return;
        }
        startShape.nodos_adj.push(endShape);
        endShape.nodos_adj.push(startShape);
        conectores.push(connection);
        reDraw();
    }
    cleanSeleccion();
    canvas.onclick = null;
}

function DibujarConector(con){
    ctx.beginPath();
    ctx.moveTo(con.nodo1.x, con.nodo1.y);
    ctx.lineTo(con.nodo2.x, con.nodo2.y);
    ctx.font = "16px Montserrat";
    ctx.fillText(con.text, (con.nodo2.x+con.nodo1.x)/2 , (con.nodo2.y+con.nodo1.y)/2);
    ctx.stroke();
}

//Borrar un Nodo
function eraseShape(e) {
    canvas.onclick = null;
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    let delShape = getNodo(e);
    if (delShape) {
        nodos.splice(nodos.indexOf(delShape), 1);
        //Borra el nodo en el arreglo de nodos adjuntos en todas las figuras 
        for (let i = 0; i < nodos.length; i++) {
            for (let j = 0; j < nodos[i].nodos_adj.length; j++) {
                if (Object.is(nodos[i].nodos_adj[j], delShape)) {
                    nodos[i].nodos_adj.splice(j, 1);
                }
            }
        }
        //Optiene los index de todos los conectores de esa figura 
        let delConn = [];
        for (let i = 0; i < conectores.length; i++) {
            if (Object.is(conectores[i].nodo1, delShape)) {
                delConn.push(conectores[i]);
            }
            if (Object.is(conectores[i].nodo2, delShape)) {
                delConn.push(conectores[i]);
            }
        }
        //Borra todos los conectores de esa figura 
        while (delConn.length > 0) {
            for (let i = 0; i < conectores.length; i++) {
                conectores.splice(conectores.indexOf(delConn.pop()), 1);
            }
        }
        reDraw();
    }
    if(document.title == "Arbol"){
        removElementos();
    }
}