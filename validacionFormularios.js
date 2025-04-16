document.addEventListener("DOMContentLoaded", () => {
  // INICIO DE SESIÓN
  const formInicioSesion = document.querySelector('.modal.inicioSesion form');
  if (formInicioSesion) {
    formInicioSesion.addEventListener('submit', (e) => {
      const email = formInicioSesion.querySelector('input[name="email"]').value.trim();
      const password = formInicioSesion.querySelector('input[name="password"]').value.trim();

      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Por favor, introduce un correo electrónico válido.");
        e.preventDefault();
        return;
      }

      if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        e.preventDefault();
        return;
      }
    });
  }

  // REGISTRO ORGANIZACIÓN
  const formOrganizacion = document.querySelector('.modal.registroOrganizacion form');
  if (formOrganizacion) {
    formOrganizacion.addEventListener('submit', (e) => {
      const campos = {
        cif: /^[A-Za-z0-9]{9}$/,
        codigo_postal: /^[0-9]{5}$/,
        telefono_organizacion: /^[0-9]{9}$/
      };

      let valid = true;
      let mensajes = [];

      for (let [nombre, regex] of Object.entries(campos)) {
        const campo = formOrganizacion.querySelector(`[name="${nombre}"]`);
        if (!regex.test(campo.value.trim())) {
          valid = false;
          mensajes.push(`El campo ${nombre.replace('_', ' ')} no es válido.`);
        }
      }

      const obligatorios = ['cif', 'nombre_organizacion', 'direccion', 'codigo_postal', 'localidad', 'telefono_organizacion'];
      obligatorios.forEach(nombre => {
        const campo = formOrganizacion.querySelector(`[name="${nombre}"]`);
        if (!campo.value.trim()) {
          valid = false;
          mensajes.push(`El campo ${nombre.replace('_', ' ')} es obligatorio.`);
        }
      });

      const terminos = formOrganizacion.querySelector('input[type="checkbox"]:required');
      if (!terminos.checked) {
        valid = false;
        mensajes.push("Debes aceptar los términos y condiciones.");
      }

      if (!valid) {
        alert("Errores en el formulario:\n\n" + mensajes.join("\n"));
        e.preventDefault();
      }
    });
  }

  // REGISTRO VOLUNTARIADO
  const formVoluntario = document.querySelector('.modal.registro form');
  if (formVoluntario) {
    formVoluntario.addEventListener('submit', (e) => {
      let errores = [];

      const nombre = formVoluntario.querySelector('input[placeholder="Ej: Ana"]').value.trim();
      if (!/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/.test(nombre)) {
        errores.push("El nombre solo debe contener letras.");
      }

      const apellidos = formVoluntario.querySelector('input[placeholder="Ej: Lopez Perez"]').value.trim();
      const apellidoParts = apellidos.split(" ");
      if (apellidoParts.length < 2 || !apellidoParts.every(part => /^[a-zA-ZÁÉÍÓÚÑáéíóúñ]+$/.test(part))) {
        errores.push("Debes introducir dos apellidos válidos (solo letras).");
      }

      const fechaNacimiento = formVoluntario.querySelector('input[type="date"]').value;
      const hoy = new Date().toISOString().split("T")[0];
      if (!fechaNacimiento || fechaNacimiento >= hoy) {
        errores.push("La fecha de nacimiento no puede ser igual o mayor a hoy.");
      }

      const email = formVoluntario.querySelector('input[type="email"]').value.trim();
      if (!/\S+@\S+\.\S+/.test(email)) {
        errores.push("El correo electrónico no es válido.");
      }

      const telefono = formVoluntario.querySelector('input[type="tel"]').value.trim();
      if (!/^[0-9]{9}$/.test(telefono)) {
        errores.push("El teléfono debe contener exactamente 9 dígitos.");
      }

      const ciclo = formVoluntario.querySelector('select');
      if (!ciclo.value) {
        errores.push("Debes seleccionar un ciclo.");
      }

      const tiposVoluntariado = formVoluntario.querySelectorAll('input[name="voluntariado[]"]:checked');
      if (tiposVoluntariado.length === 0) {
        errores.push("Selecciona al menos un tipo de voluntariado.");
      }

      const coche = formVoluntario.querySelectorAll('input[name="coche"]:checked');
      if (coche.length === 0) {
        errores.push("Debes indicar si dispones de vehículo propio.");
      }

      const terminos = formVoluntario.querySelector('input[type="checkbox"]:required');
      if (!terminos.checked) {
        errores.push("Debes aceptar los términos y condiciones.");
      }

      if (errores.length > 0) {
        alert("Errores en el formulario:\n\n" + errores.join("\n"));
        e.preventDefault();
      }
    });
  }
});
