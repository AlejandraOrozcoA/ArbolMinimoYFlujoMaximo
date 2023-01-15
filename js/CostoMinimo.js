let celdaMinimo = new Celda ( Number.MAX_SAFE_INTEGER, null, null, null, null);

function encontrarMinimo(){
  let minimo = Number.MAX_SAFE_INTEGER;
  for (let i = 1; i <= numFuentes; i++) {
    for (let j = 1; j <= numDestinos; j++) {
      if(esSatisfecha(filSatisfecha,i) == false && esSatisfecha(colSatisfecha,j) == false){
        console.log(i+"_"+j);
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
