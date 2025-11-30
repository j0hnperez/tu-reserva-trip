// Configuración de la API
const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api/usuarios',
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
  }
};

// Referencias a elementos del DOM
const DOM_ELEMENTS = {
  tablaUsuarios: document.getElementById('tablaUsuarios'),
  usuarioForm: document.getElementById('usuarioForm'),
  inputId: document.getElementById('id_usuario'),
  inputNombre: document.getElementById('nombre'),
  inputApellido: document.getElementById('apellido'),
  inputEmail: document.getElementById('email'),
  inputPassword: document.getElementById('password'),
  selectRol: document.getElementById('rol'),
  btnCancelarEdicion: document.getElementById('cancelarEdicion')
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  inicializarAplicacion();
});

function inicializarAplicacion() {
  cargarUsuarios();
  configurarEventListeners();
}

function configurarEventListeners() {
  DOM_ELEMENTS.usuarioForm.addEventListener('submit', manejarEnvioFormulario);
  DOM_ELEMENTS.btnCancelarEdicion.addEventListener('click', limpiarFormulario);
}

// Obtener lista de usuarios desde la API
function cargarUsuarios() {
  fetch(API_CONFIG.BASE_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(apiResponse => {
      if (apiResponse.success) {
        renderizarTablaUsuarios(apiResponse.data);
      } else {
        mostrarNotificacion('Error al cargar usuarios: ' + apiResponse.message, 'error');
      }
    })
    .catch(error => {
      console.error('Error al cargar usuarios:', error);
      mostrarNotificacion('Error de conexión con el servidor', 'error');
    });
}

// Renderizar la tabla de usuarios
function renderizarTablaUsuarios(usuarios) {
  DOM_ELEMENTS.tablaUsuarios.innerHTML = '';
  
  if (usuarios.length === 0) {
    DOM_ELEMENTS.tablaUsuarios.innerHTML = '<tr><td colspan="6">No hay usuarios registrados</td></tr>';
    return;
  }

  usuarios.forEach(usuario => {
    const filaUsuario = crearFilaUsuario(usuario);
    DOM_ELEMENTS.tablaUsuarios.appendChild(filaUsuario);
  });
}

// Crear una fila para la tabla de usuarios
function crearFilaUsuario(usuario) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${usuario.id_usuario}</td>
    <td>${usuario.nombre}</td>
    <td>${usuario.apellido}</td>
    <td>${usuario.email}</td>
    <td><span class="rol-badge rol-${usuario.rol}">${usuario.rol}</span></td>
    <td class="acciones">
      <button class="btn btn-editar" onclick="editarUsuario(${usuario.id_usuario})" title="Editar usuario">
        ✏️ Editar
      </button>
      <button class="btn btn-eliminar" onclick="eliminarUsuario(${usuario.id_usuario})" title="Eliminar usuario">
        🗑️ Eliminar
      </button>
    </td>
  `;
  return tr;
}

// Manejar envío del formulario (crear o actualizar)
function manejarEnvioFormulario(event) {
  event.preventDefault();

  const usuarioId = DOM_ELEMENTS.inputId.value;
  const usuarioData = obtenerDatosFormulario();

  if (!validarFormulario(usuarioData)) {
    return;
  }

  if (usuarioId) {
    actualizarUsuario(usuarioId, usuarioData);
  } else {
    crearUsuario(usuarioData);
  }
}

// Obtener datos del formulario
function obtenerDatosFormulario() {
  return {
    nombre: DOM_ELEMENTS.inputNombre.value.trim(),
    apellido: DOM_ELEMENTS.inputApellido.value.trim(),
    email: DOM_ELEMENTS.inputEmail.value.trim(),
    password: DOM_ELEMENTS.inputPassword.value,
    rol: DOM_ELEMENTS.selectRol.value
  };
}

// Validar datos del formulario
function validarFormulario(datos) {
  if (!datos.nombre || datos.nombre.length < 2) {
    mostrarNotificacion('El nombre debe tener al menos 2 caracteres', 'error');
    return false;
  }
  if (!datos.apellido || datos.apellido.length < 2) {
    mostrarNotificacion('El apellido debe tener al menos 2 caracteres', 'error');
    return false;
  }
  if (!datos.email || !validarEmail(datos.email)) {
    mostrarNotificacion('Ingrese un email válido', 'error');
    return false;
  }
  if (!DOM_ELEMENTS.inputId.value && (!datos.password || datos.password.length < 6)) {
    mostrarNotificacion('La contraseña debe tener al menos 6 caracteres', 'error');
    return false;
  }
  return true;
}

// Validar formato de email
function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Crear nuevo usuario
function crearUsuario(usuarioData) {
  fetch(API_CONFIG.BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuarioData)
  })
    .then(response => response.json())
    .then(apiResponse => {
      if (apiResponse.success) {
        mostrarNotificacion('Usuario creado exitosamente', 'success');
        limpiarFormulario();
        cargarUsuarios();
      } else {
        mostrarNotificacion('Error al crear usuario: ' + apiResponse.message, 'error');
      }
    })
    .catch(error => {
      console.error('Error al crear usuario:', error);
      mostrarNotificacion('Error de conexión al crear usuario', 'error');
    });
}

// Actualizar usuario existente
function actualizarUsuario(usuarioId, usuarioData) {
  fetch(`${API_CONFIG.BASE_URL}/${usuarioId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuarioData)
  })
    .then(response => response.json())
    .then(apiResponse => {
      if (apiResponse.success) {
        mostrarNotificacion('Usuario actualizado exitosamente', 'success');
        limpiarFormulario();
        cargarUsuarios();
      } else {
        mostrarNotificacion('Error al actualizar usuario: ' + apiResponse.message, 'error');
      }
    })
    .catch(error => {
      console.error('Error al actualizar usuario:', error);
      mostrarNotificacion('Error de conexión al actualizar usuario', 'error');
    });
}

