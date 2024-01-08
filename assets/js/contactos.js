async function GetAllContactos(ruta,buttons) {
      const resp = await axios.get(endpointBase + ruta);
      if (resp.status === 200) {
            resp.data.forEach((element, index) => {
                  let accordionContainer = document.getElementById('accordionContactos');

                  //---------Para el accordion----------//
                  let accordionItem = document.createElement('div');
                  accordionItem.classList.add('accordion-item');
                  
                  let accordionHeader = document.createElement('h2');
                  accordionHeader.classList.add('accordion-header');
                  
                  let accordionButton = document.createElement('button');
                  accordionButton.classList.add('accordion-button', 'collapsed');
                  accordionButton.setAttribute('type', 'button');
                  accordionButton.setAttribute('data-bs-toggle', 'collapse');
                  accordionButton.setAttribute('data-bs-target', `#collapse${index}`);
                  accordionButton.setAttribute('aria-expanded', 'false');
                  accordionButton.setAttribute('aria-controls', `collapse${index}`);
                  accordionButton.textContent = `${element.nombre} ${element.apellido}`; // Puedes ajustar aquí qué datos mostrar en el encabezado del acordeón
                  
                  accordionHeader.appendChild(accordionButton);
                  
                  let accordionCollapse = document.createElement('div');
                  accordionCollapse.classList.add('accordion-collapse', 'collapse');
                  accordionCollapse.setAttribute('id', `collapse${index}`);
                  
                  let accordionBody = document.createElement('div');
                  accordionBody.classList.add('accordion-body', 'd-flex', 'justify-content-between', 'align-items-center');

                  // Crear el botón para llamar
                  let llamarButton = document.createElement('button');
                  llamarButton.classList.add('btn', 'btn-secondary', 'small-button', 'me-2');
                  llamarButton.innerHTML = '<i class="bi bi-phone-fill"></i> Llamar';
                  llamarButton.addEventListener("click", function () {
                  llamarContacto(element.telefono); // Función para llamar al contacto
                  });

                  // Crear el botón para enviar un mensaje de WhatsApp
                  let whatsappButton = document.createElement('button');
                  whatsappButton.classList.add('btn', 'btn-success', 'small-button');
                  whatsappButton.innerHTML = '<i class="bi bi-chat-dots-fill"></i> WhatsApp';
                  whatsappButton.addEventListener("click", function () {
                  enviarWhatsApp(element.telefono); // Función para enviar un mensaje de WhatsApp al contacto
                  });

                  let datosContacto = document.createElement('div');
                  datosContacto.innerHTML = `
                        <p><strong>Nombre:</strong> ${element.nombre}</p>
                        <p><strong>Apellido:</strong> ${element.apellido}</p>
                        <p><strong>Teléfono:</strong> ${element.telefono}</p>
                        <p><strong>Email:</strong> ${element.email}</p>
                        <p><strong>Dirección:</strong> ${element.direccion}</p>
                        <p><strong>Ciudad:</strong> ${element.ciudad}</p>
                        `;

                  accordionBody.appendChild(llamarButton);
                  accordionBody.appendChild(datosContacto);
                  accordionBody.appendChild(whatsappButton);
                              
                  if (buttons) {
                        let botonesContacto = document.createElement('div');
                        botonesContacto.classList.add('d-flex', 'align-items-center');

                        let editarButton = document.createElement('a');
                        editarButton.href = "/contactos/" + element.id + "/modificar_contacto";
                        editarButton.classList.add('btn', 'btn-primary', 'small-button', 'me-2');
                        editarButton.innerHTML = '<i class="bi bi-pencil-fill"></i>';
                        editarButton.addEventListener("click", function (event) {
                        event.preventDefault();
                        const contactoID = element.id;
                        window.location.href = `/modificar_contacto.html?id=${contactoID}`;
                        });
      
                        let eliminarButton = document.createElement('button');
                        eliminarButton.type = "button";
                        eliminarButton.classList.add('btn', 'btn-danger', 'small-button');
                        eliminarButton.innerHTML = '<i class="bi bi-x-circle-fill"></i>';
                        eliminarButton.addEventListener("click", function () {
                        SwalFire(element);
                        });
      
                        let btnGroup = document.createElement('div');
                        btnGroup.classList.add('mt-3');
                        btnGroup.appendChild(editarButton);
                        btnGroup.appendChild(eliminarButton);
      
                        botonesContacto.appendChild(editarButton);
                        botonesContacto.appendChild(eliminarButton);

                        accordionBody.appendChild(botonesContacto);
                  }
                  accordionCollapse.appendChild(accordionBody);          
                  accordionItem.appendChild(accordionHeader);
                  accordionItem.appendChild(accordionCollapse);
                  accordionContainer.appendChild(accordionItem);
            });
      }
}
function llamarContacto(numeroTelefono) {
      // Aquí puedes implementar la lógica para realizar la llamada utilizando el número de teléfono proporcionado
      // Por ejemplo:
      window.location.href = `tel:${numeroTelefono}`;
}

