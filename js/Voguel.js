function vogelApproximation(costs, demands, supplies) {
    // Inicializar la matriz de asignación y los totales de demanda y oferta
    const assignment = [];
    let totalDemand = 0;
    let totalSupply = 0;

    // Inicializar la matriz de asignación con ceros
    for (let i = 0; i < demands.length; i++) {
    assignment[i] = [];
    for (let j = 0; j < supplies.length; j++) {
        assignment[i][j] = 0;
    }
    }

    // Calcular el total de demanda y oferta
    for (let i = 0; i < demands.length; i++) {
    totalDemand += demands[i];
    }
    for (let i = 0; i < supplies.length; i++) {
    totalSupply += supplies[i];
    }

    // Mientras haya demanda o oferta sin asignar
    while (totalDemand > 0 && totalSupply > 0) {
      // Encontrar la fila y columna con la mayor diferencia entre costo y costo ajustado
    let row = -1;
    let col = -1;
    let minDiff = Number.MAX_VALUE;
    for (let i = 0; i < demands.length; i++) {
        if (demands[i] > 0) {
        for (let j = 0; j < supplies.length; j++) {
            if (supplies[j] > 0) {
            const diff = costs[i][j] - (costs[i][j] - costs[i][j]) / (demands[i] + supplies[j]);
            if (diff < minDiff) {
                minDiff = diff;
                row = i;
                col = j;
            }
            }
        }
        }
    }

      // Calcular la cantidad asignada en esta iteración
    let assignmentAmount = Math.min(demands[row], supplies[col]);

      // Actualizar la matriz de asignación, los totales de demanda y oferta y las demandas y ofertas restantes
    assignment[row][col] = assignmentAmount;
    demands[row] -= assignmentAmount;
    supplies[col] -= assignmentAmount;
    totalDemand -= assignmentAmount;
    totalSupply -= assignmentAmount;
    }

    // Devolver la matriz de asignación
    return assignment;
}