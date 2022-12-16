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