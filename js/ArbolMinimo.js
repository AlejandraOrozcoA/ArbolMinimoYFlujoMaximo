let selector = document.getElementById('metodo');

//Diferencia entre Kruskal  y Prim
function elegirMetodo() {
    let select = document.getElementsByName("n1")[0];
    for (let i = select.options.length; i >= 1; i--) {
        select.options.remove(i);
    }   
    select = document.getElementsByName("n2")[0];
    for (let i = select.options.length; i >= 1; i--) {
        select.options.remove(i);
    }   
    select = document.getElementsByName("nInicial")[0];
    for (let i = select.options.length; i >= 1; i--) {
        select.options.remove(i);
    }
    switch (selector.value) {
    case "1":
        elemKruskal();
        break;
    case "2":
        elemPrim();
        break;
    default:
        document.getElementById("div-prim").style.display = "none";
        document.getElementById("div-kruskal").style.display = "none";
        break;
    }
}

//Crea los elementos para Kruskal 
function elemKruskal(){
    document.getElementById("div-kruskal").style.display = "block";
    document.getElementById("div-prim").style.display = "none";
    let select = document.getElementsByName("nInicial")[0];
    for(let i=0;  i < nodos.length; i++){
        let option = document.createElement("option");
        option.text = nodos[i].text;
        select.add(option);
    }
}

//Crea los elementos para Prim
function elemPrim(){
    document.getElementById("div-kruskal").style.display = "none";
    document.getElementById("div-prim").style.display = "block";
    let select = document.getElementsByName("n1")[0];
    for(let i=0;  i < nodos.length; i++){
        let option = document.createElement("option");
        option.text = nodos[i].text;
        select.add(option);
    }
    select = document.getElementsByName("n2")[0];
    for(let i=0;  i < nodos.length; i++){
        let option = document.createElement("option");
        option.text = nodos[i].text;
        select.add(option);
    }
}

//Quita los elementos de los select al limpiar pantalla
function removElementos(){
    let select = document.getElementsByName("n1")[0];
    for (let i = select.options.length; i >= 1; i--) {
        select.options.remove(i);
    }   
    select = document.getElementsByName("n2")[0];
    for (let i = select.options.length; i >= 1; i--) {
        select.options.remove(i);
    }   
    select = document.getElementsByName("nInicial")[0];
    for (let i = select.options.length; i >= 1; i--) {
        select.options.remove(i);
    }    
    selector.value = "0";
    document.getElementById("div-kruskal").style.display = "none";
    document.getElementById("div-prim").style.display = "none";
}

let nodoI;
let val = true;
let conActual;
let conexionesActuales = [];
let conexionesUsadas = [];
let nodosVisitados = [];
let sumaTotal = 0;

function kruskal() {
    if (val) {
        let flag = validarKruskal();
        val = false;
        if (!flag) {
            alert("Error de Validation");
            return;
        }
    }
    for (let i = 0; i < nodos.length; i++) {
        if(nodos[i].text == nodoI || nodos[i].text == nodoI.text){
            nodoI = nodos[i];
            nodosVisitados.push(nodoI);
            pintaRojo();
        }
    }

    getConectados();
    conexionesActuales.sort((a , b)=> (a.text - b.text) * (-1));

    while (nodosVisitados.length < nodos.length) {
        if (conexionesActuales.length <= 0){
            alert("Kruskal Terminado")
            return;
        }

        conActual = conexionesActuales.pop();
        conexionesUsadas.push(conActual);

        if (conActual == undefined){
            alert("Error de Nodos");
            return;
        }
        for (let nv in nodosVisitados) {
            if (conActual.nodo1 == nv) {
                nodoI = conActual.nodo2;
            } else if(conActual.nodo2 == nv) {
                nodoI = conActual.nodo1;
            }
        }

        if (!nodosVisitados.includes(nodoI)) {
            let pos = conectores.indexOf(conActual);
            let save = conectores[pos].text;
            sumaTotal += parseInt(save);
            conectores[pos].text = "("+ save + ")";
            reDraw();
            kruskal();
        }
    }
}

