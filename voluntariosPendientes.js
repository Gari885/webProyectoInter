document.addEventListener('DOMContentLoaded', () => {
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

    // Código para abrir y cerrar modales
    const abrirModalBtns = document.querySelectorAll('.abrir-modal');
    const cerrarModalBtns = document.querySelectorAll('.cerrar-modal');
    const modalBackgrounds = document.querySelectorAll('.modal-background');

    abrirModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const modal = document.getElementById(targetId);
            if (modal) modal.classList.add('is-active');
        });
    });

    cerrarModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) modal.classList.remove('is-active');
        });
    });

    modalBackgrounds.forEach(bg => {
        bg.addEventListener('click', () => {
            const modal = bg.closest('.modal');
            if (modal) modal.classList.remove('is-active');
        });
    });

    // ✅ Aceptar y Rechazar voluntarios
    document.querySelectorAll(".card-footer-item.button.is-success").forEach(aceptarBtn => {
        aceptarBtn.addEventListener("click", () => {
            const tarjeta = aceptarBtn.closest(".column.is-4");

            // Tomamos los datos (el nombre limpio desde .nombre-voluntario)
            const datosVoluntario = {
                nombre: tarjeta.querySelector(".nombre-voluntario").innerText.trim(),
                ciclo: tarjeta.dataset.ciclo,
                curso: tarjeta.dataset.curso,
                disponibilidad: tarjeta.dataset.disponibilidad,
                coche: tarjeta.dataset.coche
            };

            // Guardamos como JSON en localStorage
            localStorage.setItem("voluntarioAceptado", JSON.stringify(datosVoluntario));

            // Redirigimos a la página de voluntarios activos
            window.location.href = "./gestion_voluntariado.html";
        });
    });

    document.querySelectorAll(".card-footer-item.button.is-danger").forEach(rechazarBtn => {
        rechazarBtn.addEventListener("click", () => {
            const tarjeta = rechazarBtn.closest(".column.is-4");
            tarjeta.remove();
        });
    });
});

