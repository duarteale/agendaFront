async function PostContactos() {
      console.log("La función Postcontactos se está ejecutando.");
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const telefono = document.getElementById("telefono").value;
      const email = document.getElementById("email").value;
      const direccion = document.getElementById("direccion").value;
      const ciudad = document.getElementById("ciudad").value;
      
      const nuevoContacto = {
            nombre,
            apellido,
            telefono,
            email,
            direccion,
            ciudad,
            };
      
            try {
            const resp = await axios.post(endpointBase + "/contactos", nuevoContacto);
      
            if (resp.status === 200) {
                  console.log("Contacto creado:", resp.data);
                  window.location.href = "/index.html";         
            } else {
                  console.error("Error al crear el Contacto. Estado de respuesta:", resp.status);
            }
            } catch (error) {
                  console.error("Error al crear el Contacto:", error);
            }      
      }
      document.getElementById("guardarContactoButton").addEventListener("click", PostContactos);