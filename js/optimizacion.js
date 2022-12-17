
function generarTabla(){
    document.getElementById("div-tabla").style.display = "block";
    let numDestinos = parseInt(document.getElementById('destinos').value);
    let numFuentes = parseInt(document.getElementById('fuentes').value);
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
    for (let i = 0; i < numFuentes; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < numDestinos+2; j++) {
            if (j==0) {
                let cell = document.createElement('th');
                cell.innerHTML="Fuente "+(i+1);
                row.appendChild(cell);
            }else{
                let cell = document.createElement('td');
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
            row.appendChild(cell);
        }
    }
    tbody.appendChild(row);
}