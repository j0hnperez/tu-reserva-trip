const express = require('express');
const router = express.Router();
const TRTController = require('../controllers/trtController');

// Middleware para verificar sesión
function verificarSesion(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/auth/login');
  }
  next();
}

// Rutas del módulo TRT (equivalentes a servlets)
// GET methods (equivalent to doGet)
router.get('/dashboard', verificarSesion, (req, res) => {
  res.render('main-trt', { 
    title: 'Dashboard - Ventas TRT',
    usuario: req.session.usuario 
  });
});  // GET /trt/dashboard
router.get('/usuarios', verificarSesion, TRTController.mostrarUsuarios);    // GET /trt/usuarios
router.get('/ventas', verificarSesion, TRTController.mostrarVentas);         // GET /trt/ventas
router.get('/reportes', verificarSesion, TRTController.mostrarReportes);    // GET /trt/reportes

// POST methods (equivalent to doPost)
router.post('/usuarios', verificarSesion, TRTController.crearUsuario);       // POST /trt/usuarios
router.post('/ventas', verificarSesion, TRTController.crearVenta);           // POST /trt/ventas
router.put('/usuarios/:id', verificarSesion, TRTController.actualizarUsuario); // PUT /trt/usuarios/:id
router.delete('/usuarios/:id', verificarSesion, TRTController.eliminarUsuario); // DELETE /trt/usuarios/:id

module.exports = router;
