const UsuarioModel = require('../models/usuarioModel');

const UsuarioController = {
  // Autenticar usuario (login)
  loginUsuario: (request, response) => {
    const { email, password, role } = request.body;
    
    // Validar datos de entrada
    if (!email || !password || !role) {
      return response.status(400).json({
        success: false,
        message: 'Faltan datos requeridos: email, password, role'
      });
    }

    UsuarioModel.obtenerUsuarioPorEmailYRol(email, role.toLowerCase(), (error, usuarios) => {
      if (error) {
        console.error('Error en autenticación:', error);
        return response.status(500).json({ 
          success: false,
          message: 'Error en el servidor',
          error: error.message 
        });
      }
      
      if (usuarios.length === 0) {
        return response.status(401).json({ 
          success: false,
          message: 'Credenciales inválidas' 
        });
      }

      const usuario = usuarios[0];
      
      // Verificar contraseña (en producción usar hash)
      if (usuario.password !== password) {
        return response.status(401).json({ 
          success: false,
          message: 'Credenciales inválidas' 
        });
      }

      // Usuario autenticado exitosamente
      response.status(200).json({ 
        success: true,
        message: 'Autenticación exitosa',
        data: {
          id: usuario.id_usuario,
          name: usuario.nombre,
          lastName: usuario.apellido,
          email: usuario.email,
          role: usuario.rol.toUpperCase(),
          avatar: usuario.avatar || 'https://placehold.co/40x40'
        }
      });
    });
  },
  // Crear un nuevo usuario
  crearUsuario: (request, response) => {
    console.log('🔍 Backend - Request body:', request.body);
    const nuevoUsuario = {
      nombre: request.body.nombre,
      apellido: request.body.apellido,
      email: request.body.email,
      password: request.body.password,
      rol: request.body.rol ? request.body.rol.toLowerCase() : 'vendedor'
    };
    
    console.log('🔍 Backend - Usuario a crear:', nuevoUsuario);

    UsuarioModel.crearUsuario(nuevoUsuario, async (error, result) => {
      if (error) {
        console.error('Error al crear usuario:', error);
        return response.status(500).json({ 
          success: false,
          message: 'Error al crear usuario',
          error: error.message 
        });
      }
      
      // Obtener el usuario creado para devolverlo completo
      UsuarioModel.obtenerUsuarioPorId(result.insertId, (error, usuarios) => {
        if (error || usuarios.length === 0) {
          return response.status(201).json({ 
            success: true,
            message: 'Usuario creado exitosamente', 
            data: { id: result.insertId }
          });
        }
        
        const usuarioCreado = usuarios[0];
        response.status(201).json({ 
          success: true,
          message: 'Usuario creado exitosamente', 
          data: {
            id: usuarioCreado.id_usuario,
            name: usuarioCreado.nombre,
            lastName: usuarioCreado.apellido,
            email: usuarioCreado.email,
            role: usuarioCreado.rol.toUpperCase(),
            avatar: usuarioCreado.avatar || 'https://placehold.co/40x40'
          }
        });
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
  },

  // Obtener usuario por email y rol (para login)
  obtenerUsuarioPorEmail: (request, response) => {
    const { email } = request.params;
    
    if (!email) {
      return response.status(400).json({
        success: false,
        message: 'Email es requerido'
      });
    }

    UsuarioModel.obtenerUsuarioPorEmail(email, (error, usuarios) => {
      if (error) {
        console.error('Error al obtener usuario por email:', error);
        return response.status(500).json({ 
          success: false,
          message: 'Error al obtener usuario',
          error: error.message 
        });
      }
      
      response.status(200).json({
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: usuarios
      });
    });
  }
};

module.exports = UsuarioController;