// Cargar datos de usuario para editar
function editarUsuario(usuarioId) {
  fetch(`${API_CONFIG.BASE_URL}/${usuarioId}`)
    .then(response => response.json())
    .then(apiResponse => {
      if (apiResponse.success) {
        rellenarFormularioEdicion(apiResponse.data);
      } else {
        mostrarNotificacion('Error al obtener usuario: ' + apiResponse.message, 'error');
      }
    })
    .catch(error => {
      console.error('Error al obtener usuario:', error);
      mostrarNotificacion('Error de conexión al obtener usuario', 'error');
    });
}

// Rellenar formulario con datos del usuario a editar
function rellenarFormularioEdicion(usuario) {
  DOM_ELEMENTS.inputId.value = usuario.id_usuario;
  DOM_ELEMENTS.inputNombre.value = usuario.nombre;
  DOM_ELEMENTS.inputApellido.value = usuario.apellido;
  DOM_ELEMENTS.inputEmail.value = usuario.email;
  DOM_ELEMENTS.selectRol.value = usuario.rol;
  DOM_ELEMENTS.inputPassword.value = ''; // No mostrar contraseña
  DOM_ELEMENTS.btnCancelarEdicion.style.display = 'inline-block';
}

// Eliminar usuario
function eliminarUsuario(usuarioId) {
  if (!confirm('¿Está seguro que desea eliminar este usuario? Esta acción no se puede deshacer.')) {
    return;
  }

  fetch(`${API_CONFIG.BASE_URL}/${usuarioId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(apiResponse => {
      if (apiResponse.success) {
        mostrarNotificacion('Usuario eliminado exitosamente', 'success');
        cargarUsuarios();
      } else {
        mostrarNotificacion('Error al eliminar usuario: ' + apiResponse.message, 'error');
      }
    })
    .catch(error => {
      console.error('Error al eliminar usuario:', error);
      mostrarNotificacion('Error de conexión al eliminar usuario', 'error');
    });
}

// Limpiar formulario
function limpiarFormulario() {
  DOM_ELEMENTS.inputId.value = '';
  DOM_ELEMENTS.inputNombre.value = '';
  DOM_ELEMENTS.inputApellido.value = '';
  DOM_ELEMENTS.inputEmail.value = '';
  DOM_ELEMENTS.inputPassword.value = '';
  DOM_ELEMENTS.selectRol.value = 'vendedor';
  DOM_ELEMENTS.btnCancelarEdicion.style.display = 'none';
}

// Sistema de notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
  // Crear elemento de notificación
  const notificacion = document.createElement('div');
  notificacion.className = `notificacion notificacion-${tipo}`;
  notificacion.textContent = mensaje;
  
  // Estilos para la notificación
  Object.assign(notificacion.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '4px',
    color: 'white',
    fontWeight: 'bold',
    zIndex: '1000',
    opacity: '0',
    transform: 'translateX(100%)',
    transition: 'all 0.3s ease'
  });
  
  // Color según tipo
  const colores = {
    success: '#28a745',
    error: '#dc3545',
    info: '#17a2b8',
    warning: '#ffc107'
  };
  notificacion.style.backgroundColor = colores[tipo] || colores.info;
  
  // Agregar al DOM
  document.body.appendChild(notificacion);
  
  // Animar entrada
  setTimeout(() => {
    notificacion.style.opacity = '1';
    notificacion.style.transform = 'translateX(0)';
  }, 100);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notificacion.style.opacity = '0';
    notificacion.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notificacion.parentNode) {
        notificacion.parentNode.removeChild(notificacion);
      }
    }, 300);
  }, 3000);
}