document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-crear-actividad');
  const abrirModal = document.getElementById('btn-crear-actividad');
  const cerrarModal = document.getElementById('cerrar-modal');
  const cancelarModal = document.getElementById('cancelar-modal');
  const fondoModal = document.querySelector('#modal-crear-actividad .modal-background');
  const form = document.getElementById('formulario-actividades');
  const contenedorTarjetas = document.querySelector('.columns.is-multiline');

  const modalInfo = document.getElementById('modal-ver-actividad');
  const modalTitle = document.getElementById('titulo-actividad-modal');
  const modalBody = document.getElementById('contenido-actividad-modal');
  const cerrarModalInfo = document.getElementById('cerrar-modal-info');
  const cerrarBotonInfo = document.getElementById('cerrar-boton-info');
  const fondoModalInfo = document.querySelector('#modal-ver-actividad .modal-background');

  let tarjetaEditando = null;

  // Abrir modal de creación
  abrirModal.addEventListener('click', () => {
    modal.classList.add('is-active');
  });

  // Cerrar modal de creación o edición
  const cerrar = () => {
    modal.classList.remove('is-active');
    tarjetaEditando = null;
    form.reset();
    document.querySelector('[form="formulario-actividades"]').textContent = 'Crear actividad';
    document.querySelector('#modal-crear-actividad .modal-card-title').textContent = 'Crear Actividad';
  };

  cerrarModal.addEventListener('click', cerrar);
  cancelarModal.addEventListener('click', cerrar);
  fondoModal.addEventListener('click', cerrar);

  // Enviar formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = new FormData(form);
    const nombre = datos.get('nombre');
    const responsable = datos.get('responsable');
    const contacto = datos.get('contacto');
    const fechaInicioRaw = datos.get('fechaInicio');
    const fechaFinRaw = datos.get('fechaFin');
    const fechaInicio = new Date(fechaInicioRaw);
    const fechaFin = new Date(fechaFinRaw);
    const hoy = new Date();
    const descripcion = datos.get('descripcion');

    hoy.setHours(0, 0, 0, 0);
    fechaInicio.setHours(0, 0, 0, 0);
    fechaFin.setHours(0, 0, 0, 0);

    let estado = '';
    let claseEstado = '';

    if (hoy < fechaInicio) {
      estado = 'Pendiente';
      claseEstado = 'is-warning';
    } else if (hoy >= fechaInicio && hoy <= fechaFin) {
      estado = 'En curso';
      claseEstado = 'is-success';
    } else {
      estado = 'Archivado';
      claseEstado = 'is-danger';
    }

    if (tarjetaEditando) {
      // Editar tarjeta
      tarjetaEditando.setAttribute('data-descripcion', descripcion);
      tarjetaEditando.setAttribute('data-contacto', contacto);

      const card = tarjetaEditando.querySelector('.card');
      card.querySelector('.title.is-5').innerText = nombre;
      card.querySelector('.subtitle.is-6').innerHTML = `<i class="fa-solid fa-user has-text-info"></i> Responsable: ${responsable}`;
      const pFechaInicio = Array.from(card.querySelectorAll('p')).find(p => p.innerText.includes('Fecha inicio:'));
const pFechaFin = Array.from(card.querySelectorAll('p')).find(p => p.innerText.includes('Fecha fin:'));

if (pFechaInicio) {
  pFechaInicio.innerHTML = `<i class="fa-solid fa-calendar has-text-primary"></i> Fecha inicio: ${fechaInicioRaw}`;
}

if (pFechaFin) {
  pFechaFin.innerHTML = `<i class="fa-solid fa-calendar has-text-primary"></i> Fecha fin: ${fechaFinRaw}`;
}

      const estadoP = Array.from(card.querySelectorAll('p')).find(p => p.innerText.includes('Estado:'));
      estadoP.innerHTML = `
        <i class="fa-solid fa-thumbtack has-text-danger"></i> Estado:
        <span class="tag ${claseEstado}">${estado}</span>
        <label class="button is-info is-small is-light has-text-weight-bold ml-2 ver-info">
          <span class="icon"><i class="fas fa-info-circle"></i></span>
          <span>Ver Información</span>
        </label>
      `;

      tarjetaEditando = null;
      document.querySelector('[form="formulario-actividades"]').textContent = 'Crear actividad';
      document.querySelector('#modal-crear-actividad .modal-card-title').textContent = 'Crear Actividad';
    } else {
      // Crear nueva tarjeta
      const nuevaTarjeta = document.createElement('div');
      nuevaTarjeta.classList.add('column', 'is-4');
      nuevaTarjeta.setAttribute('data-descripcion', descripcion);
      nuevaTarjeta.setAttribute('data-contacto', contacto);

      nuevaTarjeta.innerHTML = `
        <div class="card">
          <div class="card-content">
            <p class="title is-5">${nombre}</p>
            <p class="subtitle is-6">
              <i class="fa-solid fa-user has-text-info"></i> Responsable: ${responsable}
            </p>
            <p>
              <i class="fa-solid fa-calendar has-text-primary"></i> Fecha inicio: ${fechaInicioRaw}
            </p>
            <p>
              <i class="fa-solid fa-calendar has-text-primary"></i> Fecha fin: ${fechaFinRaw}
            </p>
            <p>
              <i class="fa-solid fa-thumbtack has-text-danger"></i> Estado:
              <span class="tag ${claseEstado}">${estado}</span>
              <label class="button is-info is-small is-light has-text-weight-bold ml-2 ver-info">
                <span class="icon"><i class="fas fa-info-circle"></i></span>
                <span>Ver Información</span>
              </label>
            </p>
          </div>
          <footer class="card-footer">
            <button class="card-footer-item button is-success is-light editar-actividad">
              <i class="fa-solid fa-pen-to-square mr-2"></i> Editar
            </button>
            <button class="card-footer-item button is-danger is-light archivar-actividad">
              <i class="fa-solid fa-file-export mr-2"></i> Archivar
            </button>
          </footer>
        </div>
      `;

      contenedorTarjetas.insertBefore(nuevaTarjeta, contenedorTarjetas.children[1]);
    }

    form.reset();
    cerrar();
  });

  // Detectar clics en tarjetas
  contenedorTarjetas.addEventListener('click', function (e) {
    const botonEditar = e.target.closest('.editar-actividad');
    const botonArchivar = e.target.closest('.archivar-actividad');
    const botonInfo = e.target.closest('.ver-info');

    // Editar
    if (botonEditar) {
      const card = botonEditar.closest('.card');
      const column = card.parentElement;

      const titulo = card.querySelector('.title.is-5').innerText.trim();
      const responsable = card.querySelector('.subtitle.is-6').innerText.replace('Responsable: ', '').trim();
      const contacto = column.getAttribute('data-contacto');
      const descripcion = column.getAttribute('data-descripcion');
      const fechaInicio = card.querySelectorAll('p')[1].innerText.split(': ')[1];
      const fechaFin = card.querySelectorAll('p')[2].innerText.split(': ')[1];

      form.nombre.value = titulo;
      form.responsable.value = responsable;
      form.contacto.value = contacto;
      form.fechaInicio.value = fechaInicio;
      form.fechaFin.value = fechaFin;
      form.descripcion.value = descripcion;

      tarjetaEditando = column;

      document.querySelector('[form="formulario-actividades"]').textContent = 'Guardar cambios';
      document.querySelector('#modal-crear-actividad .modal-card-title').textContent = 'Editar Actividad';
      modal.classList.add('is-active');
    }

    // Archivar
    if (botonArchivar) {
      const card = botonArchivar.closest('.card');
      const tag = card.querySelector('.tag');
      tag.className = 'tag is-danger';
      tag.textContent = 'Archivado';
    }

    // Ver Información
    if (botonInfo) {
      const card = botonInfo.closest('.card');
      const titulo = card.querySelector('.title.is-5').innerText;
      const responsable = card.querySelector('.subtitle.is-6').innerText;
      const fechas = Array.from(card.querySelectorAll('p'))
        .filter(p => p.innerText.includes('Fecha'))
        .map(p => p.innerText)
        .join('<br>');
      const estado = card.querySelector('.tag').outerHTML;
      const contacto = card.parentElement.getAttribute('data-contacto') || 'No especificado';
      const descripcion = card.parentElement.getAttribute('data-descripcion') || 'Sin descripción.';

      modalTitle.innerText = titulo;
      modalBody.innerHTML = `
        <p><strong>${responsable}</strong></p>
        <p>Contacto: ${contacto}</p>
        <p>${fechas}</p>
        <p>Estado: ${estado}</p>
        <hr>
        <p><strong>Descripción:</strong><br>${descripcion.replace(/\n/g, '<br>')}</p>
      `;
      modalInfo.classList.add('is-active');
    }
  });

  // Cerrar modal de info
  const cerrarInfo = () => modalInfo.classList.remove('is-active');
  cerrarModalInfo.addEventListener('click', cerrarInfo);
  cerrarBotonInfo.addEventListener('click', cerrarInfo);
  fondoModalInfo.addEventListener('click', cerrarInfo);
});
 
  