let nodo1;
let nodo2;
let let_MAX = Number.MAX_VALUE;
function prim() {
    validarPrim();
    let inPrim = Array(nodos.length).fill(false);
    let cost = Array(nodos.length).fill(Array(nodos.length));

    for(let dist in conectores) {
        let i = dist.nodo1.text.charCodeAt(0) - "A".charCodeAt(0);
        let j = dist.nodo2.text.charCodeAt(0) - "A".charCodeAt(0);
        cost[i][j] = dist.length;
        cost[j][i] = dist.length;
    }
    pintaRojo(nodo1);
    pintaRojo(nodo2);

    let edge_count = 0, mincost = 0;
    while (edge_count < nodos.length - 1) {
        let min = let_MAX, a = -1, b = -1;
        for (let i = 0; i < nodos.length; i++) {
            for (let j = 0; j < nodos.length; j++) {
                if (cost[i][j] < min) {
                    if (isValidEdge(i, j, inPrim)) {
                        min = cost[i][j];
                        a = i;
                        b = j;

                    }
                }
            }
        }

        if (a != -1 && b != -1) {

            inPrim[b] = inPrim[a] = true;
            let strA = String.fromCharCode(a + 65);
            let strB = String.fromCharCode(b + 65);
            pintaRojo(strA);
            pintaRojo(strB);
            marcarConexion(strA,strB);
        }
    }
    alert("Costo minimo del MST = " + mincost);
}

function isValidEdge(u, v, inMST) {
    if (u == v)
        return false;
    if (inMST[u] == false && inMST[v] == false)
        return false;
    else if (inMST[u] == true && inMST[v] == true)
        return false;
    return true;
}

function pintaRojo(nodo) {
    for (let i = 0; i < nodos.length; i++) {
        if(nodos[i] == nodo || nodos[i].text == nodo){
            nodos[i].stroke_color = "red";
            nodos[i].bg_color = "#CC0000";
            reDraw();
        }
    }
}

function getConectados() {
    for (let i = 0; i < conectores.length ; i++) {
        if(conectores[i].nodo1 == nodoI || conectores[i].nodo2 == nodoI){
            if (!conexionesActuales.includes(conectores[i])) {
                if (!conexionesUsadas.includes(conectores[i])) {
                    conexionesActuales.push(conectores[i]);
                }
            }
        }
    }
}

function validarKruskal() {
    let select = document.getElementById('nInicial');
    nodoI = select.options[select.selectedIndex].value;
    if (nodoI === "....") {
        alert("Selecciona un nodo de inicio");
        return false;
    }else{
        let btn = document.getElementById("btnInicioKruskal");
        btn.style.display = "block";
        return true;
    }
}

function validarPrim() {
    let select1 = document.getElementById('n1');
    nodo1 = select1.options[select1.selectedIndex].value;
    let select2 = document.getElementById('n2');
    nodo2 = select2.options[select2.selectedIndex].value;
    if (nodo1 === "...." || nodo2 === "....") {
        alert("Selecciona un nodo valido");
        return false;
    }else{
        let btn = document.getElementById("btnInicioPrim");
        btn.style.display = "block";
        return true;
    }
}

function marcarConexion(a, b){
    for (let i = 0; i < conectores.length; i++) {
        if(conectores[i].nodo1.text == a && conectores[i].nodo1.text == b){
            let save = conectores[i].text;
            sumaTotal += parseInt(save);
            conectores[i].text = "("+ save + ")";
            reDraw();
        }else if(conectores[i].nodo1.text == b && conectores[i].nodo1.text == a){
            let save = conectores[i].text;
            sumaTotal += parseInt(save);
            conectores[i].text = "("+ save + ")";
            reDraw();
        }
    }
}