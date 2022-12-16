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