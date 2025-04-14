document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-crear-actividad');
  const abrirModal = document.getElementById('btn-crear-actividad');
  const cerrarModal = document.getElementById('cerrar-modal');
  const cancelarModal = document.getElementById('cancelar-modal');
  const fondoModal = document.querySelector('#modal-crear-actividad .modal-background');

  // Abrir modal
  abrirModal.addEventListener('click', () => {
    modal.classList.add('is-active');
  });

  // Cerrar modal
  cerrarModal.addEventListener('click', () => {
    modal.classList.remove('is-active');
  });

  cancelarModal.addEventListener('click', () => {
    modal.classList.remove('is-active');
  });

  fondoModal.addEventListener('click', () => {
    modal.classList.remove('is-active');
  });
});

   
  

