// Activar flatpickr
flatpickr("#datepicker", {
  dateFormat: "Y-m-d",
  mode: "range"
});

const dropdown = document.getElementById("dropdownFilter");
const trigger = dropdown.querySelector(".dropdown-trigger");
const filterBtn = document.getElementById("filterBtn");

// Mostrar/ocultar calendario
document.getElementById("toggle-calendar").addEventListener("click", function () {
  const container = document.getElementById("calendar-container");
  container.style.display = container.style.display === "none" ? "block" : "none";
});

// Activar dropdown al hacer clic

trigger.addEventListener("click", function () {
  dropdown.classList.toggle("is-active")});

  filterBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // Previene que se cierre inmediatamente si haces clic
      dropdown.classList.toggle("is-active");
    });
  
    // Esto cierra el dropdown si haces clic fuera
    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("is-active");
      }
    });
    // Esto abre el modal
    document.querySelectorAll('.modal-trigger').forEach(el => {
      el.addEventListener('click', () => {
        const target = el.getAttribute('data-target');
        const modal = document.getElementById(target);
        if (modal) modal.classList.add('is-active');
      });
    });
    //Esto cierra el modal
    document.querySelectorAll('[data-close], .modal .delete').forEach(el => {
      el.addEventListener('click', () => {
        const modal = el.closest('.modal');
        if (modal) modal.classList.remove('is-active');
      });
    });
    console.log("Script cargado correctamente");

    //Dejar esto para mas tarde, no churula por ahora


document.addEventListener("DOMContentLoaded", () => {
const trigger = document.getElementById("ordenTrigger");
const dropdown = document.getElementById("ordenDropdown");
const ascBtn = document.getElementById("ordenAsc");
const descBtn = document.getElementById("ordenDesc");
const contenedor = document.querySelector(".columns.is-multiline");

// Activar/desactivar dropdown de Bulma
trigger.addEventListener("click", () => {
  dropdown.classList.toggle("is-active");
});

// Obtener nombre sin ícono
function obtenerNombreActividad(card) {
  const titulo = card.querySelector(".title.is-5");
  return titulo.textContent.trim().replace(/^\s*\S+\s*/, "").toLowerCase();
}

// Ordenar columnas
function ordenarActividades(ascendente = true) {
  const columnas = Array.from(contenedor.querySelectorAll(".column.is-4"));
  
  columnas.sort((a, b) => {
    const nombreA = obtenerNombreActividad(a);
    const nombreB = obtenerNombreActividad(b);
    return ascendente ? nombreA.localeCompare(nombreB) : nombreB.localeCompare(nombreA);
  });

  // Volver a insertar ordenadas
  columnas.forEach(col => contenedor.appendChild(col));
}

ascBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ordenarActividades(true);
  dropdown.classList.remove("is-active");
});

descBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ordenarActividades(false);
  dropdown.classList.remove("is-active");
});
});
//Mismo codigo

//Codigo de aceptar

document.addEventListener("DOMContentLoaded", () => {
const botones = document.querySelectorAll(".button-aceptar");

botones.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".column.is-4");
    const nombre = card.querySelector(".title.is-5").textContent.trim();
    const responsable = card.querySelector(".subtitle.is-6").textContent.trim();

    const actividad = {
      nombre,
      responsable
      // Podés agregar más datos si querés
    };

    // Obtener actividades guardadas o iniciar
    let actividades = JSON.parse(localStorage.getItem("actividadesAceptadas")) || [];
    actividades.push(actividad);
    localStorage.setItem("actividadesAceptadas", JSON.stringify(actividades));

    alert("Actividad aceptada ✅");
    // opcional: redirigir a la página de aceptadas
    // window.location.href = "aceptadas.html";
  });
});
});
    