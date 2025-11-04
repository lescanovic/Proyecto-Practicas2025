// Script para manejar el modal "Consultar" y simular envío de mensajes al técnico
document.addEventListener('DOMContentLoaded', function () {
  // Añadir el HTML del modal al final del body
  const modalHtml = `
  <div class="modal fade" id="consultarModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Enviar mensaje</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="consultarForm">
          <div class="modal-body">
            <div id="consultAlert"></div>

            <div class="mb-2">
              <label class="form-label">Para</label>
              <input type="text" id="consultarTo" class="form-control" readonly>
            </div>

            <div class="mb-2">
              <label class="form-label">Tu nombre</label>
              <input type="text" id="consultarFrom" class="form-control" placeholder="Tu nombre (opcional)">
            </div>

            <div class="mb-2">
              <label class="form-label">Tu email</label>
              <input type="email" id="consultarEmail" class="form-control" placeholder="tu@ejemplo.com (opcional)">
            </div>

            <div class="mb-2">
              <label class="form-label">Mensaje</label>
              <textarea id="consultarMessage" class="form-control" rows="4" required></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml); //Inserta el modal en el body

  const modalEl = document.getElementById('consultarModal'); //selecciona el modal y lo guarda en modalEl
  const bsModal = new bootstrap.Modal(modalEl); //Inicializa el modal
  const form = modalEl.querySelector('#consultarForm'); //selecciona el fomulario dentro de ese modal
  const alertContainer = modalEl.querySelector('#consultAlert'); //contenedor de alertas dentro del modal

  
  document.addEventListener('click', function (e) { //esta atento al click en "consultar"
    const btn = e.target.closest('a.btn.btn-primary, button.btn.btn-primary'); //busca el boton con clase btn btn-primary
    if (!btn) return; //si no lo encuentra sale de la funcion
    const text = (btn.textContent || '').trim().toLowerCase(); //obtiene el texto del boton y lo pasa a minusculas
    if (!text.includes('consult')) { //si no incluye "consult"
      // también aceptar "consultar" en español
      if (!text.includes('consultar')) return; //si no incluye "consultar" sale de la funcion
    }
    e.preventDefault();

    // Buscar el nombre del técnico en la tarjeta más cercana
    const card = btn.closest('.card'); // Busca la tarjeta más cercana al botón clicado
    const nameEl = card ? card.querySelector('.card-title-small') : null; // Busca el elemento con el nombre del técnico
    const technician = nameEl ? nameEl.textContent.trim() : 'Técnico'; // Obtiene el nombre o usa 'Técnico' por defecto

    // Rellenar modal
    modalEl.querySelector('.modal-title').textContent = `Mensaje a ${technician}`; // Cambia el título del modal
    modalEl.querySelector('#consultarTo').value = technician; // Establece el campo "Para"
    modalEl.querySelector('#consultarFrom').value = ''; // Limpia el campo "De"
    modalEl.querySelector('#consultarEmail').value = ''; // Limpia el campo "Email"
    modalEl.querySelector('#consultarMessage').value = ''; // Limpia el campo "Mensaje"
    alertContainer.innerHTML = ''; // Limpia alertas previas

    bsModal.show(); // Muestra el modal
  });

  // Envío del formulario: almacenamos en localStorage (simulación)
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const to = modalEl.querySelector('#consultarTo').value; //nombre del técnico
    const from = modalEl.querySelector('#consultarFrom').value; //nombre del usuario
    const email = modalEl.querySelector('#consultarEmail').value; //email del usuario
    const message = modalEl.querySelector('#consultarMessage').value.trim(); //mensaje

    if (!message) { //si el mensaje está vacío
      showAlert('El mensaje no puede estar vacío.', 'danger'); //muestra alerta de error
      return; 
    }

    // Guardar en localStorage como simulación de envío
    try {
      const key = 'homefix_consultar_messages'; //clave para almacenar los mensajes
      const existing = JSON.parse(localStorage.getItem(key) || '[]'); //obtiene los mensajes existentes
      existing.push({ to, from, email, message, time: new Date().toISOString() }); //agrega el nuevo mensaje
      localStorage.setItem(key, JSON.stringify(existing)); //guarda de nuevo en localStorage

      showAlert('Mensaje enviado. El técnico recibirá tu consulta (simulado).', 'success'); //muestra alerta de exito

      // Limpiar mensaje y cerrar modal después de un momento
      modalEl.querySelector('#consultarMessage').value = ''; 
      setTimeout(function () { bsModal.hide(); }, 900); //cierra el modal despues de 0.9 segundos
    } catch (err) {
      console.error(err);
      showAlert('Error al enviar el mensaje. Intenta nuevamente.', 'danger');
    }
  });

  function showAlert(msg, type) {
    alertContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${msg}</div>`; //muestra una alerta dentro del modal
  }
});
