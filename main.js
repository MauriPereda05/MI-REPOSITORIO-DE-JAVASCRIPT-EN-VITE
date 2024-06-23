import './style2.css'

document.addEventListener('DOMContentLoaded', function() {
    const tablaUsuarios = document.querySelector('#tabla-users tbody');
    const form = document.querySelector('.formulario');
  
    function cargarUsuarios() {
      fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
          tablaUsuarios.innerHTML = ''; 
  
          data.forEach(user => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.fechaNacimiento}</td>
              <td>
                <button class="eliminar" data-id="${user.id}">Eliminar</button>
              </td>
            `;
            tablaUsuarios.appendChild(newRow);
          });
        })
        .catch(error => console.error('Error al cargar usuarios:', error));
    }
  
    cargarUsuarios();
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const nombre = document.querySelector('#nombre').value.trim();
      const correo = document.querySelector('#correo').value.trim();
      const fechaNacimiento = document.querySelector('#fechaNacimiento').value;
  
      if (nombre === '' || correo === '' || fechaNacimiento === '') {
        console.error('Por favor completa todos los campos.');
        return;
      }
  
      const nuevoUsuario = {
        name: nombre,
        email: correo,
        fechaNacimiento: fechaNacimiento
      };
  
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      })
      .then(response => response.json())
      .then(data => {
    
        cargarUsuarios();
      })
      .catch(error => console.error('Error al guardar usuario:', error));
  
     
      form.reset();
});
  
    // Evento delegado para eliminar un usuario
    tablaUsuarios.addEventListener('click', function(event) {
      if (event.target.classList.contains('eliminar')) {
        const userId = event.target.getAttribute('data-id');
  
        // Eliminar el usuario del servidor JSON (usar fetch con método DELETE)
        fetch(`http://localhost:3000/users/${userId}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (response.ok) {
            // Si se elimina correctamente del servidor, también eliminar visualmente de la tabla
            event.target.closest('tr').remove();
          } else {
            throw new Error('Error al eliminar usuario');
          }
        })
        .catch(error => console.error('Error al eliminar usuario:', error));
      }
    });
  
  });
  