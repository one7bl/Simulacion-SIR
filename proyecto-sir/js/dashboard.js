import { supabase } from './api/supabase.js';
import { calcularPasoSIR } from './core/math.js';
import { actualizarContadoresUI, setRealtimeStatus, obtenerParametros, inicializarSliders } from './ui/ui.js';
import { inicializarGrafica, agregarPuntoGrafica, reiniciarGrafica } from './ui/chart.js';

// Estado Global del Dashboard
let estudiantesCache = [];
let pasoActual = 0;

// Referencias DOM adicionales
const btnInteractuar = document.getElementById('btnInteractuar');
const btnReiniciar = document.getElementById('btnReiniciar');

async function cargarEstudiantesIniciales() {
  const { data, error } = await supabase.from('estudiantes').select('*');
  if (error) {
    console.error("Error cargando estudiantes:", error);
    return;
  }
  estudiantesCache = data || [];
  actualizarVista();
}

function actualizarVista() {
  let s = 0, i = 0, r = 0;
  for (const est of estudiantesCache) {
    if (est.estado === 'S') s++;
    else if (est.estado === 'I') i++;
    else if (est.estado === 'R') r++;
  }
  
  actualizarContadoresUI(s, i, r);
  
  // Agregar punto a la gráfica solo si la población > 0 o si es el primer paso
  if (estudiantesCache.length > 0 && pasoActual === 0) {
      agregarPuntoGrafica(pasoActual, s, i, r);
  }
}

function suscribirRealtime() {
  const channel = supabase.channel('cambios-estudiantes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'estudiantes' }, (payload) => {
      manejarCambioRealtime(payload);
    })
    .subscribe((status) => {
      setRealtimeStatus(status === 'SUBSCRIBED');
    });
}

function manejarCambioRealtime(payload) {
  const { eventType, new: newRow, old: oldRow } = payload;
  
  if (eventType === 'INSERT') {
    estudiantesCache.push(newRow);
  } else if (eventType === 'UPDATE') {
    const index = estudiantesCache.findIndex(e => e.id === newRow.id);
    if (index !== -1) estudiantesCache[index] = newRow;
  } else if (eventType === 'DELETE') {
    estudiantesCache = estudiantesCache.filter(e => e.id !== oldRow.id);
  }
  
  actualizarVista();
}

async function ejecutarInteraccion() {
  if (estudiantesCache.length === 0) {
    alert("No hay estudiantes conectados aún.");
    return;
  }

  btnInteractuar.disabled = true;
  btnInteractuar.textContent = "Calculando...";

  const params = obtenerParametros();
  const { infectarIDs, recuperarIDs } = calcularPasoSIR(estudiantesCache, params.beta, params.gamma);

  pasoActual++;

  try {
    // Para simplificar y mejorar eficiencia de las llamadas, agrupamos actualizaciones
    // En supabase podemos usar .in() si usamos el JS client correctamente, o promesas en paralelo
    
    const promesas = [];

    if (infectarIDs.length > 0) {
      promesas.push(supabase.from('estudiantes').update({ estado: 'I' }).in('id', infectarIDs));
    }
    
    if (recuperarIDs.length > 0) {
      promesas.push(supabase.from('estudiantes').update({ estado: 'R' }).in('id', recuperarIDs));
    }

    await Promise.all(promesas);

    // Los contadores se actualizarán automáticamente vía Realtime.
    // Sin embargo, para la gráfica, registramos el estado una vez que terminen las actualizaciones.
    // Damos un pequeño margen para que el Realtime procese (o calculamos nosotros directamente para la gráfica)
    setTimeout(() => {
        let s = 0, i = 0, r = 0;
        for (const est of estudiantesCache) {
            if (est.estado === 'S') s++;
            else if (est.estado === 'I') i++;
            else if (est.estado === 'R') r++;
        }
        agregarPuntoGrafica(pasoActual, s, i, r);
    }, 500);

  } catch (err) {
    console.error("Error en la interacción:", err);
    alert("Hubo un error procesando el paso SIR.");
  } finally {
    btnInteractuar.disabled = false;
    btnInteractuar.textContent = "EJECUTAR INTERACCIÓN (Paso +1)";
  }
}

async function reiniciarSesion() {
  if(!confirm("¿Seguro que deseas reiniciar la sesión? Se borrarán todos los estudiantes actuales.")) return;
  
  try {
    // Al no tener WHERE sin filtro, supabase requiere especificar algo que abarque a todos para un DELETE masivo. 
    // Como las políticas pueden restringirlo, seleccionamos los IDs o usamos != 0.
    const { error } = await supabase.from('estudiantes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
    
    pasoActual = 0;
    reiniciarGrafica();
  } catch (err) {
    console.error("Error reiniciando sesión:", err);
  }
}

function generarQR() {
  const contenedorQR = document.getElementById('qrCode');
  if(!contenedorQR) return;
  
  // Como se solicitó, asumimos que el usuario lo hará manual, pero dejamos un código genérico apuntando al host actual.
  const baseUrl = window.location.href.replace('index.html', '').replace(/\/$/, "");
  const urlUnirse = `${baseUrl}/unirse.html`;

  new QRCode(contenedorQR, {
      text: urlUnirse,
      width: 150,
      height: 150,
      colorDark : "#ffffff",
      colorLight : "#1f2937",
      correctLevel : QRCode.CorrectLevel.L
  });
}

// Inicialización Principal
window.addEventListener('DOMContentLoaded', () => {
  inicializarSliders();
  inicializarGrafica('sirChartCanvas');
  
  btnInteractuar.addEventListener('click', ejecutarInteraccion);
  if(btnReiniciar) {
    btnReiniciar.addEventListener('click', reiniciarSesion);
  }
  
  cargarEstudiantesIniciales();
  suscribirRealtime();
  generarQR();
});
