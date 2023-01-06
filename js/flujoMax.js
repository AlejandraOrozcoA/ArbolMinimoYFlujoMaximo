// LLenar Campos
function llenarCampos() {
    let select = document.getElementsByName("nInicio")[0];
    for(let i=0;  i < nodos.length; i++){
        let option = document.createElement("option");
        option.text = nodos[i].text;
        select.add(option);
    }
    select = document.getElementsByName("nDestino")[0];
    for(let i=0;  i < nodos.length; i++){
        let option = document.createElement("option");
        option.text = nodos[i].text;
        select.add(option);
    }
}

//Limpiar campos
function limpiarCampos() {
    let select = document.getElementsByName("nInicio")[0];
    for (let i = select.options.length; i >= 1; i--) {
        select.options.remove(i);
    }   
    select = document.getElementsByName("nDestino")[0];
    for (let i = select.options.length; i >= 1; i--) {
        select.options.remove(i);
    }   
}

let nodoI;
let nodoD;
let nodoAnterior = null;
let nodoActual;
let conec = [];
let recorrido = [];
let conecRecorridos = [];
let nodosRecorridos = [];
let flujos = [];
let flujoTotal = 0;
let iteracion = 0;
let nodosSatisfechos = [];
let flag = true;
let contador;

//Obtiene los nodos inicial y final
function  obtenerNodos(){
    let select = document.getElementById('nInicio');
    nodoI= select.options[select.selectedIndex].value;
    select = document.getElementById('nDestino');
    nodoD = select.options[select.selectedIndex].value;
    contador = nodos.length;
    for (let i = 0; i < nodos.length; i++) {
        if(nodos[i].text == nodoI){
            nodoActual = nodos[i];
            nodoI = nodos[i];
            recorrido.push(nodoActual);
        }
        if (nodos[i].text == nodoD) {
            nodoD = nodos[i];
        }
    }
    flujoMaximo();
}

function reiniciar(){
    recorrido = [];
    conecRecorridos = [];
    nodosRecorridos = [];
    flujos = [];
    conec = [];
    nodoAnterior = null;
    nodoActual = nodoI;
    recorrido.push(nodoActual);
}

//Obtiene los conectores del nodo actual 
function getConec(){
    for (let i = 0; i < conectores.length; i++) {
        if(conectores[i].nodo1 == nodoActual ){
            if (esSatisfecho(conectores[i].nodo2) == false && estaRecorrido(conectores[i].nodo2) == false) {
                if(conectores[i].nodo2 != nodoAnterior){
                    if (parseInt(conectores[i].text) != 0) {
                        conec.push(conectores[i]);
                    }
                }
            }
        }else if( conectores[i].nodo2 == nodoActual){
            if (esSatisfecho(conectores[i].nodo1) == false && estaRecorrido(conectores[i].nodo1) == false) {
                if(conectores[i].nodo1 != nodoAnterior){
                    if (parseInt(conectores[i].text) != 0) {
                        conec.push(conectores[i]);
                    }
                }
            }
        }
    }
    if (conec.length==0) {
        nodosSatisfechos.push(nodoActual);
    }
}

//Encuentra el nodo con mayor capacidad conectado al nodo actual 
function nodoSiguiente(){
    if (conec.length>0) {
        let mayor = parseInt(conec[0].text);
        let index = 0;
        if (conec.length>1) {
            for (let i = 1; i < conec.length; i++) {
                if (parseInt(conec[i].text)>mayor) {
                    mayor = parseInt(conec[i].text); 
                    index = i;
                }  
            }
            conecRecorridos.push(conec[index]);
            flujos.push(parseInt(conec[index].text));
            nodoAnterior = nodoActual;
            if (conec[index].nodo1 != nodoActual) {
                nodoActual = conec[index].nodo1;
            } else {
                nodoActual = conec[index].nodo2;
            }
            recorrido.push(nodoActual);
            conec = [];
            return true;
        }else if(conec.length == 1){
            conecRecorridos.push(conec[0]);
            flujos.push(parseInt(conec[0].text));
            nodoAnterior = nodoActual;
            if (conec[0].nodo1 != nodoActual) {
                nodoActual = conec[0].nodo1;
            } else {
                nodoActual = conec[0].nodo2;
            }
            recorrido.push(nodoActual);
            conec = [];
            return true;
        }
    }else if(nodoActual != nodoI){
        reiniciar();
        getConec();
        nodoSiguiente();
        contador--;
        if (contador == 0) {
            return false;
        }
    }else{
        return false;
    }
}

function imprimirRecorrido(){
    let cadena = "";
    for (let i = 0 ; i < recorrido.length; i++) {
        cadena += recorrido[i].text+",";
    }
    return cadena;
}

function menorCapacidad(){
    let menor = flujos[0];
    for (let i = 1; i < flujos.length; i++) {
        if(flujos[i]< menor){
            menor = flujos[i];
        }
    }
    return menor;
}

//Actualizar Tabla 
function actualizarTabla(){
    let tbody = document.getElementById('tabla-body');
    let row = document.createElement('tr');
    let cellIteracion = document.createElement('td');
    let cellRecorrido = document.createElement('td');
    let cellCapacidad = document.createElement('td');
    let cellFlujo = document.createElement('td');
    cellIteracion.innerHTML = iteracion;
    cellRecorrido.innerHTML = imprimirRecorrido();
    cellCapacidad.innerHTML = menorCapacidad();
    flujoTotal += menorCapacidad();
    cellFlujo.innerHTML = flujoTotal;
    row.appendChild(cellIteracion);
    row.appendChild(cellRecorrido);
    row.appendChild(cellCapacidad);
    row.appendChild(cellFlujo);
    tbody.appendChild(row);
    
}

function flujoMaximo(){
    while (flag) {
        while(nodoActual != nodoD){
            getConec();
            flag = nodoSiguiente();
            if (flag == false) {
                break;
            }
        }
        iteracion++;
        if(nodoActual == nodoD){
            actualizarTabla();
            actualizarConectores();
            reiniciar();
        }
        
    }
}

function actualizarConectores() {
    for (let i = 0; i < conecRecorridos.length; i++) {
        for (let j = 0; j < conectores.length; j++) {
            if (conectores[j] == conecRecorridos[i]) {
                let nuevo = parseInt(conectores[j].text)-menorCapacidad();
                conectores[j].text = nuevo.toString();
                reDraw(); 
            }   
        }
    }

}

function esSatisfecho(n){
    for (let i = 0; i < nodosSatisfechos.length; i++) {
        if(n==nodosSatisfechos[i]){
            return true;
        }
    }
    return false;
}

function estaRecorrido(n){
    for (let i = 0; i < recorrido.length; i++) {
            if (recorrido[i] == n) {
                return true;
            }
    }
    return false;
}