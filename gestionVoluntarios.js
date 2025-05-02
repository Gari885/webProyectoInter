document.addEventListener('DOMContentLoaded', () => {

// ✅ Comprobamos si hay un voluntario aceptado guardado
const datosGuardados = localStorage.getItem("voluntarioAceptado");
if (datosGuardados) {
    const voluntario = JSON.parse(datosGuardados);

    // 💬 Modal de confirmación
    const modalHTML = `
    <div class="modal is-active" id="modalConfirmacion">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">¡Voluntario Aceptado!</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <div class="modal-card-body">
                <p>El voluntario <strong>${voluntario.nombre}</strong> ha sido aceptado correctamente.</p>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modal = document.getElementById("modalConfirmacion");
    modal.querySelector(".delete").addEventListener("click", () => modal.remove());
    modal.querySelector(".modal-background").addEventListener("click", () => modal.remove());

    // 🆕 Crear tarjeta
    const contenedor = document.querySelector('.columns.is-multiline');
    const nuevaTarjeta = document.createElement('div');
    const idBase = Date.now();  // ID único para no repetir

    nuevaTarjeta.className = 'column is-4';
    nuevaTarjeta.dataset.disponibilidad = voluntario.disponibilidad;
    nuevaTarjeta.dataset.ciclo = voluntario.ciclo;
    nuevaTarjeta.dataset.curso = voluntario.curso;
    nuevaTarjeta.dataset.coche = voluntario.coche;

    nuevaTarjeta.innerHTML = `
        <div class="card">
            <div class="card-content">
                <p class="title is-5">
                    <i class="fa-solid fa-user has-text-info"></i>
                    <span class="nombre-voluntario">${voluntario.nombre}</span>
                    <button class="button is-info is-small is-light ml-2 open-modal" data-target="modalInfo${idBase}">
                        <span class="icon"><i class="fas fa-info-circle"></i></span>
                        <span>Ver Información</span>
                    </button>
                </p>
                <p><i class="fa-solid fa-thumbtack has-text-danger"></i> Rol:
                    <span class="tag is-link">Voluntario</span>
                </p>
            </div>
            <footer class="card-footer">
                <button class="card-footer-item button is-link is-light open-modal" data-target="modalHisto${idBase}">
                    <i class="fa-solid fa-rotate-left mr-2"></i> Ver Historial
                </button>
                <button class="card-footer-item button is-dark is-light open-modal" data-target="modalContacto${idBase}">
                    <i class="fa-solid fa-envelope mr-2"></i> Contactar
                </button>
            </footer>
        </div>
    `;

    contenedor.prepend(nuevaTarjeta);

    // Añadir los 3 modales dinámicos (Info, Historial, Contacto)
    const modalesHTML = `
        <div id="modalInfo${idBase}" class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Información de ${voluntario.nombre}</p>
                    <button class="delete close-modal" aria-label="close"></button>
                </header>
                <div class="modal-card-body">
                    <p>Email: ejemplo@email.com</p>
                    <p>Teléfono: +34 600 123 456</p>
                    <p>Ciclo: ${voluntario.ciclo}</p>
                    <p>Curso: ${voluntario.curso}</p>
                    <p>Disponibilidad: ${voluntario.disponibilidad}</p>
                </div>
            </div>
        </div>

        <div id="modalHisto${idBase}" class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Historial de ${voluntario.nombre}</p>
                    <button class="delete close-modal" aria-label="close"></button>
                </header>
                <div class="modal-card-body">
                    <ul>
                        <li>Participación en evento solidario - Enero 2024</li>
                        <li>Asistencia en comedor social - Diciembre 2023</li>
                    </ul>
                </div>
            </div>
        </div>

        <div id="modalContacto${idBase}" class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Contactar a ${voluntario.nombre}</p>
                    <button class="delete close-modal" aria-label="close"></button>
                </header>
                <div class="modal-card-body">
                    <textarea class="textarea" placeholder="Escribe tu mensaje aquí..."></textarea>
                </div>
                <footer class="modal-card-foot">
                    <button class="button is-success">Enviar</button>
                </footer>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalesHTML);

    // Activamos eventos para estos nuevos modales
    nuevaTarjeta.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('is-active');
        });
    });

    document.querySelectorAll(`#modalInfo${idBase} .close-modal, #modalHisto${idBase} .close-modal, #modalContacto${idBase} .close-modal`).forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('is-active');
        });
    });

    document.querySelectorAll(`#modalInfo${idBase} .modal-background, #modalHisto${idBase} .modal-background, #modalContacto${idBase} .modal-background`).forEach(bg => {
        bg.addEventListener('click', () => {
            bg.closest('.modal').classList.remove('is-active');
        });
    });

    // 🔄 Limpia localStorage para que no duplique al volver a entrar
    localStorage.removeItem("voluntarioAceptado");
}



    const searchInput = document.getElementById("searchInput");
    const contenedorTarjetas = document.querySelector('.columns.is-multiline');

    // 🔍 Buscador en tiempo real
    searchInput?.addEventListener("input", () => {
        const filtro = searchInput.value.toLowerCase();
        document.querySelectorAll(".column.is-4").forEach(tarjeta => {
            tarjeta.style.display = tarjeta.textContent.toLowerCase().includes(filtro) ? "" : "none";
        });
    });

    // 🔃 Ordenar tarjetas ascendente/descendente
    const ordenAscendente = document.querySelector('#dropdown-order-menu a:nth-child(1)');
    const ordenDescendente = document.querySelector('#dropdown-order-menu a:nth-child(2)');

    ordenAscendente?.addEventListener("click", (e) => {
        e.preventDefault();
        ordenarTarjetas(true);
    });

    ordenDescendente?.addEventListener("click", (e) => {
        e.preventDefault();
        ordenarTarjetas(false);
    });

    function ordenarTarjetas(asc = true) {
        const tarjetas = Array.from(contenedorTarjetas.querySelectorAll(".column.is-4"));
        tarjetas.sort((a, b) => {
            const aTexto = a.querySelector(".nombre-voluntario")?.textContent.trim().toLowerCase() || '';
            const bTexto = b.querySelector(".nombre-voluntario")?.textContent.trim().toLowerCase() || '';
            return asc ? aTexto.localeCompare(bTexto) : bTexto.localeCompare(aTexto);
        });
        tarjetas.forEach(t => contenedorTarjetas.appendChild(t));
    }

    // 🧠 Filtro avanzado por atributos
    const aplicarFiltrosBtn = document.querySelector(".aplicar-filtros-btn");
    const mensajeSinResultados = document.getElementById("mensaje-sin-resultados");

    aplicarFiltrosBtn?.addEventListener("click", (e) => {
        e.preventDefault();

        const disponibilidad = document.querySelector("select[name='disponibilidad']")?.value.trim().toLowerCase();
        const ciclo = document.querySelector("select[name='ciclo']")?.value.trim().toLowerCase();
        const curso = document.querySelector("input[name='curso']:checked")?.value.trim().toLowerCase();
        const coche = document.querySelector("input[name='coche']:checked")?.value.trim().toLowerCase();

        let contadorVisibles = 0;
        document.querySelectorAll(".column.is-4").forEach(tarjeta => {
            const td = tarjeta.dataset;

            const coincideDisponibilidad = (disponibilidad === "todos" || td.disponibilidad?.toLowerCase() === disponibilidad);
            const coincideCiclo = (ciclo === "todos" || td.ciclo?.toLowerCase() === ciclo);
            const coincideCurso = (!curso || td.curso?.toLowerCase() === curso);
            const coincideCoche = (!coche || td.coche?.toLowerCase() === coche);

             const mostrar = coincideDisponibilidad && coincideCiclo && coincideCurso && coincideCoche;
        tarjeta.style.display = mostrar ? "" : "none";

        if (mostrar) contadorVisibles++;
        });

         // Mostrar o ocultar mensaje según resultado
    if (contadorVisibles === 0) {
        mensajeSinResultados.classList.remove("is-hidden");
    } else {
        mensajeSinResultados.classList.add("is-hidden");
    }
    });

    // Reset filtros
    document.getElementById("btn-reset-filtros")?.addEventListener("click", () => {
        // Reiniciar los selects
        document.querySelector('select[name="disponibilidad"]').value = "Todos";
        document.querySelector('select[name="ciclo"]').value = "Todos";
    
        // Desmarcar los radios
        document.querySelectorAll('input[name="curso"]').forEach(el => el.checked = false);
        document.querySelectorAll('input[name="coche"]').forEach(el => el.checked = false);
    
        // Mostrar todas las tarjetas de nuevo
        document.querySelectorAll(".column.is-4").forEach(tarjeta => tarjeta.style.display = "");

        // Oculta el mensaje si estaba visible
    mensajeSinResultados.classList.add("is-hidden");
    });
    

    // Script para abrir y cerrar modales
    const openButtons = document.querySelectorAll('.open-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            document.getElementById(target).classList.add('is-active');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('is-active');
        });
    });

    // Cerrar también si se hace click fuera (en el fondo)
    modals.forEach(modal => {
        modal.querySelector('.modal-background').addEventListener('click', () => {
            modal.classList.remove('is-active');
        });
    });
});
