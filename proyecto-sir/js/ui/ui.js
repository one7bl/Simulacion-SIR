/**
 * Módulo para gestionar la Interfaz de Usuario del Dashboard.
 */

// Elementos DOM de los contadores
const contadorS = document.getElementById('contadorS');
const contadorI = document.getElementById('contadorI');
const contadorR = document.getElementById('contadorR');

// Elemento del indicador Realtime
const indicadorRealtime = document.getElementById('indicadorRealtime');

/**
 * Actualiza los contadores grandes de la interfaz
 * @param {number} s - Número de Susceptibles
 * @param {number} i - Número de Infectados
 * @param {number} r - Número de Recuperados
 */
export function actualizarContadoresUI(s, i, r) {
  if (contadorS) contadorS.textContent = s;
  if (contadorI) contadorI.textContent = i;
  if (contadorR) contadorR.textContent = r;
}

/**
 * Cambia el estado del indicador de Realtime
 * @param {boolean} conectado - true si está conectado
 */
export function setRealtimeStatus(conectado) {
  if (!indicadorRealtime) return;
  if (conectado) {
    indicadorRealtime.classList.add('conectado');
    indicadorRealtime.classList.remove('desconectado');
    indicadorRealtime.title = "Realtime Conectado";
  } else {
    indicadorRealtime.classList.add('desconectado');
    indicadorRealtime.classList.remove('conectado');
    indicadorRealtime.title = "Realtime Desconectado";
  }
}

/**
 * Obtiene los valores actuales de los sliders Beta y Gamma
 * @returns {Object} { beta: number, gamma: number }
 */
export function obtenerParametros() {
  const betaInput = document.getElementById('beta');
  const gammaInput = document.getElementById('gamma');
  
  return {
    beta: parseFloat(betaInput.value),
    gamma: parseFloat(gammaInput.value)
  };
}

/**
 * Vincula la actualización del valor del slider al span que muestra su valor numérico
 */
export function inicializarSliders() {
  const betaInput = document.getElementById('beta');
  const betaValor = document.getElementById('betaValor');
  const gammaInput = document.getElementById('gamma');
  const gammaValor = document.getElementById('gammaValor');

  if (betaInput && betaValor) {
    betaInput.addEventListener('input', (e) => {
      betaValor.textContent = e.target.value;
    });
  }

  if (gammaInput && gammaValor) {
    gammaInput.addEventListener('input', (e) => {
      gammaValor.textContent = e.target.value;
    });
  }
}
