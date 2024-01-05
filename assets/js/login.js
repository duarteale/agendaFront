/*document.addEventListener('DOMContentLoaded', function () {
      const loginForm = document.getElementById('loginForm');

      loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
            const usuario = document.getElementById('usuario').value;
            const password = document.getElementById('password').value;
      
            fetch(endpointBase + '/usuarios/login', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ usuario, password }),
            })
            .then(response => {
                  if (!response.ok) {
                        throw new Error('Usuario o contraseña incorrectos');
                  }
                  return response.json();
            })
            .then(data => {
                  console.log('Inicio de sesión exitoso:', data);
      
                  // Por ejemplo, redirigir a otra página después del inicio de sesión exitoso
                  window.location.href = 'index.html';
            })
            .catch(error => {
                  alert(error.message);
                  window.location.href = 'error.html';
            });
      });
}); */ 

document.addEventListener("DOMContentLoaded", function() {

      async function login(event) {
            event.preventDefault();
      
            const usuario = document.getElementById("usuario").value;
            const password = document.getElementById("password").value;
      
            try {
            const response = await fetch(endpointBase + '/usuarios/login', {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                  "usuario": usuario,
                  "password": password
                  })
            });
      
            if (response.ok) {
                  const data = await response.json();
                  console.log(data); // Manejar la respuesta exitosa del inicio de sesión
                  sessionStorage.setItem("data", JSON.stringify(data));
                  window.location.href = '/index.html'; // Redirigir a la página deseada
            } else {
                  console.error('Error en la solicitud:', response.status);
                  window.location.href = '/error.html'; // Página de error
            }
            } catch (error) {
            console.error('Error:', error);
            window.location.href = '/error.html'; // Página de error
            }
            }
      
            const loginForm = document.getElementById("loginForm");
            if (loginForm) {
            loginForm.addEventListener("submit", login);
            }
}); 