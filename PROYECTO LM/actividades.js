
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
    