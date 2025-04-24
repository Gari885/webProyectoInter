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

  const tipoActividad = document.getElementById("tipoActividad");
  const camposUnica = document.getElementById("camposUnica");
  const camposRecurrente = document.getElementById("camposRecurrente");

  tipoActividad.addEventListener("change", () => {
    if (tipoActividad.value === "unica") {
      camposUnica.style.display = "block";
      camposRecurrente.style.display = "none";
    } else {
      camposUnica.style.display = "none";
      camposRecurrente.style.display = "block";
    }
  });

  let tarjetaEditando = null;

  abrirModal.addEventListener('click', () => {
    modal.classList.add('is-active');
  });

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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = new FormData(form);
    const nombre = datos.get('nombre');
    const responsable = datos.get('responsable');
    const contacto = datos.get('contacto');
    const tipo = datos.get('tipoActividad');
    const voluntariosNecesarios = datos.get('voluntariosNecesarios');
    const descripcion = datos.get('descripcion');

    let fechaInicioRaw = '';
    let fechaFinRaw = '';
    let frecuencia = '';
    let dias = [];
    let desde = '';
    let hasta = '';

    if (tipo === 'unica') {
      fechaInicioRaw = datos.get('fechaInicio');
      fechaFinRaw = datos.get('fechaFin');
    } else {
      frecuencia = datos.get('frecuencia');
      dias = Array.from(form.querySelectorAll('input[name="dias[]"]:checked')).map(cb => cb.value);
      desde = datos.get('desde');
      hasta = datos.get('hasta');
      fechaInicioRaw = desde;
      fechaFinRaw = hasta;
    }

    const fechaInicio = new Date(fechaInicioRaw);
    const fechaFin = new Date(fechaFinRaw);
    const hoy = new Date();
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

    const fechasHTML = tipo === "unica"
      ? `
        <p><i class="fa-solid fa-calendar has-text-primary"></i> Fecha inicio: ${fechaInicioRaw}</p>
        <p><i class="fa-solid fa-calendar has-text-primary"></i> Fecha fin: ${fechaFinRaw}</p>
      `
      : `
        <p><i class="fa-solid fa-calendar has-text-primary"></i> Desde: ${desde}</p>
        <p><i class="fa-solid fa-calendar has-text-primary"></i> Hasta: ${hasta}</p>
      `;

    if (tarjetaEditando) {
      tarjetaEditando.setAttribute('data-descripcion', descripcion);
      tarjetaEditando.setAttribute('data-contacto', contacto);
      tarjetaEditando.setAttribute('data-voluntarios', voluntariosNecesarios);
      tarjetaEditando.setAttribute('data-fecha-inicio', fechaInicioRaw);
      tarjetaEditando.setAttribute('data-fecha-fin', fechaFinRaw);
      tarjetaEditando.setAttribute('data-tipo', tipo);
      tarjetaEditando.setAttribute('data-frecuencia', frecuencia);
      tarjetaEditando.setAttribute('data-dias', dias.join(','));
      tarjetaEditando.setAttribute('data-desde', desde);
      tarjetaEditando.setAttribute('data-hasta', hasta);

      tarjetaEditando.querySelector('.card').innerHTML = `
        <div class="card-content">
          <p class="title is-5">${nombre}</p>
          <p class="subtitle is-6">
            <i class="fa-solid fa-user has-text-info"></i> Responsable: ${responsable}
          </p>
          ${fechasHTML}
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
            <i class="fa-solid fa-box-archive mr-2"></i> Archivar
          </button>
        </footer>
      `;

      tarjetaEditando = null;
    } else {
      const nuevaTarjeta = document.createElement('div');
      nuevaTarjeta.classList.add('column', 'is-4');
      nuevaTarjeta.setAttribute('data-descripcion', descripcion);
      nuevaTarjeta.setAttribute('data-contacto', contacto);
      nuevaTarjeta.setAttribute('data-voluntarios', voluntariosNecesarios);
      nuevaTarjeta.setAttribute('data-fecha-inicio', fechaInicioRaw);
      nuevaTarjeta.setAttribute('data-fecha-fin', fechaFinRaw);
      nuevaTarjeta.setAttribute('data-tipo', tipo);
      nuevaTarjeta.setAttribute('data-frecuencia', frecuencia);
      nuevaTarjeta.setAttribute('data-dias', dias.join(','));
      nuevaTarjeta.setAttribute('data-desde', desde);
      nuevaTarjeta.setAttribute('data-hasta', hasta);

      nuevaTarjeta.innerHTML = `
        <div class="card">
          <div class="card-content">
            <p class="title is-5">${nombre}</p>
            <p class="subtitle is-6">
              <i class="fa-solid fa-user has-text-info"></i> Responsable: ${responsable}
            </p>
            ${fechasHTML}
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
              <i class="fa-solid fa-box-archive mr-2"></i> Archivar
            </button>
          </footer>
        </div>
      `;

      contenedorTarjetas.insertBefore(nuevaTarjeta, contenedorTarjetas.children[1]);
    }

    form.reset();
    cerrar();
  });

  contenedorTarjetas.addEventListener('click', function (e) {
    const botonEditar = e.target.closest('.editar-actividad');
    const botonArchivar = e.target.closest('.archivar-actividad');
    const botonInfo = e.target.closest('.ver-info');

    if (botonEditar) {
      const card = botonEditar.closest('.card');
      const column = card.parentElement;

      form.nombre.value = card.querySelector('.title.is-5').innerText.trim();
      form.responsable.value = column.querySelector('.subtitle.is-6')?.innerText.replace('Responsable: ', '').trim();
      form.contacto.value = column.getAttribute('data-contacto');
      form.descripcion.value = column.getAttribute('data-descripcion');
      form.voluntariosNecesarios.value = column.getAttribute('data-voluntarios') || '';
      const tipo = column.getAttribute('data-tipo');
      form.tipoActividad.value = tipo;

      if (tipo === "recurrente") {
        form.frecuencia.value = column.getAttribute('data-frecuencia');
        const diasMarcados = (column.getAttribute('data-dias') || "").split(',');
        form.querySelectorAll('input[name="dias[]"]').forEach(cb => {
          cb.checked = diasMarcados.includes(cb.value);
        });
        form.desde.value = column.getAttribute('data-desde');
        form.hasta.value = column.getAttribute('data-hasta');
      } else {
        form.fechaInicio.value = column.getAttribute('data-fecha-inicio');
        form.fechaFin.value = column.getAttribute('data-fecha-fin');
      }

      tipoActividad.dispatchEvent(new Event("change"));
      tarjetaEditando = column;
      document.querySelector('[form="formulario-actividades"]').textContent = 'Guardar cambios';
      document.querySelector('#modal-crear-actividad .modal-card-title').textContent = 'Editar Actividad';
      modal.classList.add('is-active');
    }

    if (botonArchivar) {
      const card = botonArchivar.closest('.card');
      const tag = card.querySelector('.tag');
      tag.className = 'tag is-danger';
      tag.textContent = 'Archivado';
    }

    if (botonInfo) {
      const card = botonInfo.closest('.card');
      const column = card.parentElement;
      const titulo = card.querySelector('.title.is-5').innerText;
      const responsable = card.querySelector('.subtitle.is-6').innerText;
      const fechas = Array.from(card.querySelectorAll('p'))
        .filter(p => p.innerText.toLowerCase().includes('fecha') || p.innerText.toLowerCase().includes('desde') || p.innerText.toLowerCase().includes('hasta'))
        .map(p => p.innerText)
        .join('<br>');

      const estado = card.querySelector('.tag').outerHTML;
      const contacto = column.getAttribute('data-contacto') || 'No especificado';
      const descripcion = column.getAttribute('data-descripcion') || 'Sin descripción.';
      const voluntarios = column.getAttribute('data-voluntarios') || 'No especificado';

      const tipo = column.getAttribute('data-tipo');
      let extraInfo = '';

      if (tipo === 'recurrente') {
        const frecuencia = column.getAttribute('data-frecuencia') || 'No especificada';
        const dias = column.getAttribute('data-dias') || 'No especificados';
        extraInfo = `
          <p><strong>Frecuencia:</strong> ${frecuencia}</p>
          <p><strong>Días:</strong> ${dias}</p>
        `;
      }

      modalTitle.innerText = titulo;
      modalBody.innerHTML = `
        <p><strong>${responsable}</strong></p>
        <p>Contacto: ${contacto}</p>
        <p>${fechas}</p>
        ${extraInfo}
        <p>Estado: ${estado}</p>
        <p><strong>Voluntarios necesarios:</strong> ${voluntarios}</p>
        <hr>
        <p><strong>Descripción:</strong><br>${descripcion.replace(/\n/g, '<br>')}</p>
      `;

      modalInfo.classList.add('is-active');
    }
  });

  cerrarModalInfo.addEventListener('click', () => modalInfo.classList.remove('is-active'));
  cerrarBotonInfo.addEventListener('click', () => modalInfo.classList.remove('is-active'));
  fondoModalInfo.addEventListener('click', () => modalInfo.classList.remove('is-active'));

  const searchInput = document.getElementById("searchInput");
  searchInput?.addEventListener("input", () => {
    const filtro = searchInput.value.toLowerCase();
    document.querySelectorAll(".column.is-4").forEach(tarjeta => {
      tarjeta.style.display = tarjeta.textContent.toLowerCase().includes(filtro) ? "" : "none";
    });
  });

  document.getElementById("ordenAsc")?.addEventListener("click", () => ordenarTarjetas(true));
  document.getElementById("ordenDesc")?.addEventListener("click", () => ordenarTarjetas(false));

  function ordenarTarjetas(asc = true) {
    const tarjetas = Array.from(contenedorTarjetas.querySelectorAll(".column.is-4"));
    tarjetas.sort((a, b) => {
      const aTexto = a.querySelector(".title.is-5")?.textContent.trim().toLowerCase() || '';
      const bTexto = b.querySelector(".title.is-5")?.textContent.trim().toLowerCase() || '';
      return asc ? aTexto.localeCompare(bTexto) : bTexto.localeCompare(aTexto);
    });
    tarjetas.forEach(t => contenedorTarjetas.appendChild(t));
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const btnAplicarFiltros = document.getElementById("btn-aplicar-filtros");
  const inputParticipantes = document.getElementById("filtro-participantes");
  const radiosEstado = document.querySelectorAll('input[name="filtro-estado"]');
  const radiosTipo = document.querySelectorAll('input[name="filtro-tipo"]');

  btnAplicarFiltros?.addEventListener("click", () => {
    const tarjetas = document.querySelectorAll(".column.is-4");

    const participantesFiltro = parseInt(inputParticipantes.value) || 0;
    const estadoSeleccionado = Array.from(radiosEstado).find(r => r.checked)?.value || '';
    const tipoSeleccionado = Array.from(radiosTipo).find(r => r.checked)?.value || '';

    tarjetas.forEach(tarjeta => {
      const voluntarios = parseInt(tarjeta.getAttribute("data-voluntarios") || "0");
      const estadoTag = tarjeta.querySelector(".tag")?.textContent.trim().toLowerCase() || "";
      const tipoTarjeta = (tarjeta.getAttribute("data-tipo") || "").toLowerCase();

      const cumpleParticipantes = voluntarios >= participantesFiltro;
      const cumpleEstado = !estadoSeleccionado || estadoTag.includes(estadoSeleccionado);
      const cumpleTipo = !tipoSeleccionado || tipoTarjeta.includes(tipoSeleccionado);

      if (cumpleParticipantes && cumpleEstado && cumpleTipo) {
        tarjeta.style.display = "";
      } else {
        tarjeta.style.display = "none";
      }
    });
  });
});
// Funcionalidad para el botón "Restablecer Filtros"
document.getElementById("btn-reset-filtros")?.addEventListener("click", () => {
  document.getElementById("filtro-participantes").value = "";
  document.querySelectorAll('input[name="filtro-estado"]').forEach(el => el.checked = false);
  document.querySelectorAll('input[name="filtro-tipo"]').forEach(el => el.checked = false);

  document.querySelectorAll(".column.is-4").forEach(tarjeta => tarjeta.style.display = "");
});
