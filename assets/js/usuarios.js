async function GetAllUsuarios(ruta,buttons) {
      const resp = await axios.get(endpointBase + ruta);
      if (resp.status === 200) {        
            let miTabla = document.getElementById('tableBodyUsers');
            resp.data.forEach(element => {
                  let fila = document.createElement('tr');

                  let celda1 = document.createElement('td');
                  celda1.textContent = element.nombre;
                  fila.appendChild(celda1);

                  let celda2 = document.createElement('td');
                  celda2.textContent = element.apellido;
                  fila.appendChild(celda2);

                  let celda3 = document.createElement('td');
                  celda3.textContent = element.usuario;
                  fila.appendChild(celda3);

                  let celda4 = document.createElement('td');
                  celda4.textContent = element.email;
                  fila.appendChild(celda4);

                  let celdaAcciones = document.createElement('td');
                  if (buttons){
                        //Boton Editar
                        let editarButton = document.createElement('a');
                        editarButton.href = "/usuarios/" + element.id + "/modificarUsuario";
                        editarButton.className = "btn btn-primary small-button";
                        editarButton.innerHTML = '<i class="bi bi-pencil-fill"></i>';
                        editarButton.addEventListener("click", function (event) {
                              event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
                              const usuarioID = element.id;
                              window.location.href = `/modificarUsuario.html?id=${usuarioID}`;
                        });
                        celdaAcciones.appendChild(editarButton);
                        //Boton Eliminar
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
                        // Llama a la función para activar el usuario con el elemento actual
                        activarUsuario(element);
                        });
                        celdaAcciones.appendChild(activarButton);
                  }     
                  fila.appendChild(celdaAcciones);
                  miTabla.appendChild(fila);
            });            
      }
}
function checkPageAndLoadUsuarios() {
      const currentPath = window.location.pathname;
      if (currentPath.includes("usuarios.html")) {
            GetAllUsuarios("/usuarios", true);
      } else if (currentPath.includes("usuariosEliminados.html")) {
            GetAllUsuarios("/usuarios/eliminados", false);
      }
}
checkPageAndLoadUsuarios();

// Función para buscar Usuarios
function searchUsuarios() {
      const searchInput = document.getElementById("searchInput").value.toLowerCase();
      const tableRows = document.querySelectorAll("#tableBodyUsers tr");
      
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
            searchUsuarios();
      });
});
      
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchUsuarios);
//Los comandos de abajo, hacen que la busqueda sea incremental
searchInput.addEventListener("input", function () {
      searchUsuarios();
});

function showAllUsuarios() {
      const tableRows = document.querySelectorAll("#tableBodyUsuarios tr");
      tableRows.forEach((row) => {
            row.style.display = "table-row";
      });
}


//Funcion para eliminar un usuario.
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
                  const response = await axios.delete(`${endpointBase}/usuarios/${element.id}`);
                  if (response.status === 200) {
                        Swal.fire('Eliminado', `${element.nombre} ha sido eliminado.`, 'success');
                        window.location.reload();       
                  } else {
                        Swal.fire('Error', 'Hubo un error al eliminar el usuario.', 'error');
                  }
                        } catch (error) {
                              console.error('Error al eliminar el usuario:', error);
                              Swal.fire('Error', 'Hubo un error al eliminar el usuario.', 'error');
                        }                        
            }
      });
}


//Funcion para reactivar un usuario eliminado
async function activarUsuario(element) {
      console.log('Activando Usuario:', element);
      try {
            const data = {
            usuario: element.usuario,
            nombre: element.nombre,
            apellido: element.apellido,
            email: element.email,
            activo: true
            };
      
            const response = await axios.put(`${endpointBase}/usuarios/${element.id}`, data);
            console.log('Respuesta del servidor:', response);
      
            if (response.status === 200) {
                Swal.fire('Activado', `${element.nombre} ha sido activado.`, 'success');
                GetAllUsuarios("/usuarios/eliminados", false); // Recargar la lista de usuarios eliminados
            } else {
                  Swal.fire('Error', 'Hubo un error al activar el usuario.', 'error');
            }
            } catch (error) {
                console.error('Error al activar el usuario:', error);
                Swal.fire('Error', 'Hubo un error al activar el usuario.', 'error');
      }
}