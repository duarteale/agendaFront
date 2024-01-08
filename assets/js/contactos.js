async function GetAllContactos(ruta,buttons) {
      const resp = await axios.get(endpointBase + ruta);
      if (resp.status === 200) {
            let ciudadesUnicas = new Set();
            let miTabla = document.getElementById('tableBodyContactos');
            resp.data.forEach(element => {
                  ciudadesUnicas.add(element.ciudad);
                  let fila = document.createElement('tr');

                  let celda1 = document.createElement('td');
                  celda1.textContent = element.nombre;
                  fila.appendChild(celda1);

                  let celda2 = document.createElement('td');
                  celda2.textContent = element.apellido;
                  fila.appendChild(celda2);

                  let celda3 = document.createElement('td');
                  celda3.textContent = element.telefono;
                  fila.appendChild(celda3);

                  let celda4 = document.createElement('td');
                  celda4.textContent = element.email;
                  fila.appendChild(celda4);

                  let celda5 = document.createElement('td');
                  celda5.textContent = element.direccion;
                  fila.appendChild(celda5);

                  let celda6 = document.createElement('td');
                  celda6.textContent = element.ciudad;
                  fila.appendChild(celda6);

                  let celdaAcciones = document.createElement('td');
                  if (buttons){
                        //Boton de Editar
                        let editarButton = document.createElement('a');
                        editarButton.href = "/contactos/" + element.id + "/modificar_contacto";
                        editarButton.className = "btn btn-primary small-button";
                        editarButton.innerHTML = '<i class="bi bi-pencil-fill"></i>';
                        editarButton.addEventListener("click", function (event) {
                              event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
                              const contactoID = element.id;
                              window.location.href = `/modificar_contacto.html?id=${contactoID}`;
                        });
                        celdaAcciones.appendChild(editarButton);
                        //Boton de Eliminar
                        let eliminarButton = document.createElement('button');
                        eliminarButton.type = "button";
                        eliminarButton.className = "btn btn-danger small-button";                        
                        eliminarButton.innerHTML = '<i class="bi bi-x-circle-fill"></i>';
                        eliminarButton.addEventListener("click", function () {
                              // Llama a la función SwalFire con el elemento actual
                              SwalFire(element);                        
                        });
                        celdaAcciones.appendChild(eliminarButton);
                  }else{
                        //Boton de Activar inactivos
                        let activarButton = document.createElement('button');
                        activarButton.type = "button";
                        activarButton.className = "btn btn-warning small-button";
                        activarButton.innerHTML = '<i class="bi bi-play-fill"></i>';
                        activarButton.addEventListener("click", function () {
                        // Llama a la función para activar el contacto con el elemento actual
                        activarContacto(element);
                        });
                        celdaAcciones.appendChild(activarButton);
                  }
                  fila.appendChild(celdaAcciones);
                  miTabla.appendChild(fila);
            });
            buildDropdownMenu(ciudadesUnicas);
      }
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
      const tableRows = document.querySelectorAll("#tableBodyContactos tr");
      
            tableRows.forEach((row) => {
            const nombre = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
      
            if (nombre.includes(searchInput)) {
            row.style.display = "table-row";
            } else {
            row.style.display = "none";
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
//Los comandos de abajo, hacen que la busqueda sea incremental
searchInput.addEventListener("input", function () {
      searchContactos();
});

function buildDropdownMenu(ciudades) {
      const ciudadMenu = document.getElementById('ciudadMenu');
      ciudadMenu.innerHTML = '';
      const mostrarTodosItem = document.createElement('a');
      mostrarTodosItem.classList.add('dropdown-item');
      mostrarTodosItem.href = '#';
      mostrarTodosItem.textContent = 'Mostrar Todos';

      mostrarTodosItem.style.color = '#7D13C0';

      mostrarTodosItem.addEventListener('click', function () {
            document.querySelector(".btn-light.dropdown-toggle").textContent = 'Ciudad';
            showAllContactos(); // Función para mostrar todos los contactos
      });
      ciudadMenu.appendChild(mostrarTodosItem);

      ciudades.forEach(ciudad => {
            const ciudadItem = document.createElement('a');
            ciudadItem.classList.add('dropdown-item');
            ciudadItem.href = '#';
            ciudadItem.textContent = ciudad;

            ciudadItem.style.color = '#7D13C0';
      
            ciudadItem.addEventListener('click', function () {
            document.querySelector(".btn-light.dropdown-toggle").textContent = ciudad;
            filterContactosByCiudad(ciudad); // Paso 3
            });
      
            ciudadMenu.appendChild(ciudadItem);
      });
}
function showAllContactos() {
      const tableRows = document.querySelectorAll("#tableBodyContactos tr");
      tableRows.forEach((row) => {
            row.style.display = "table-row";
      });
}

function filterContactosByCiudad(ciudadSeleccionada) {
      const tableRows = document.querySelectorAll("#tableBodyContactos tr");
      tableRows.forEach((row) => {
            const ciudad = row.querySelector("td:nth-child(6)").textContent;
      
            if (ciudadSeleccionada === 'Ciudad' || ciudad === ciudadSeleccionada) {
            row.style.display = "table-row";
            } else {
            row.style.display = "none";
            }
      });
}


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