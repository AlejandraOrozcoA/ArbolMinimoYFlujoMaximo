let celdaMinimo = new Celda ( Number.MAX_SAFE_INTEGER, null, null, null, null);

function encontrarMinimo(){
  let minimo = Number.MAX_SAFE_INTEGER;
  for (let i = 1; i <= numFuentes; i++) {
    for (let j = 1; j <= numDestinos; j++) {
      if(esSatisfecha(filSatisfecha,i) == false && esSatisfecha(colSatisfecha,j) == false){
        if (minimo > celdas[i-1][j-1].costo) {
          celdaMinimo = celdas[i-1][j-1];
          minimo = celdas[i-1][j-1].costo;
        }
      }
    }
  }
  revisarOfertaDemanda();
}

function revisarOfertaDemanda(){
  let filCeldaM = celdaMinimo.fila;
  let colCeldaM = celdaMinimo.columna;
  let ofertaActual = oferta[filCeldaM-1].valor;
  let demandaActual = demanda[colCeldaM-1].valor;

  if (ofertaActual == demandaActual ) { 
    celdaMinimo.valor = ofertaActual;
    oferta[filCeldaM-1].valor = ofertaActual-ofertaActual;
    demanda[colCeldaM-1].valor = demandaActual-demandaActual;
  } else if(ofertaActual > demandaActual){
    celdaMinimo.valor = demandaActual;
    oferta[filCeldaM-1].valor = ofertaActual-demandaActual;
    demanda[colCeldaM-1].valor = demandaActual-demandaActual;
  }else if(ofertaActual < demandaActual){
    celdaMinimo.valor = ofertaActual;
    oferta[filCeldaM-1].valor = ofertaActual-ofertaActual;
    demanda[colCeldaM-1].valor = demandaActual-ofertaActual;
  }
  ActualizarTabla();
}

function esTerminado() {
    let ofer=0;
    let deman=0;
    for (let i = 0; i < oferta.length; i++) {
      if (oferta[i].valor == 0) {
        ofer++;
      }
    }
    for (let i = 0; i < demanda.length; i++) {
      if (demanda[i].valor == 0) {
        deman++;
      }
    }
    if (ofer == numFuentes && deman == numDestinos ) {
      let boton = document.getElementById("btn_sig");
      boton.setAttribute("disabled",true);
      calcularResultado();
    } 
}

function calcularResultado() {
  let res = 0;
  let cadena = '';
  for (let i = 0; i < oferta.length; i++) {
    for (let j = 0; j < demanda.length; j++) {
      res += celdas[i][j].costo*celdas[i][j].valor;
      cadena += celdas[i][j].costo+'X'+celdas[i][j].valor+" + ";
    }
  } 
  let titulo = document.getElementById('resul');
  titulo.setAttribute("style","display:block;");
  let operacion = document.getElementById('txt_resul');
  operacion.innerHTML = cadena+"="+res; 
}