const UsuarioModel = require('../models/usuarioModel');
const VentaModel = require('../models/ventaModelFixed');

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
      // Get sales, vendors, and next reservation code
      VentaModel.obtenerVentas((error, ventas) => {
        if (error) {
          console.error('Error al obtener ventas:', error);
          return res.render('trt-ventas', {
            title: 'Gestión de Ventas - TRT',
            usuario: req.session.usuario,
            ventas: [],
            vendedores: [],
            siguienteCodigo: 'RES-001',
            error: 'Error al cargar las ventas',
            success: null
          });
        }
        
        // Get vendors (users with vendedor role)
        UsuarioModel.obtenerUsuariosPorRol('vendedor', (errorVendedores, vendedores) => {
          if (errorVendedores) {
            console.error('Error al obtener vendedores:', errorVendedores);
            vendedores = [];
          }
          
          // Get next reservation code
          VentaModel.obtenerSiguienteCodigoReserva((errorCodigo, siguienteCodigo) => {
            if (errorCodigo) {
              console.error('Error al obtener siguiente código:', errorCodigo);
              siguienteCodigo = 'RES-001';
            }
            
            res.render('trt-ventas', {
              title: 'Gestión de Ventas - TRT',
              usuario: req.session.usuario,
              ventas: ventas,
              vendedores: vendedores,
              siguienteCodigo: siguienteCodigo,
              success: req.query.success || null,
              error: req.query.error || null
            });
          });
        });
      });
    } catch (error) {
      console.error('Error en mostrarVentas:', error);
      res.render('trt-ventas', {
        title: 'Gestión de Ventas - TRT',
        usuario: req.session.usuario,
        ventas: [],
        vendedores: [],
        siguienteCodigo: 'RES-001',
        error: 'Error del servidor',
        success: null
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
    // Get the next reservation code automatically
    VentaModel.obtenerSiguienteCodigoReserva((errorCodigo, siguienteCodigo) => {
      if (errorCodigo) {
        console.error('Error al obtener siguiente código:', errorCodigo);
        return res.redirect('/trt/ventas?error=Error al generar código de reserva');
      }

      const nuevaVenta = {
        reservationCode: siguienteCodigo, // Use auto-generated code
        clientName: req.body.clientName,
        saleAmount: parseFloat(req.body.saleAmount),
        commission: parseFloat(req.body.saleAmount) * 0.3, // 30% de comisión
        advisorName: req.body.advisorName,
        advisorId: 1, // Por ahora usamos un ID fijo, luego podemos mejorarlo
        saleDate: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
      };

      // Validar que todos los campos requeridos estén presentes (excepto reservationCode)
      if (!nuevaVenta.clientName || isNaN(nuevaVenta.saleAmount) || !nuevaVenta.advisorName) {
        return res.redirect('/trt/ventas?error=Todos los campos son obligatorios');
      }

      // Guardar en la base de datos
      VentaModel.crearVenta(nuevaVenta, (error, ventaCreada) => {
        if (error) {
          console.error('Error al crear venta:', error);
          return res.redirect('/trt/ventas?error=Error al guardar la venta');
        }
        
        res.redirect('/trt/ventas?success=Venta creada exitosamente con código ' + siguienteCodigo);
      });
    });
  },

  // DELETE: Eliminar venta
  eliminarVenta: (req, res) => {
    const ventaId = req.params.id;

    VentaModel.eliminarVenta(ventaId, (error) => {
      if (error) {
        console.error('Error al eliminar venta:', error);
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar venta'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Venta eliminada exitosamente'
      });
    });
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
