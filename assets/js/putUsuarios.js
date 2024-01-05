async function PutUsuarios() {
      console.log("La función PutUsuarios se está ejecutando.");
      try {
            const urlParams = new URLSearchParams(window.location.search);
            const usuarioID = urlParams.get("id");
      
            // Recopila los datos modificados del usuario
            const usuario = document.getElementById("usuario").value;
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;            
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const permiso_id = document.getElementById("permiso_id").value;
      
            const usuarioActualizado = {
                  usuario,
                  nombre,
                  apellido,                  
                  email,
                  password,
                  permiso_id,
            };
      
            const resp = await axios.put(endpointBase + "/usuarios/" + usuarioID, usuarioActualizado);
      
            if (resp.status === 200) {
                  console.log("Usuario actualizado:", resp.data);
                  window.location.href = "/usuarios.html";
            } else {
                  console.error("Error al actualizar el Usuario. Estado de respuesta:", resp.status);
                  // Manejar el error de manera apropiada, puedes mostrar un mensaje al usuario, etc.
                  alert("Error al actualizar el Usuario. Por favor, inténtalo de nuevo.");
            }
            } catch (error) {
            console.error("Error al actualizar el Usuario:", error);
      
            // Manejar el error de manera apropiada, puedes mostrar un mensaje al usuario, etc.
            alert("Error al actualizar el Usuario. Por favor, inténtalo de nuevo.");
      }
}

document.getElementById("editarUsuarioBtn").addEventListener("click", PutUsuarios);