function checkPageAndLoadContactos() {
      const currentPath = window.location.pathname;
      if (currentPath.includes("index.html")) {
            GetAllContactos("/contactos", true);
      } else if (currentPath.includes("contactos_eliminados.html")) {
            GetAllContactos("/contactos/eliminados", false);
      }
}
checkPageAndLoadContactos();

// Función para buscar Contactos
function searchContactos() {
      const searchInput = document.getElementById("searchInput").value.toLowerCase();
      const accordionItems = document.querySelectorAll('.accordion-item');
  
      accordionItems.forEach((item) => {
            const accordionButton = item.querySelector('.accordion-button');
  
            if (accordionButton) {
                  const nombreApellido = accordionButton.textContent.toLowerCase();
      
                  // Filtrar elementos del acordeón según la búsqueda
                  if (nombreApellido.includes(searchInput)) {
                        item.style.display = "block"; // Mostrar el elemento del acordeón
                  } else {
                        item.style.display = "none"; // Ocultar el elemento del acordeón
                  }
            }
      });
}
      
document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", function () {
      document.querySelector(".btn-light.dropdown-toggle").textContent = item.textContent;
      searchContactos();
      });
});

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchContactos);

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", searchContactos);

//Funcion para eliminar un contacto.
async function SwalFire(element) {
      Swal.fire({
            title: '¿Estás seguro?',
            text: `Estás a punto de eliminar a ${element.nombre}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            }).then(async (result) => {
            if (result.isConfirmed) {
            try {
                  const response = await axios.delete(`${endpointBase}/contactos/${element.id}`);
                  if (response.status === 200) {
                        Swal.fire('Eliminado', `${element.nombre} ha sido eliminado.`, 'success');
                        window.location.reload();       
                  } else {
                        Swal.fire('Error', 'Hubo un error al eliminar el contacto.', 'error');
                  }
                        } catch (error) {
                              console.error('Error al eliminar el contacto:', error);
                              Swal.fire('Error', 'Hubo un error al eliminar el contacto.', 'error');
                        }                        
            }
      });
}

//Funcion para reactivar un contacto eliminado
async function activarContacto(element) {
      console.log('Activando contacto:', element);
      try {
            const response = await axios.put(`${endpointBase}/contactos/${element.id}`, { activo: true });
            console.log('Respuesta del servidor:', response);
      
            if (response.status === 200) {
                  Swal.fire('Activado', `${element.nombre} ha sido activado.`, 'success');
                  GetAllContactos(); // Recargar la lista de contactos
            } else {
                  Swal.fire('Error', 'Hubo un error al activar el contacto.', 'error');
            }
            } catch (error) {
            console.error('Error al activar el contacto:', error);
            Swal.fire('Error', 'Hubo un error al activar el contacto.', 'error');
      }
}