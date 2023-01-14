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
function elemKruskal() {
    document.getElementById("div-kruskal").style.display = "block";
    document.getElementById("div-prim").style.display = "none";
    let select = document.getElementsByName("nInicial")[0];
    for (let i = 0; i < nodos.length; i++) {
        let option = document.createElement("option");
        option.text = nodos[i].text;
        select.add(option);
    }
}

//Crea los elementos para Prim
function elemPrim() {
    document.getElementById("div-kruskal").style.display = "none";
    document.getElementById("div-prim").style.display = "block";
    let select = document.getElementsByName("n1")[0];
    for (let i = 0; i < nodos.length; i++) {
        let option = document.createElement("option");
        option.text = nodos[i].text;
        select.add(option);
    }
    select = document.getElementsByName("n2")[0];
    for (let i = 0; i < nodos.length; i++) {
        let option = document.createElement("option");
        option.text = nodos[i].text;
        select.add(option);
    }
}

//Quita los elementos de los select al limpiar pantalla
function removElementos() {
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


//document.addEventListener('DOMContentLoaded',() => {

    // Pinta un nodo que haya sido recorrido
    function pintaRojo(nodo) {
        for (let i = 0; i < nodos.length; i++) {
            if(nodos[i] == nodo || nodos[i].text == nodo){
                nodos[i].stroke_color = "red";
                nodos[i].bg_color = "#CC0000";
                reDraw();
            }
        }
    }

    // Marca una conexion entre nodos que haya sido recorrido
    function marcarConexion(a, b) {
        for (let i = 0; i < conectores.length; i++) {
            if (conectores[i].nodo1.text == a && conectores[i].nodo2.text == b) {
                let save = conectores[i].text;
                conectores[i].text = "(" + save + ")";
                reDraw();
                return true;
            } else if (conectores[i].nodo1.text == b && conectores[i].nodo2.text == a) {
                let save = conectores[i].text;
                conectores[i].text = "(" + save + ")";
                reDraw();
                return true;
            }
        }
        return false;
    }

    // Valida los elementos seleccionados en la casilla
    function validarKruskal() {
        let select = document.getElementById("nInicial");
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

    // Valida los elementos seleccionados en la casilla
    function validarPrim() {
        let select1 = document.getElementById("n1");
        nodo1 = select1.options[select1.selectedIndex].value;
        let select2 = document.getElementById("n2");
        nodo2 = select2.options[select2.selectedIndex].value;
        if (nodo1 === "...." || nodo2 === "....") {
            alert("Selecciona un nodo, no deje en Blanco");
            return false;
        } else if(!marcarConexion(nodo1,nodo2)){
            alert("Selecciona un nodo valido");
            return false;
        } else{
            let btn = document.getElementById("btnInicioPrim");
            btn.style.display = "block";
            return true;
        }
    }

    function generarGrafo(grafo) {
        for (let i = 0; i < conectores.length; i++) {
            let a = conectores[i].nodo1.text.charCodeAt(0) - "A".charCodeAt(0);
            let b = conectores[i].nodo2.text.charCodeAt(0) - "A".charCodeAt(0);
            grafo[a][b] = Number(conectores[i].text);
            grafo[b][a] = Number(conectores[i].text);
        }
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

    function prim() {
        let V = nodos.length;
        let let_MAX = Number.MAX_VALUE
        let inMST = Array(V).fill(false);
        let grafo = Array(V).fill(Array(V).fill(let_MAX));
        generarGrafo(grafo);

        // Include first vertex in MST
        inMST[0] = true;

        // Keep adding edges while number of included
        // edges does not become V-1.
        let edge_count = 0, mincost = 0;
        while (edge_count < V - 1) {

            // Find minimum weight valid edge.
            let min = let_MAX, a = -1, b = -1;
            for (let i = 0; i < V; i++) {
                for (let j = 0; j < V; j++) {
                    if (grafo[i][j] < min) {
                        if (isValidEdge(i, j, inMST)) {
                            min = grafo[i][j];
                            a = i;
                            b = j;
                        }
                    }
                }
            }

            if (a != -1 && b != -1) {
                edge_count++;
                mincost = mincost + min;
                inMST[b] = inMST[a] = true;
                nodoAux = String.fromCharCode(a + 65); // 65 = "A"
                pintaRojo(nodoAux);
                nodoAux = String.fromCharCode(b + 65); // 65 = "A"
                pintaRojo(nodoAux);
            }
        }
        alert("Minimum cost = " + mincost);
    }

    var parent = Array(nodos.length).fill(0);

    function find(i) {
        while (parent[i] != i)
            i = parent[i];
        return i;
    }

    function union1(i, j) {
        let a = find(i);
        let b = find(j);
        parent[a] = b;
    }

    function kruskal() {
        let mincost = 0; // Cost of min MST.
        let V = nodos.length;
        let let_MAX = Number.MAX_VALUE;
        let grafo = Array(V).fill(Array(V).fill(let_MAX));
        generarGrafo(grafo);

        for (let i = 0; i < V; i++)
            parent[i] = i;

        let edge_count = 0;
        while (edge_count < V - 1) {
            let min = let_MAX, a = -1, b = -1;
            for (let i = 0; i < V; i++) {
                for (let j = 0; j < V; j++) {
                    if (find(i) != find(j) && grafo[i][j] < min) {
                        min = grafo[i][j];
                        a = i;
                        b = j;
                    }
                }
            }

            union1(a, b);
            edge_count++;
            mincost += min;
            nodoAux = String.fromCharCode(a + 65); // 65 = "A"
            pintaRojo(nodoAux);
            nodoAux = String.fromCharCode(b + 65); // 65 = "A"
            pintaRojo(nodoAux);
            
        }
        alert("Minimum cost = " + mincost);
    }
//})