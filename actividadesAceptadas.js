document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("actividades-aceptadas");
    const actividades = JSON.parse(localStorage.getItem("actividadesAceptadas")) || [];
  
    if (actividades.length === 0) {
      contenedor.innerHTML = "<p>No has aceptado actividades todavía.</p>";
      return;
    }
  
    actividades.forEach((actividad) => {
      const div = document.createElement("div");
      div.className = "box";
      div.innerHTML = `
        <h4 class="title is-5">${actividad.nombre}</h4>
        <p class="subtitle is-6">${actividad.responsable}</p>
      `;
      contenedor.appendChild(div);
    });
  });