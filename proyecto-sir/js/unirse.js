import { supabase } from './api/supabase.js';

const formUnirse = document.getElementById('formUnirse');
const btnUnirse = document.getElementById('btnUnirse');
const viewForm = document.getElementById('viewForm');
const viewWaiting = document.getElementById('viewWaiting');
const statusTitle = document.getElementById('statusTitle');

formUnirse.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombreInput = document.getElementById('nombreInput').value.trim();
  const estadoSeleccionado = document.querySelector('input[name="estado"]:checked').value;

  if (!nombreInput) {
    alert('Por favor, ingresa tu nombre');
    return;
  }

  btnUnirse.disabled = true;
  btnUnirse.textContent = "Conectando...";

  try {
    const { data, error } = await supabase
      .from('estudiantes')
      .insert([{ nombre: nombreInput, estado: estadoSeleccionado }])
      .select();

    if (error) {
      throw error;
    }

    const miEstudiante = data[0];
    
    // Cambiar a vista de espera
    viewForm.classList.add('hidden');
    viewWaiting.classList.remove('hidden');

    // Suscribirse a los cambios de mi propio registro para actualizar UI si me infecto/recupero
    suscribirAMisCambios(miEstudiante.id);
    actualizarUiEstado(miEstudiante.estado);

  } catch (error) {
    console.error('Error al unirse:', error);
    alert('Error al conectar con la simulación. Revisa la consola.');
    btnUnirse.disabled = false;
    btnUnirse.textContent = "Unirse a la Simulación";
  }
});

function suscribirAMisCambios(id) {
  supabase.channel(`estudiante-${id}`)
    .on('postgres_changes', { 
      event: 'UPDATE', 
      schema: 'public', 
      table: 'estudiantes',
      filter: `id=eq.${id}`
    }, (payload) => {
      const nuevoEstado = payload.new.estado;
      actualizarUiEstado(nuevoEstado);
    })
    .on('postgres_changes', {
      event: 'DELETE',
      schema: 'public',
      table: 'estudiantes',
      filter: `id=eq.${id}`
    }, () => {
      // El profesor reinició la sesión
      alert("La sesión ha sido reiniciada.");
      window.location.reload();
    })
    .subscribe();
}

function actualizarUiEstado(estado) {
  // Remover clases previas
  document.body.className = '';
  document.body.classList.add(`estado-${estado}`);

  if (estado === 'S') {
    statusTitle.textContent = "Estado: SUSCEPTIBLE 🔵";
  } else if (estado === 'I') {
    statusTitle.textContent = "Estado: INFECTADO 🔴";
    // Podríamos añadir una vibración táctil si el dispositivo lo soporta
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  } else if (estado === 'R') {
    statusTitle.textContent = "Estado: RECUPERADO 🟢";
  }
}
