const UsuarioModel = require('../models/usuarioModel');

const TRTController = {
  // GET: Mostrar módulo de usuarios
  mostrarUsuarios: async (req, res) => {
    try {
      UsuarioModel.obtenerUsuarios((error, usuarios) => {
        if (error) {
          return res.render('trt-usuarios', {
            title: 'Gestión de Usuarios - TRT',
            usuario: req.session.usuario,
            error: 'Error al cargar usuarios',
            usuarios: []
          });
        }
        
        res.render('trt-usuarios', {
          title: 'Gestión de Usuarios - TRT',
          usuario: req.session.usuario,
          usuarios: usuarios,
          success: req.query.success || null,
          error: req.query.error || null
        });
      });
    } catch (error) {
      console.error('Error en mostrarUsuarios:', error);
      res.render('trt-usuarios', {
        title: 'Gestión de Usuarios - TRT',
        usuario: req.session.usuario,
        error: 'Error del servidor',
        usuarios: []
      });
    }
  },

  // GET: Mostrar módulo de ventas
  mostrarVentas: async (req, res) => {
    try {
      // Simulación de datos de ventas (deberías crear un modelo de ventas)
      const ventasSimuladas = [
        {
          id: 1,
          reservationCode: 'VT001',
          saleDate: new Date().toISOString(),
          clientName: 'Juan Pérez',
          saleAmount: 1200.00,
          commission: 360.00,
          advisorName: 'Carlos López'
        },
        {
          id: 2,
          reservationCode: 'VT002',
          saleDate: new Date().toISOString(),
          clientName: 'María García',
          saleAmount: 2500.00,
          commission: 750.00,
          advisorName: 'Ana Martínez'
        }
      ];
      
      res.render('trt-ventas', {
        title: 'Gestión de Ventas - TRT',
        usuario: req.session.usuario,
        ventas: ventasSimuladas,
        success: req.query.success || null,
        error: req.query.error || null
      });
    } catch (error) {
      console.error('Error en mostrarVentas:', error);
      res.render('trt-ventas', {
        title: 'Gestión de Ventas - TRT',
        usuario: req.session.usuario,
        error: 'Error del servidor',
        ventas: []
      });
    }
  },

  // POST: Crear nuevo usuario
  crearUsuario: (req, res) => {
    const nuevoUsuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol || 'vendedor'
    };

    UsuarioModel.crearUsuario(nuevoUsuario, (error, result) => {
      if (error) {
        console.error('Error al crear usuario:', error);
        return res.redirect('/trt/usuarios?error=Error al crear usuario');
      }
      
      res.redirect('/trt/usuarios?success=Usuario creado exitosamente');
    });
  },

  // POST: Actualizar usuario
  actualizarUsuario: (req, res) => {
    const usuarioId = req.params.id;
    const datosActualizados = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      rol: req.body.rol
    };

    UsuarioModel.actualizarUsuario(usuarioId, datosActualizados, (error) => {
      if (error) {
        console.error('Error al actualizar usuario:', error);
        return res.redirect('/trt/usuarios?error=Error al actualizar usuario');
      }
      
      res.redirect('/trt/usuarios?success=Usuario actualizado exitosamente');
    });
  },

  // POST: Eliminar usuario
  eliminarUsuario: (req, res) => {
    const usuarioId = req.params.id;

    UsuarioModel.eliminarUsuario(usuarioId, (error) => {
      if (error) {
        console.error('Error al eliminar usuario:', error);
        return res.redirect('/trt/usuarios?error=Error al eliminar usuario');
      }
      
      res.redirect('/trt/usuarios?success=Usuario eliminado exitosamente');
    });
  },

  // POST: Crear nueva venta
  crearVenta: (req, res) => {
    const nuevaVenta = {
      reservationCode: req.body.reservationCode,
      clientName: req.body.clientName,
      saleAmount: parseFloat(req.body.saleAmount),
      commission: parseFloat(req.body.saleAmount) * 0.3, // 30% de comisión
      advisorName: req.body.advisorName,
      saleDate: new Date().toISOString()
    };

    // Simulación - en producción deberías guardar en base de datos
    console.log('Venta creada:', nuevaVenta);
    
    res.redirect('/trt/ventas?success=Venta creada exitosamente');
  },

  // GET: Mostrar reportes
  mostrarReportes: async (req, res) => {
    try {
      // Simulación de datos de reportes
      const reportes = {
        totalVentas: 45231.50,
        totalUsuarios: 1234,
        ventasMes: 15670.00,
        comisionesMes: 4701.00
      };
      
      res.render('trt-reportes', {
        title: 'Reportes - TRT',
        usuario: req.session.usuario,
        reportes: reportes,
        error: req.query.error || null
      });
    } catch (error) {
      console.error('Error en mostrarReportes:', error);
      res.render('trt-reportes', {
        title: 'Reportes - TRT',
        usuario: req.session.usuario,
        error: 'Error del servidor',
        reportes: {}
      });
    }
  }
};

module.exports = TRTController;
