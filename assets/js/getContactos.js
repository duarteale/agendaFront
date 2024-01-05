const urlParams = new URLSearchParams(window.location.search);
const contactoID = urlParams.get("id");

// Realiza una solicitud para obtener los datos del contacto con el ID proporcionado
async function obtenerContacto() {
      try {
            const resp = await axios.get(endpointBase + '/contactos/' + contactoID);

            if (resp.status === 200) {
                  const contacto = resp.data;
                  document.getElementById('nombre').value = contacto.nombre;
                  document.getElementById('apellido').value = contacto.apellido;
                  document.getElementById('telefono').value = contacto.telefono;
                  document.getElementById('email').value = contacto.email;
                  document.getElementById('direccion').value = contacto.direccion;
                  document.getElementById('ciudad').value = contacto.ciudad;
            }
      } catch (error) {
            console.error("Error al obtener el contacto:", error);
      }
}

// Llama a la función para obtener el contacto cuando se cargue la página
window.addEventListener('load', obtenerContacto);
