async function PostUsuarios() {
      console.log("La función PostUsuarios se está ejecutando.");
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const usuario = document.getElementById("usuario").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const permiso_id = document.getElementById("seleccionarPermiso").value;
      
      const nuevoUsuario = {
            nombre,
            apellido,
            usuario,
            email,
            password,
            permiso_id,
            };
      
            try {
            const resp = await axios.post(endpointBase + "/usuarios", nuevoUsuario);
      
            if (resp.status === 200) {
                  console.log("Usuario creado:", resp.data);
                  window.location.href = '/usuarios.html';
            } else {
                  console.error("Error al crear el usuario. Estado de respuesta:", resp.status);
            }
            } catch (error) {
                  console.error("Error al crear el usuario:", error);
            }      
      }
      document.getElementById("guardarUsuarioButton").addEventListener("click", PostUsuarios);

async function loadPermisos() {
      try {
            const response = await axios.get(`${endpointBase}/permisos`); // Ajusta la ruta según tu API
            const selectPermiso = document.getElementById('seleccionarPermiso');
      
            if (response.status === 200) {
                  response.data.forEach(permiso => {
                        const option = document.createElement('option');
                        option.value = permiso.id; // Ajusta el valor según la estructura de tu permiso
                        option.textContent = permiso.nombre; // Ajusta el nombre según la estructura de tu permiso
                        selectPermiso.appendChild(option);
                  });
            } else {
                  console.error('Error al obtener la lista de permisos:', response.statusText);
            }
            } catch (error) {
            console.error('Error al obtener la lista de permisos:', error.message);
      }
}
document.addEventListener('DOMContentLoaded', loadPermisos);