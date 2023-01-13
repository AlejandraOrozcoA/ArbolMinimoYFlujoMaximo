
function generarTabla(){
    document.getElementById("div-tabla").style.display = "block";
    let numDestinos = parseInt(document.getElementById('col').value);
    let numFuentes = parseInt(document.getElementById('fil').value);
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
            aux = resuelve();
            resultado=minimumCost(tabla);
            alert("El resultado es: "+ resultado);
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


function resuelve() {
    var tabla=new Array();
    var fuentes = parseInt(document.getElementById('fil').value);
    var destinos = parseInt(document.getElementById('col').value);
    for (var i = 1; i <= fuentes+1; i++) {
      var col=new Array();
      for (var j = 1; j <= destinos+1; j++) {
        if(i<=fuentes || j <= destinos){
            let cadena = "t".concat(i.toString(),"_",j.toString());
            console.log("La cadena es: "+cadena);
            col[j-1]=document.getElementById(cadena).value;
        }
      }
      tabla[i-1] = col;
    }
    return tabla;
  }