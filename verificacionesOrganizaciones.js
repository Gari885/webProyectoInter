  document.getElementById('registroOrganizacionForm').addEventListener('submit', function (e) {
    const form = e.target;
    const cif = form.cif.value.trim();
    const nombre = form.nombre_organizacion.value.trim();
    const direccion = form.direccion.value.trim();
    const cp = form.codigo_postal.value.trim();
    const localidad = form.localidad.value.trim();
    const telefono = form.telefono_organizacion.value.trim();
    const terminos = document.getElementById('terminos').checked;

    const errores = [];

    if (!/^[A-Za-z0-9]{9}$/.test(cif)) {
      errores.push('El CIF debe tener 9 caracteres alfanuméricos.');
    }

    if (nombre === '') {
      errores.push('El nombre de la organización es obligatorio.');
    }

    if (direccion === '') {
      errores.push('La dirección es obligatoria.');
    }

    if (!/^[0-9]{5}$/.test(cp)) {
      errores.push('El código postal debe tener 5 dígitos.');
    }

    if (localidad === '') {
      errores.push('La localidad es obligatoria.');
    }

    if (!/^[0-9]{9}$/.test(telefono)) {
      errores.push('El teléfono debe tener 9 dígitos.');
    }

    if (!terminos) {
      errores.push('Debes aceptar los términos y condiciones.');
    }

    if (errores.length > 0) {
      e.preventDefault();
      alert('Por favor corrige los siguientes errores:\n\n' + errores.join('\n'));
    }
  });
