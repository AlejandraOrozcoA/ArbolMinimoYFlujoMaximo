let esquina;
let filEsquina; 
let colEsquina;

function iniciarEsquina() {
    esquina = celdas[0][0];
    actualizarValores();
}

function actualizarEsquina() {
  for (let i = 1; i <= numFuentes; i++) {
    for (let j = 1; j <= numDestinos; j++) {
      if(esSatisfecha(filSatisfecha,i) == false && esSatisfecha(colSatisfecha,j) == false){
        esquina = celdas[i-1][j-1];
        actualizarValores();
      }
    }
  }
}

function actualizarValores() {
  let ofertaActual = oferta[esquina.fila-1].valor;
    let demandaActual = demanda[esquina.columna-1].valor;
    if (ofertaActual == demandaActual ) { 
      esquina.valor = ofertaActual;
      oferta[esquina.fila-1].valor = ofertaActual-ofertaActual;
      demanda[esquina.columna-1].valor = demandaActual-demandaActual;
    } else if(ofertaActual > demandaActual){
      esquina.valor = demandaActual;
      oferta[esquina.fila-1].valor = ofertaActual-demandaActual;
      demanda[esquina.columna-1].valor = demandaActual-demandaActual;
    }else if(ofertaActual < demandaActual){
      esquina.valor = ofertaActual;
      oferta[esquina.fila-1].valor = ofertaActual-ofertaActual;
      demanda[esquina.columna-1].valor = demandaActual-ofertaActual;
    }
    ActualizarTabla();
}