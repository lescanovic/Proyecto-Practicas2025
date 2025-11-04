
document.addEventListener("DOMContentLoaded", () => {  //cuando el DOM esté listo

  // click en "Ver perfil"
  document.addEventListener("click", (e) => { //escuchar clicks en todo el documento
    const btn = e.target.closest(".btn-view-profile"); //si el click fue en un botón con esa clase, guardarlo en btn
    if (!btn) return; //si no es ese botón, salir de la función

    // info del trabajador
    const nombre = btn.dataset.nombre; //obtiene el nombre del trabajador
    const info   = btn.dataset.info; //obtiene una breve descripcion del trabajador
    const rating = btn.dataset.rating; //trae la puntuacion del trabajador

    // modal para mostrar el perfil
    const perfilHtml = `
      <div class="modal fade" id="perfilModalHomeFix" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${nombre}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p style="color:gold;font-size:18px;">${rating}</p>
              <p>${info}</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button class="btn btn-perfil-consultar btn-danger" id="btnConsultarDesdePerfil">Consultar</button>
            </div>
          </div>
        </div>
      </div>`;

   
    const viejo = document.getElementById("perfilModalHomeFix"); //si hay un modal viejo, guardarlo en viejo
    if (viejo) viejo.remove(); // eliminar cualquier modal viejo para evitar duplicados

    // insertar modal nuevo
    document.body.insertAdjacentHTML("beforeend", perfilHtml); 
    const modal = new bootstrap.Modal(document.getElementById("perfilModalHomeFix")); //inicializa el modal
    modal.show(); //muestra el modal

    // botón Consultar dentro del perfil
    document.getElementById("btnConsultarDesdePerfil").onclick = () => { //cuando se clickea en "Consultar"
      modal.hide(); //oculta el modal del perfil

      // abrir el chat ya hecho
      const chat = document.getElementById("chatOffcanvas");
      const bsChat = new bootstrap.Offcanvas(chat);
      bsChat.show();

      // mostrar en el chat a quién se escribe
      const mensajesDiv = document.getElementById("mensajesChat");
      mensajesDiv.innerHTML += `
        <div style="font-weight:bold;margin-top:10px;color:#8121d6;">
          Hablando con: ${nombre}
        </div>`;

      // guardar el nombre actual del técnico para este chat
      localStorage.setItem("chat_actual_trabajador", nombre);
    };
  });

  // función de enviar mensaje del chat
  const chatInput = document.querySelector("#chatOffcanvas input.form-control");
  const chatBtn = document.querySelector("#chatOffcanvas button.btn-success");
  const mensajesDiv = document.getElementById("mensajesChat");

  function enviarMensaje() {
    const texto = chatInput.value.trim();
    if (!texto) return;

    const trabajador = localStorage.getItem("chat_actual_trabajador") || "Trabajador";
    const key = "homefix_chat_mensajes";
    const mensajesGuardados = JSON.parse(localStorage.getItem(key) || "[]");

    // mensaje del usuario
    const mensajeUsuario = {
      from: "usuario",
      to: trabajador,
      texto,
      hora: new Date().toLocaleTimeString(),
    };
    mensajesGuardados.push(mensajeUsuario);
    localStorage.setItem(key, JSON.stringify(mensajesGuardados));

    // mostrar mensaje del usuario
    mensajesDiv.innerHTML += `
      <div style="margin:5px 0;">
        <span style="color:#333;font-weight:500;">Tú:</span> ${texto} 
      </div>`; //estilos básicos para el mensaje

    chatInput.value = "";

    // respuesta automática del trabajador
    setTimeout(() => {
      const respuesta = {
        from: trabajador,
        texto: `Hola! En breve ${trabajador} te estará respondiendo, muchas gracias por elegir Home Fix.`,
        hora: new Date().toLocaleTimeString(), //hora del mensaje
      };
      mensajesGuardados.push(respuesta); //agrega la respuesta al array
      localStorage.setItem(key, JSON.stringify(mensajesGuardados)); //guarda de nuevo en localStorage

      mensajesDiv.innerHTML += `
        <div style="margin:5px 0;color:#5EA877;">
          <span style="font-weight:500;">${trabajador}:</span> ${respuesta.texto} 
        </div>`; //estilos básicos para la respuesta
    }, 700);
  }

  chatBtn.addEventListener("click", enviarMensaje); //cuando se clickea en el botón de enviar
  chatInput.addEventListener("keydown", (e) => { //escuchar teclas en el input
    if (e.key === "Enter") enviarMensaje(); //si es Enter, enviar mensaje
  });
});
