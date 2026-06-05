/**
 * Motor matemático para el Modelo SIR discreto.
 *
 * El modelo SIR divide a la población en tres compartimentos:
 * S = Susceptibles (pueden contraer la enfermedad)
 * I = Infectados (tienen la enfermedad y pueden transmitirla)
 * R = Recuperados (tuvieron la enfermedad, están curados e inmunes)
 *
 * Ecuaciones continuas (diferenciales):
 * dS/dt = -β * (S * I) / N
 * dI/dt =  β * (S * I) / N - γ * I
 * dR/dt =  γ * I
 *
 * En este modelo discreto y probabilístico, evaluamos la probabilidad
 * de cambio de estado para CADA individuo en un "paso de tiempo" o "interacción":
 * 
 * Probabilidad de que un Susceptible se infecte: P(S -> I) = β * (I / N)
 * Probabilidad de que un Infectado se recupere: P(I -> R) = γ
 */

export function calcularPasoSIR(estudiantes, beta, gamma) {
  const infectarIDs = [];
  const recuperarIDs = [];

  const N = estudiantes.length;
  if (N === 0) return { infectarIDs, recuperarIDs };

  // Contar infectados actuales para calcular la fuerza de infección
  let numInfectados = 0;
  for (const est of estudiantes) {
    if (est.estado === 'I') numInfectados++;
  }

  // Probabilidades de transición
  const P_infeccion = beta * (numInfectados / N);
  const P_recuperacion = gamma;

  // Evaluar cada estudiante individualmente
  for (const est of estudiantes) {
    // Si es Susceptible, tiene riesgo de infectarse
    if (est.estado === 'S') {
      const azar = Math.random();
      if (azar < P_infeccion) {
        infectarIDs.push(est.id);
      }
    } 
    // Si es Infectado, tiene probabilidad de recuperarse
    else if (est.estado === 'I') {
      const azar = Math.random();
      if (azar < P_recuperacion) {
        recuperarIDs.push(est.id);
      }
    }
    // Si es 'R' (Recuperado), no hace nada (inmunidad permanente en modelo básico)
  }

  // Retornamos los IDs de los estudiantes que cambiarán de estado.
  // NO mutamos el objeto original aquí, mantenemos funciones puras.
  return { infectarIDs, recuperarIDs };
}
