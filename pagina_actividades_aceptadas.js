
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const contenedorTarjetas = document.getElementById("contenedorTarjetas");
    const dropdownFilter = document.getElementById("dropdownFilter");
    const filterBtn = document.getElementById("filterBtn");
    const ordenTrigger = document.getElementById("ordenTrigger");
    const ordenDropdown = document.getElementById("ordenDropdown");
    const ordenAsc = document.getElementById("ordenAsc");
    const ordenDesc = document.getElementById("ordenDesc");
    const toggleCalendarBtn = document.getElementById("toggle-calendar");
    const calendarContainer = document.getElementById("calendar-container");
    const datepicker = document.getElementById("datepicker");
    const aplicarFiltrosBtn = document.getElementById("aplicarFiltrosBtn");
    const limpiarBtn = document.getElementById("limpiarFiltrosBtn");
  
    const tipoSelect = document.getElementById("selectTipo");
    const orgSelect = document.getElementById("selectOrganizacion");
    const estadoRadios = Array.from(document.querySelectorAll("input[name='estado']"));
    const odsCheckboxes = Array.from(document.querySelectorAll("input[name='ods']"));
    const tarjetas = Array.from(contenedorTarjetas.children);
  
    flatpickr(datepicker, {
      dateFormat: "d-m-Y",
      allowInput: true
    });
  
    filterBtn.addEventListener("click", () => {
      dropdownFilter.classList.toggle("is-active");
    });
  
    toggleCalendarBtn.addEventListener("click", () => {
      calendarContainer.style.display = calendarContainer.style.display === "none" ? "block" : "none";
    });
  
    ordenTrigger.addEventListener("click", () => {
      ordenDropdown.classList.toggle("is-active");
    });
  
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      tarjetas.forEach(card => {
        const title = card.querySelector(".title").textContent.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
      });
    });
  
    aplicarFiltrosBtn.addEventListener("click", (e) => {
      e.preventDefault();
  
      const tipo = tipoSelect.value;
      const organizacion = orgSelect.value;
      const estado = estadoRadios.find(r => r.checked)?.value;
      const odsSeleccionados = odsCheckboxes.filter(cb => cb.checked).map(cb => cb.value);
  
      tarjetas.forEach(card => {
        const cardTipo = card.dataset.tipo;
        const cardOrg = card.dataset.organizacion;
        const cardEstado = card.dataset.estado;
        const cardODS = card.dataset.ods.split(" ");
        let visible = true;
  
        if (tipo !== "Todos" && cardTipo !== tipo) visible = false;
        if (organizacion !== "Ninguno" && cardOrg !== organizacion) visible = false;
        if (estado && cardEstado !== estado) visible = false;
        if (odsSeleccionados.length && !odsSeleccionados.every(ods => cardODS.includes(ods))) visible = false;
  
        card.style.display = visible ? "block" : "none";
      });
  
      dropdownFilter.classList.remove("is-active");
    });
  
    function ordenarTarjetas(asc = true) {
      const ordenadas = [...tarjetas].sort((a, b) => {
        const aTexto = a.querySelector(".title").textContent.trim();
        const bTexto = b.querySelector(".title").textContent.trim();
        return asc ? aTexto.localeCompare(bTexto) : bTexto.localeCompare(aTexto);
      });
  
      contenedorTarjetas.innerHTML = "";
      ordenadas.forEach(card => contenedorTarjetas.appendChild(card));
    }
  
    ordenAsc.addEventListener("click", (e) => {
      e.preventDefault();
      ordenarTarjetas(true);
      ordenDropdown.classList.remove("is-active");
    });
  
    ordenDesc.addEventListener("click", (e) => {
      e.preventDefault();
      ordenarTarjetas(false);
      ordenDropdown.classList.remove("is-active");
    });
  
    contenedorTarjetas.addEventListener("click", (e) => {
      if (e.target.closest(".button-desapuntar")) {
        const card = e.target.closest(".column");
        if (confirm("¿Desapuntarte de esta actividad?")) {
          card.style.display = "none";
        }
      }
    });
  
    if (limpiarBtn) {
      limpiarBtn.addEventListener("click", e => {
        e.preventDefault();
        tipoSelect.value = "Todos";
        orgSelect.value = "Ninguno";
        estadoRadios.forEach(r => r.checked = false);
        odsCheckboxes.forEach(cb => cb.checked = false);
        if (datepicker._flatpickr) {
          datepicker._flatpickr.clear();
        }
        tarjetas.forEach(card => {
          card.style.display = "block";
        });
        if (searchInput) {
          searchInput.value = "";
        }
      });
    }
  });
  
  