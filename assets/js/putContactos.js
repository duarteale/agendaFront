async function PutContactos() {
      console.log("La función PutContactos se está ejecutando.");
      
      try {
            const urlParams = new URLSearchParams(window.location.search);
            const contactoID = urlParams.get("id");
      
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const telefono = document.getElementById("telefono").value;
            const email = document.getElementById("email").value;
            const direccion = document.getElementById("direccion").value;
            const ciudad = document.getElementById("ciudad").value;
      
            const contactoActualizado = {
                  nombre,
                  apellido,
                  telefono,
                  email,
                  direccion,
                  ciudad,
            };
      
            const resp = await axios.put(endpointBase + "/contactos/" + contactoID, contactoActualizado);
      
            if (resp.status === 200) {
                  console.log("Contacto actualizado:", resp.data);
                  window.location.href = "/index.html";
            } else {
                  console.error("Error al actualizar el contacto. Estado de respuesta:", resp.status);
                  // Manejar el error de manera apropiada, puedes mostrar un mensaje al usuario, etc.
                  alert("Error al actualizar el contacto. Por favor, inténtalo de nuevo.");
            }
            } catch (error) {
            console.error("Error al actualizar el contacto:", error);
      
            // Manejar el error de manera apropiada, puedes mostrar un mensaje al usuario, etc.
            alert("Error al actualizar el contacto. Por favor, inténtalo de nuevo.");
      }
}

document.getElementById("editarContactoBtn").addEventListener("click", PutContactos);
