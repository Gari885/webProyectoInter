
// Activacion del flatepicker para las fechas.
flatpickr("#datepicker", {
  dateFormat: "Y-m-d",
  mode: "range"
});

document.addEventListener("DOMContentLoaded", function () {

  // Elementos del dropdown
  const dropdown = document.getElementById("dropdownFilter");
  const trigger = dropdown.querySelector(".dropdown-trigger");
  const filterBtn = document.getElementById("filterBtn");

  trigger.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("is-active");
  });

  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("is-active");
  });

  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });

  document.getElementById("toggle-calendar").addEventListener("click", function () {
    const container = document.getElementById("calendar-container");
    container.style.display = container.style.display === "none" ? "block" : "none";
  });

  document.querySelectorAll('.modal-trigger').forEach(el => {
    el.addEventListener('click', () => {
      const target = el.getAttribute('data-target');
      const modal = document.getElementById(target);
      if (modal) modal.classList.add('is-active');
    });
  });

  document.querySelectorAll('[data-close], .modal .delete').forEach(el => {
    el.addEventListener('click', () => {
      const modal = el.closest('.modal');
      if (modal) modal.classList.remove('is-active');
    });
  });

  // =====================
  // BÚSQUEDA POR TEXTO
  // =====================
  const searchInput = document.getElementById("searchInput");

  const tarjetas = document.querySelectorAll(".column.is-4");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const filtro = searchInput.value.toLowerCase();

      tarjetas.forEach((tarjeta) => {
        const texto = tarjeta.textContent.toLowerCase();
        tarjeta.style.display = texto.includes(filtro) ? "" : "none";
      });
    });
  }

  // =====================
  // FILTRADO AVANZADO
  // =====================
  const tipoSelect = document.getElementById("tipoSelect");
  const orgSelect = document.getElementById("orgSelect");
  const estadoRadios = document.getElementsByName("estado");
  const odsCheckboxes = document.querySelectorAll('input[name="ods"]');
  const aplicarBtn = document.getElementById("aplicarBtn");

  function aplicarFiltros() {
    const tipo = tipoSelect.value;
    const org = orgSelect.value;
    const estado = [...estadoRadios].find(r => r.checked)?.value;
    const odsSeleccionados = [...odsCheckboxes]
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    tarjetas.forEach(tarjeta => {
      const tarjetaTipo = tarjeta.dataset.tipo;
      const tarjetaOrg = tarjeta.dataset.organizacion;
      const tarjetaEstado = tarjeta.dataset.estado;
      const tarjetaODS = tarjeta.dataset.ods ? tarjeta.dataset.ods.split(" ") : [];

      const coincideTipo = tipo === "Todos" || tarjetaTipo === tipo;
      const coincideOrg = org === "Ninguno" || tarjetaOrg === org;
      const coincideEstado = !estado || tarjetaEstado === estado;
      const coincideODS = odsSeleccionados.length === 0 || odsSeleccionados.every(o => tarjetaODS.includes(o));

      const mostrar = coincideTipo && coincideOrg && coincideEstado && coincideODS;
      tarjeta.style.display = mostrar ? "" : "none";
    });
  }

  aplicarBtn.addEventListener("click", function (e) {
    e.preventDefault();
    aplicarFiltros();
  });

  // =====================
  // LIMPIAR FILTROS
  // =====================
  const limpiarBtn = document.getElementById("limpiarFiltrosBtn");
  if (limpiarBtn) {
    limpiarBtn.addEventListener("click", e => {
      e.preventDefault();

      tipoSelect.value = "Todos";
      orgSelect.value = "Ninguno";
      estadoRadios.forEach(r => r.checked = false);
      odsCheckboxes.forEach(cb => cb.checked = false);

      const datepicker = document.getElementById("datepicker");
      if (datepicker._flatpickr) {
        datepicker._flatpickr.clear();
      }

      tarjetas.forEach(card => {
        card.style.display = "";
      });

      if (searchInput) {
        searchInput.value = "";
      }

      const noResults = document.getElementById("no-results");
      if (noResults) {
        noResults.style.display = "none";
      }
    });
  }

  // =====================
  // ORDENAMIENTO ALFABÉTICO POR NOMBRE
  // =====================
  const ordenAscBtn = document.getElementById("ordenAsc");
  const ordenDescBtn = document.getElementById("ordenDesc");
  const contenedorTarjetas = document.getElementById("contenedorTarjetas");

  
  function ordenarTarjetas(asc = true) {
    console.log("Ordenando tarjetas", asc ? "ascendente" : "descendente");
    const tarjetas = Array.from(contenedorTarjetas.querySelectorAll(".column.is-4"));

    tarjetas.sort((a, b) => {
      const tituloA = a.querySelector(".title.is-5")?.textContent?.trim()?.toLowerCase() || "";
      const tituloB = b.querySelector(".title.is-5")?.textContent?.trim()?.toLowerCase() || "";
      return asc ? tituloA.localeCompare(tituloB) : tituloB.localeCompare(tituloA);
    });

    tarjetas.forEach(tarjeta => contenedorTarjetas.removeChild(tarjeta));
    tarjetas.forEach(tarjeta => contenedorTarjetas.appendChild(tarjeta));
  }

  ordenAscBtn.addEventListener("click", function (e) {
    e.preventDefault();
    ordenarTarjetas(true);
  });

  ordenDescBtn.addEventListener("click", function (e) {
    e.preventDefault();
    ordenarTarjetas(false);
  });

  // =====================
  // SIMULACIÓN DE "APUNTARSE"
  // =====================
  const botonesApuntar = document.querySelectorAll('.card-footer-item.button');

  botonesApuntar.forEach(boton => {
    boton.addEventListener('click', function () {
      const columna = this.closest('.column');
      if (columna) {
        columna.style.display = 'none';
      }
    });
  });

});




      