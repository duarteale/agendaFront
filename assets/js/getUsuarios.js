const urlParams = new URLSearchParams(window.location.search);
const usuarioID = urlParams.get("id");

// Realiza una solicitud para obtener los datos del usuario con el ID proporcionado
async function obtenerUsuario() {
      try {
            const resp = await axios.get(endpointBase + '/usuarios/' + usuarioID);

            if (resp.status === 200) {
                  const usuario = resp.data;
                  document.getElementById('nombre').value = usuario.nombre;
                  document.getElementById('apellido').value = usuario.apellido;
                  document.getElementById('usuario').value = usuario.usuario;
                  document.getElementById('email').value = usuario.email;
                  document.getElementById('password').value = usuario.password;
            }
      } catch (error) {
            console.error("Error al obtener el usuario:", error);
      }
}

// Llama a la función para obtener el usuario cuando se cargue la página
window.addEventListener('load', obtenerUsuario);