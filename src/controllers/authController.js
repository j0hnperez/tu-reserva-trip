const UsuarioModel = require('../models/usuarioModel');

const AuthController = {
  // GET: Mostrar formulario de login TRT (equivalente a servlet doGet)
  mostrarLoginTRT: (req, res) => {
    res.render('main-trt', {
      title: 'Login - Ventas TRT',
      error: req.query.error || null,
      success: req.query.success || null,
      email: req.query.email || null,
      role: req.query.role || null,
      usuario: req.session.usuario || null
    });
  },

  // GET: Mostrar formulario de registro TRT
  mostrarRegistroTRT: (req, res) => {
    res.render('registro-trt', {
      title: 'Registro - Ventas TRT',
      error: req.query.error || null,
      datos: req.query.datos ? JSON.parse(req.query.datos) : null
    });
  },

  // POST: Procesar login (equivalente a servlet doPost)
  procesarLogin: (req, res) => {
    const { email, password, role } = req.body;
    
    // Validar datos de entrada
    if (!email || !password || !role) {
      return res.render('main-trt', {
        title: 'Login - Ventas TRT',
        error: 'Todos los campos son requeridos',
        email: email,
        role: role,
        usuario: null,
        success: null
      });
    }

    UsuarioModel.obtenerUsuarioPorEmailYRol(email, role.toLowerCase(), (error, usuarios) => {
      if (error) {
        console.error('Error en autenticación:', error);
        return res.render('main-trt', {
          title: 'Login - Ventas TRT',
          error: 'Error en el servidor. Intente nuevamente.',
          email: email,
          role: role,
          usuario: null,
          success: null
        });
      }
      
      if (usuarios.length === 0) {
        return res.render('main-trt', {
          title: 'Login - Ventas TRT',
          error: 'Credenciales inválidas',
          email: email,
          role: role,
          usuario: null,
          success: null
        });
      }

      const usuario = usuarios[0];
      
      // Verificar contraseña (en producción usar hash)
      if (usuario.password !== password) {
        return res.render('main-trt', {
          title: 'Login - Ventas TRT',
          error: 'Credenciales inválidas',
          email: email,
          role: role,
          usuario: null,
          success: null
        });
      }

      // Usuario autenticado exitosamente - guardar en sesión
      req.session.usuario = {
        id: usuario.id_usuario,
        name: usuario.nombre,
        lastName: usuario.apellido,
        email: usuario.email,
        role: usuario.rol.toUpperCase(),
        avatar: usuario.avatar || 'https://placehold.co/40x40'
      };

      // Redirigir al dashboard según el rol
      if (usuario.rol === 'admin') {
        res.redirect('/trt/dashboard');
      } else {
        res.redirect('/trt/dashboard');
      }
    });
  },

  // POST: Procesar registro
  procesarRegistro: (req, res) => {
    const nuevoUsuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol ? req.body.rol.toLowerCase() : 'vendedor'
    };

    // Validar datos
    if (!nuevoUsuario.nombre || !nuevoUsuario.apellido || !nuevoUsuario.email || !nuevoUsuario.password) {
      return res.render('registro-trt', {
        title: 'Registro - Ventas TRT',
        error: 'Todos los campos son requeridos',
        datos: nuevoUsuario
      });
    }

    UsuarioModel.crearUsuario(nuevoUsuario, (error, result) => {
      if (error) {
        console.error('Error al crear usuario:', error);
        return res.render('main-trt', {
          title: 'Login - Ventas TRT',
          error: 'Error al crear usuario. El email podría ya existir.',
          email: nuevoUsuario.email,
          usuario: null,
          success: null
        });
      }
      
      res.render('main-trt', {
        title: 'Login - Ventas TRT',
        success: 'Usuario creado exitosamente. Ahora puede iniciar sesión.',
        email: nuevoUsuario.email,
        usuario: null,
        error: null
      });
    });
  },

  // GET: Cerrar sesión
  cerrarSesion: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
      }
      res.redirect('/auth/login?success=Sesión cerrada correctamente');
    });
  }
};

module.exports = AuthController;
