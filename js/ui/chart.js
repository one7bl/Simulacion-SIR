/**
 * Inicialización y gestión del gráfico con Chart.js
 */

let sirChart;

// Colores consistentes con la paleta de la aplicación
const COLOR_S = '#3b82f6'; // Azul
const COLOR_I = '#ef4444'; // Rojo
const COLOR_R = '#22c55e'; // Verde

export function inicializarGrafica(canvasId) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  
  sirChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [], // Pasos de tiempo
      datasets: [
        {
          label: 'Susceptibles (S)',
          borderColor: COLOR_S,
          backgroundColor: COLOR_S,
          data: [],
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0
        },
        {
          label: 'Infectados (I)',
          borderColor: COLOR_I,
          backgroundColor: COLOR_I,
          data: [],
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0
        },
        {
          label: 'Recuperados (R)',
          borderColor: COLOR_R,
          backgroundColor: COLOR_R,
          data: [],
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: '#e5e7eb' }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Tiempo (Interacciones)', color: '#9ca3af' },
          ticks: { color: '#9ca3af' },
          grid: { color: '#374151' }
        },
        y: {
          title: { display: true, text: 'Población', color: '#9ca3af' },
          ticks: { color: '#9ca3af' },
          grid: { color: '#374151' },
          min: 0
        }
      },
      animation: {
        duration: 500
      }
    }
  });
}

/**
 * Agrega un nuevo punto de datos a la gráfica
 * @param {number} paso - Número de interacción (tiempo)
 * @param {number} s - Total Susceptibles
 * @param {number} i - Total Infectados
 * @param {number} r - Total Recuperados
 */
export function agregarPuntoGrafica(paso, s, i, r) {
  if (!sirChart) return;
  
  sirChart.data.labels.push(paso);
  sirChart.data.datasets[0].data.push(s);
  sirChart.data.datasets[1].data.push(i);
  sirChart.data.datasets[2].data.push(r);
  
  sirChart.update();
}

/**
 * Limpia todos los datos de la gráfica para un reinicio
 */
export function reiniciarGrafica() {
  if (!sirChart) return;
  sirChart.data.labels = [];
  sirChart.data.datasets[0].data = [];
  sirChart.data.datasets[1].data = [];
  sirChart.data.datasets[2].data = [];
  sirChart.update();
}
