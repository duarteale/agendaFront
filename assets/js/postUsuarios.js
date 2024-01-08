function setFocusOnLoad() {
      const primerInput = document.getElementById('usuario');
      if (primerInput) {
            primerInput.focus();
            }
      }

document.addEventListener('DOMContentLoaded', setFocusOnLoad);
window.addEventListener('load', setFocusOnLoad);
      

async function PostUsuarios() {
      console.log("La función PostUsuarios se está ejecutando.");
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const usuario = document.getElementById("usuario").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
      const nuevoUsuario = {
            nombre,
            apellido,
            usuario,
            email,
            password,
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