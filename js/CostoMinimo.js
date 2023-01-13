function minimumCost(costs, demands, supplies) {
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
      // Encontrar el menor costo no asignado
    let minCost = Number.MAX_VALUE;
    let row = -1;
    let col = -1;
    for (let i = 0; i < demands.length; i++) {
        if (demands[i] > 0) {
        for (let j = 0; j < supplies.length; j++) {
            if (supplies[j] > 0 && costs[i][j] < minCost) {
            minCost = costs[i][j];
            row = i;
            col = j;
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