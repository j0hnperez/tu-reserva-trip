const UsuarioModel = require('../models/usuarioModel');

const UsuarioController = {
  // Crear un nuevo usuario
  crearUsuario: (request, response) => {
    const nuevoUsuario = {
      nombre: request.body.nombre,
      apellido: request.body.apellido,
      email: request.body.email,
      password: request.body.password,
      rol: request.body.rol || 'vendedor'
    };

    UsuarioModel.crearUsuario(nuevoUsuario, (error, result) => {
      if (error) {
        console.error('Error al crear usuario:', error);
        return response.status(500).json({ 
          success: false,
          message: 'Error al crear usuario',
          error: error.message 
        });
      }
      response.status(201).json({ 
        success: true,
        message: 'Usuario creado exitosamente', 
        data: { id: result.insertId }
      });
    });
  },

  // Listar todos los usuarios
  listarUsuarios: (request, response) => {
    UsuarioModel.obtenerUsuarios((error, usuarios) => {
      if (error) {
        console.error('Error al obtener usuarios:', error);
        return response.status(500).json({ 
          success: false,
          message: 'Error al obtener usuarios',
          error: error.message 
        });
      }
      response.status(200).json({
        success: true,
        message: 'Usuarios obtenidos exitosamente',
        data: usuarios,
        count: usuarios.length
      });
    });
  },

  // Obtener un usuario por su ID
  obtenerUsuarioPorId: (request, response) => {
    const usuarioId = request.params.id;
    
    if (!usuarioId || isNaN(usuarioId)) {
      return response.status(400).json({
        success: false,
        message: 'ID de usuario inválido'
      });
    }

    UsuarioModel.obtenerUsuarioPorId(usuarioId, (error, usuarios) => {
      if (error) {
        console.error('Error al obtener usuario:', error);
        return response.status(500).json({ 
          success: false,
          message: 'Error al obtener usuario',
          error: error.message 
        });
      }
      if (usuarios.length === 0) {
        return response.status(404).json({ 
          success: false,
          message: 'Usuario no encontrado' 
        });
      }
      response.status(200).json({
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: usuarios[0]
      });
    });
  },

  // Actualizar datos de un usuario existente
  actualizarUsuario: (request, response) => {
    const usuarioId = request.params.id;
    const datosActualizados = {
      nombre: request.body.nombre,
      apellido: request.body.apellido,
      email: request.body.email,
      rol: request.body.rol
    };

    // Validar que el ID sea válido
    if (!usuarioId || isNaN(usuarioId)) {
      return response.status(400).json({
        success: false,
        message: 'ID de usuario inválido'
      });
    }

    UsuarioModel.actualizarUsuario(usuarioId, datosActualizados, (error) => {
      if (error) {
        console.error('Error al actualizar usuario:', error);
        return response.status(500).json({ 
          success: false,
          message: 'Error al actualizar usuario',
          error: error.message 
        });
      }
      response.status(200).json({ 
        success: true,
        message: 'Usuario actualizado exitosamente' 
      });
    });
  },

  // Eliminar un usuario existente
  eliminarUsuario: (request, response) => {
    const usuarioId = request.params.id;

    // Validar que el ID sea válido
    if (!usuarioId || isNaN(usuarioId)) {
      return response.status(400).json({
        success: false,
        message: 'ID de usuario inválido'
      });
    }

    UsuarioModel.eliminarUsuario(usuarioId, (error) => {
      if (error) {
        console.error('Error al eliminar usuario:', error);
        return response.status(500).json({ 
          success: false,
          message: 'Error al eliminar usuario',
          error: error.message 
        });
      }
      response.status(200).json({ 
        success: true,
        message: 'Usuario eliminado exitosamente' 
      });
    });
  }
};

module.exports = UsuarioController;