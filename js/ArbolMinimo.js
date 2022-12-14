let selector = document.getElementById('metodo');

//Diferencia entre Kruskal  y Prim
function elegirMetodo() {
    switch (selector.value) {
    case "1":
        elemKruskal();
        break;
    case "2":
        alert("soy prim");
        break;
    default:
        alert("Seleccione un metodo");
        break;
    }
}

//Crea los elementos para Kruskal 
function elemKruskal(){
    document.getElementById("div-kruskal").style.display = "block";
    let select = document.getElementsByName("nInicial")[0];
    for(let i=0;  i < nodos.length; i++){
        let option = document.createElement("option");
        option.text = nodos[i].text;
        select.add(option);
    }
}
