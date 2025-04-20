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


      //Esto es para buscar con los boxes
      
      document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.getElementById("searchInput");
        const actividadBoxes = document.querySelectorAll(".container .box");
      
        searchInput.addEventListener("input", function () {
          const filtro = searchInput.value.toLowerCase();
      
          actividadBoxes.forEach((box) => {
            const texto = box.textContent.toLowerCase();
            box.style.display = texto.includes(filtro) ? "" : "none";
          });
        });
      });


      //Esto es para buscar con el otro formato 
      document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.getElementById("searchInput");
        const tarjetas = document.querySelectorAll(".column.is-4");
      
        searchInput.addEventListener("input", function () {
          const filtro = searchInput.value.toLowerCase();
      
          tarjetas.forEach((tarjeta) => {
            const texto = tarjeta.textContent.toLowerCase();
            tarjeta.style.display = texto.includes(filtro) ? "" : "none";
          });
        });
      });
      
      