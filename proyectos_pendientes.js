// Script para gestion_proyectos.html

document.addEventListener("DOMContentLoaded", () => {
    // MODALES
    document.querySelectorAll(".modal-trigger").forEach(trigger => {
      const targetId = trigger.getAttribute("data-target");
      trigger.addEventListener("click", () => {
        const modal = document.getElementById(targetId);
        if (modal) modal.classList.add("is-active");
      });
    });
  
    document.querySelectorAll(".modal .delete, .modal-background").forEach(el => {
      el.addEventListener("click", () => {
        const modal = el.closest(".modal");
        if (modal) modal.classList.remove("is-active");
      });
    });
  
    // ACEPTAR / RECHAZAR
    document.querySelectorAll(".card-footer .button").forEach(btn => {
      btn.addEventListener("click", () => {
        const column = btn.closest(".column");
        if (column) column.remove();
      });
    });
  
    // BUSCADOR
    const input = document.getElementById("searchInput");
    input.addEventListener("input", e => {
      const value = e.target.value.toLowerCase();
      document.querySelectorAll(".column.is-4").forEach(col => {
        const text = col.innerText.toLowerCase();
        col.style.display = text.includes(value) ? "" : "none";
      });
    });
  
    // ORDENAR POR NOMBRE
    const ordenarPorNombre = asc => {
      const container = document.querySelector(".columns.is-multiline");
      const cards = Array.from(container.children);
      cards.sort((a, b) => {
        const nameA = a.querySelector(".card .title")?.textContent.trim().toLowerCase() || "";
        const nameB = b.querySelector(".card .title")?.textContent.trim().toLowerCase() || "";
        return asc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
      cards.forEach(c => container.appendChild(c));
    };
  
    document.getElementById("ordenAsc").addEventListener("click", e => {
      e.preventDefault();
      ordenarPorNombre(true);
    });
  
    document.getElementById("ordenDesc").addEventListener("click", e => {
      e.preventDefault();
      ordenarPorNombre(false);
    });
  
    // FILTRAR (con flatpickr rango)
    document.getElementById("aplicarFiltrosBtn").addEventListener("click", e => {
      e.preventDefault();
      const tipo = document.getElementById("filtroTipo").value;
      const participantes = document.getElementById("filtroParticipantes").value;
      const estadoRadio = document.querySelector('input[name="filtroEstado"]:checked');
      const estado = estadoRadio ? estadoRadio.value : null;
      const rango = document.getElementById("datepicker").value;
  
      let fechaInicio = null;
      let fechaFin = null;
      if (rango.includes(" to ")) {
        [fechaInicio, fechaFin] = rango.split(" to ").map(f => new Date(f));
      }
  
      document.querySelectorAll(".column.is-4").forEach(card => {
        const cardTipo = card.getAttribute("data-tipo");
        const cardPart = parseInt(card.getAttribute("data-participantes"));
        const cardEstado = card.getAttribute("data-estado");
        const cardFecha = new Date(card.getAttribute("data-fecha"));
  
        const tipoOk = tipo === "Todos" || cardTipo === tipo;
        const partOk = !participantes || cardPart === parseInt(participantes);
        const estadoOk = !estado || cardEstado === estado;
        const fechaOk = !fechaInicio || (cardFecha >= fechaInicio && cardFecha <= fechaFin);
  
        card.style.display = tipoOk && partOk && estadoOk && fechaOk ? "" : "none";
      });
    });
  
    // Mostrar/ocultar calendario
    document.getElementById("toggle-calendar").addEventListener("click", function () {
      const container = document.getElementById("calendar-container");
      container.style.display = container.style.display === "none" ? "block" : "none";
    });
  
    // Activación del flatpickr en modo rango
    flatpickr("#datepicker", {
      dateFormat: "Y-m-d",
      mode: "range"
    });
  
    // ARCHIVAR: cambia visualmente el estado del proyecto
    document.querySelectorAll(".card-footer .button.is-danger").forEach(btn => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".column");
        const tag = card.querySelector(".tag");
        if (tag) {
          tag.textContent = "Archivado";
          tag.classList.remove("is-info");
          tag.classList.add("is-danger");
          card.setAttribute("data-estado", "archivado");
        }
      });
    });
  
    // ADMINISTRAR USUARIOS (mostrar modal)
    document.querySelectorAll('[for^="modalCheckboxProyectoMiembros"]').forEach(label => {
      label.addEventListener("click", () => {
        const inputId = label.getAttribute("for");
        const modal = document.getElementById("ProyectoMiembros" + inputId.replace("modalCheckboxProyectoMiembros", ""));
        if (modal) modal.classList.add("is-active");
      });
    });
  
    document.querySelectorAll(".modal .delete, .modal-background").forEach(closeBtn => {
      closeBtn.addEventListener("click", () => {
        closeBtn.closest(".modal").classList.remove("is-active");
      });
    });
  });
  
  
  
  
  