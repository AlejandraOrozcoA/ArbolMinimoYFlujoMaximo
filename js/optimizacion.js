let demanda = []; 
let oferta = [];
let celdas = [];
let numDestinos;
let numFuentes;
let colSatisfecha = [];
let filSatisfecha = [];

function generarTabla(){
    document.getElementById("div-tabla").style.display = "block";
    numDestinos = parseInt(document.getElementById('col').value);
    numFuentes = parseInt(document.getElementById('fil').value);
    let tabla = document.getElementById('tabla');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    //Crea el encabezado de la tabla 
    let encabezado = document.createElement('tr');
    for (let j = 0; j < numDestinos+1; j++) {
        if (j==0) {
            let cell = document.createElement('th');
            encabezado.appendChild(cell);
            thead.appendChild(encabezado);
        } else {
            let cell = document.createElement('th');
            cell.innerHTML="Destino "+j;
            encabezado.appendChild(cell);
            thead.appendChild(encabezado);
        }
    }
    let cell = document.createElement('th');
    cell.innerHTML="Oferta";
    encabezado.appendChild(cell);
    thead.appendChild(encabezado);
    //Crea el cuerpo de la tabla 
    for (let i = 1; i < numFuentes+1; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < numDestinos+2; j++) {
            if (j==0) {
                let cell = document.createElement('th');
                cell.innerHTML="Fuente "+(i);
                row.appendChild(cell);
            }else{
                let cell = document.createElement('td');
                var textoCelda3 = document.createElement("input");
                textoCelda3.setAttribute("id","t".concat(i.toString(),"_",j.toString()));
                //console.log("t".concat(i.toString(),"_",j.toString()));
                textoCelda3.setAttribute("class","input-table");
                cell.appendChild(textoCelda3);
                row.appendChild(cell); 
            }
        }
        tbody.appendChild(row);
    }
    let row = document.createElement('tr');
    for (let j = 0; j < numDestinos+2; j++) {
        if (j==0) {
            let cell = document.createElement('th');
            cell.innerHTML="Demanda";
            row.appendChild(cell);
        }else{
            let cell = document.createElement('td');
            var textoCelda3 = document.createElement("input");
            textoCelda3.setAttribute("id","t".concat(numFuentes+1,"_",j.toString()));
            //console.log("t".concat(numFuentes+1,"_",j.toString()));
            textoCelda3.setAttribute("class","input-table");
            cell.appendChild(textoCelda3);
            row.appendChild(cell);
        }
    }
    tbody.appendChild(row);
    //Deshabilita el boton para generar la tabla 
    let boton = document.getElementById("btn_tabla");
    boton.setAttribute("disabled",true);
}

//Seleccionar el metodo
function metodoSolucion(){
    let selector = document.getElementById("metodo-tabla");
    let aux;
    let resultado;
    switch (parseInt(selector.value)) {
        case 1:
            alert("Esquina noroeste");
            aux = resuelve();
            resultado=algoritmoEsquina(aux);
            alert("El resultado es: "+ resultado);
            break;
        case 2:
            alert("Costo mínimo");
            llenaArreglos();
            encontrarMinimo();
            break;
        case 3:
            alert("Vogel");
            aux = resuelve();
            resultado=vogelApproximation(tabla);
            alert("El resultado es: "+ resultado);
            break;
        default:
            alert("Elija un metodo")
            break;
    }
}

function Celda(costo,valor,idInput,fila,columna){
    this.costo = costo;
    this.valor = valor;
    this.idInput = idInput;
    this.fila = fila;
    this.columna = columna;
}

function CeldaOfertaDemanda(valor,idInput,fila,columna){
    this.valor = valor;
    this.idInput = idInput;
    this.fila = fila;
    this.columna = columna;
}

function llenaArreglos() {
    //Crea matriz 2x2 con los costos de la tabla 
    let fila;
    for (let i = 1; i <= numFuentes; i++) {
        fila = [];
        for (let j = 1; j <= numDestinos; j++) {
            let id = 't'+i+'_'+j;
            let costo = document.getElementById(id).value;
            let fil = i;
            let col = j;
            let cell = new Celda(parseInt(costo),0,id,fil,col);
            fila.push(cell);
        }
        celdas.push(fila);
    }
    //llena arreglo de oferta 
    for (let i = 1; i <= numFuentes ; i++) {
        let col = numDestinos+1;
        let id = 't'+i+'_'+col;
        let ofer = parseInt(document.getElementById(id).value);
        let cell = new CeldaOfertaDemanda(ofer,id,i,col);
        oferta.push(cell);
    }
    //llena arreglo de demanda 
    for (let j = 1; j <= numDestinos; j++) {
        let fil = numFuentes+1;
        let id = 't'+fil+'_'+j;
        let deman= parseInt(document.getElementById(id).value);
        let cell = new CeldaOfertaDemanda(deman,id,fil,j);
        demanda.push(cell);
    }
  }

  //Actualizar Tabla 
  function ActualizarTabla() {
    for (let i = 0; i < oferta.length; i++) {
        for (let j = 0; j < demanda.length; j++) {
            let cell = document.getElementById(celdas[i][j].idInput);   
            cell.value = celdas[i][j].costo+" X "+celdas[i][j].valor;
        }
    }
    for (let i = 0; i < oferta.length; i++) {
        let cell = document.getElementById(oferta[i].idInput); 
        cell.value = oferta[i].valor;
        if(oferta[i].valor == 0){
            filSatisfecha.push(i+1);
        }
        
    }
    for (let j = 0; j < demanda.length; j++) {
        let cell = document.getElementById(demanda[j].idInput); 
        cell.value = demanda[j].valor;
        if(demanda[j].valor == 0){
            colSatisfecha.push(j+1);
        }
    }
  }

  function esSatisfecha(array,n) {
    if (array.length == 0) {
        return false;
    }
    for (let i = 0; i < array.length; i++) {
      if (n == array[i]) {
        return true;
      }
    }
    return false;
  }