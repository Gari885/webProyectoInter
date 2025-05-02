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
    function ordenarTarjetas(asc = true) {
      const tarjetas = Array.from(contenedorTarjetas.querySelectorAll(".column.is-4"));
    
      tarjetas.sort((a, b) => {
        const tituloA = a.querySelector(".title.is-5")?.textContent?.trim()?.toLowerCase() || "";
        const tituloB = b.querySelector(".title.is-5")?.textContent?.trim()?.toLowerCase() || "";
        return asc ? tituloA.localeCompare(tituloB) : tituloB.localeCompare(tituloA);
      });
    
      // Eliminar todas las tarjetas del DOM y volver a insertarlas en orden
      tarjetas.forEach(tarjeta => {
        contenedorTarjetas.removeChild(tarjeta);
      });
    
      tarjetas.forEach(tarjeta => {
        contenedorTarjetas.appendChild(tarjeta);
      });
    }
    
  
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
        if (rango) {
            const fechas = rango.split(" to ").map(f => new Date(f));
            fechaInicio = fechas[0];
            fechaFin = fechas[1] || fechas[0]; // si solo hay una fecha, usarla como inicio y fin
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
          const visibleCards = Array.from(document.querySelectorAll(".column.is-4")).filter(card => card.style.display !== "none");
          document.getElementById("no-results").style.display = visibleCards.length === 0 ? "block" : "none";

        });
      });
      
      document.getElementById("limpiarFiltrosBtn").addEventListener("click", e => {
        e.preventDefault();
      
        document.getElementById("filtroTipo").value = "Todos";
        document.getElementById("filtroParticipantes").value = "";
        document.querySelectorAll('input[name="filtroEstado"]').forEach(r => r.checked = false);
      
        const datepicker = document.getElementById("datepicker");
        if (datepicker._flatpickr) {
          datepicker._flatpickr.clear();
        }
      
        document.querySelectorAll(".column.is-4").forEach(card => {
          card.style.display = "";
        });
      
        // 👇 Oculta el mensaje de "sin resultados"
        document.getElementById("no-results").style.display = "none";
      });
      
      
    // Mostrar/ocultar calendario
    document.getElementById("toggle-calendar").addEventListener("click", function () {
      const container = document.getElementById("calendar-container");
      container.style.display = container.style.display === "none" ? "block" : "none";
    });
  
    // Activación del flatpickr en modo rango
    flatpickr("#datepicker", {
      dateFormat: "Y-m-d",
      mode: "range",
      allowInput: false // desactiva escribir a mano
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
  
    document.querySelectorAll(".guardar-miembros").forEach(btn => {
        btn.addEventListener("click", () => {
          const modal = btn.closest(".modal");
          const projectId = modal.id.replace("ProyectoMiembros", "");
      
          const userList = document.getElementById("userList" + projectId);
          const selectAdd = document.getElementById("addUser" + projectId);
          const selectRemove = document.getElementById("removeUser" + projectId);
      
          const addUser = selectAdd.value;
          const removeUser = selectRemove.value;
      
          if (addUser && addUser !== "Seleccionar usuario") {
            const exists = Array.from(userList.children).some(li => li.textContent === addUser);
            if (!exists) {
              const li = document.createElement("li");
              li.textContent = addUser;
              userList.appendChild(li);
            }
          }
      
          if (removeUser && removeUser !== "Seleccionar usuario") {
            const liToRemove = Array.from(userList.children).find(li => li.textContent === removeUser);
            if (liToRemove) {
              liToRemove.remove();
            }
          }
      
          selectAdd.selectedIndex = 0;
          selectRemove.selectedIndex = 0;
          modal.classList.remove("is-active");
        });
      });
      
      
  });
  
  