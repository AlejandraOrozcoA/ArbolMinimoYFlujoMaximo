let filP = [];
let filPMax = 0;
let colP = [];
let colPMax = 0;

let penalizacion = new Celda ( Number.MAX_SAFE_INTEGER, null, null, null, null);
let num1 = Number.MAX_SAFE_INTEGER;
let num2 = Number.MAX_SAFE_INTEGER;

function  calcularPenalizacion() {
  filP = [];
  colP = [];
  //Penalizacion por fila 
  for (let i = 0; i < numFuentes; i++) {
    for (let j = 0; j < numDestinos; j++) {
      if(esSatisfecha(filSatisfecha,i+1) == false && esSatisfecha(colSatisfecha,j+1) == false){
        if (num2 > celdas[i][j].costo) {
          num2 = celdas[i][j].costo;
          if (num1 > num2) {
            let aux = num1;
            num1 = num2;
            num2 = aux;
          }
        }
      }
    }
    if(esSatisfecha(filSatisfecha,i+1) == false){
      let penalizacion = num2-num1;
      filP.push(penalizacion); 
    }
    num1 = Number.MAX_SAFE_INTEGER;
    num2 = Number.MAX_SAFE_INTEGER;
  }

  //Penalizaion por columna 
  for (let j = 0; j < numDestinos; j++) {
    for (let i = 0; i < numFuentes; i++) {
      if(esSatisfecha(filSatisfecha,i+1) == false && esSatisfecha(colSatisfecha,j+1) == false){
        if (num2 > celdas[i][j].costo) {
            num2 = celdas[i][j].costo;
            if (num1 > num2) {
              let aux = num1;
              num1 = num2;
              num2 = aux;
            }
        }
      }
    }
    if(esSatisfecha(colSatisfecha,j+1) == false){
      let penalizacion = num2-num1;
      colP.push(penalizacion);
    }
    num1 = Number.MAX_SAFE_INTEGER;
    num2 = Number.MAX_SAFE_INTEGER;
  }
  mayorPenalizacion();
}

function Penalizacion(valor, index, pos){
  this.valor =  valor;
  this.index = index;
  this.posicion = pos;
}

function mayorPenalizacion() {
  let indexI = 0;
  let indexJ = 0;
  for (let i = 0; i < filP.length; i++) {
    if (esSatisfecha(filSatisfecha,i+1) == false) {
      if (filP[i] > filPMax) {
        filPMax = filP[i];
        indexI = i;
      }
    }
  }
  for (let j = 0; j < colP.length; j++) {
    if (esSatisfecha(colSatisfecha,j+1)==false) {
      if (colP[j] > colPMax) {
        colPMax = colP[j];
        indexJ = j;
      }
    }
  }
  if (colPMax > filPMax) {
    penalizacion = new Penalizacion(colPMax,indexJ,'columna');
  } else {
    penalizacion = new Penalizacion(filPMax,indexI,'fila');
  }
  encontrarMenor();
}

function encontrarMenor() {
  let menor = Number.MAX_SAFE_INTEGER;
  let index = penalizacion.index;

  if (penalizacion.posicion == 'fila') {
    for (let i = 0; i < numDestinos ; i++) {
      //if(esSatisfecha(filSatisfecha,index) == false && esSatisfecha(colSatisfecha,i+1) == false){
        if (menor > celdas[index][i].costo) {
          menor = celdas[index][i].costo;
          celdaMinimo = celdas[index][i];
        }
      //}
    }
  } else {
    for (let i = 0; i < numFuentes; i++) {
      //if(esSatisfecha(filSatisfecha,i+1) == false && esSatisfecha(colSatisfecha,index) == false){
        if (menor > celdas[i][index].costo) {
          menor = celdas[i][index].costo;
          celdaMinimo = celdas[index][i];
        }
      //}
    }
  }
  revisarOfertaDemanda();
}