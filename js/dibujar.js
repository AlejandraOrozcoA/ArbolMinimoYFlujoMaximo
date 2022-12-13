//Arreglo de Nodos y Conectores 
let nodos = [];
let conectores = [];

//Recupera información del  canvas 
let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * (2 / 3);
canvas.height = window.innerHeight;
//Coordenadas de donde hacemos click en el canvas 
let x_cord;
let y_cord;

//Definición de los nodos 
function Nodo(x, y) {
    this.x = x;
    this.y = y;
    this.rx = 25;
    this.text = "A";
    this.bg_color = "#FFFFFF";
    this.text_color = "black";
    this.stroke_color = "black";
    this.nodos_adj = [];
    this.dragging = false;
    this.selected = false;
}

//Dibuja el nodo
function DibujarNodo(e){
        x_cord = e.clientX - canvas.offsetLeft;
        y_cord = e.clientY - canvas.offsetTop;
        canvas.onclick = null;
        let nod = new Nodo(x_cord,y_cord);
        nodos.push(nod)
        ctx.beginPath();
        ctx.arc(x_cord, y_cord, 30, 0, 2 * Math.PI);
        ctx.stroke();
}