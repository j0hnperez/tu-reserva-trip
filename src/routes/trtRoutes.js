const express = require('express');
const router = express.Router();
const TRTController = require('../controllers/trtController');
const { verificarSesion, verificarRolAdminWeb } = require('../middleware/authMiddleware');

// Rutas del módulo TRT (equivalentes a servlets)
// GET methods (equivalent to doGet)
router.get('/dashboard', verificarSesion, (req, res) => {
  res.render('main-trt', { 
    title: 'Dashboard - Ventas TRT',
    usuario: req.session.usuario 
  });
});  // GET /trt/dashboard

// Rutas públicas para todos los usuarios autenticados
router.get('/ventas', verificarSesion, TRTController.mostrarVentas);         // GET /trt/ventas
router.get('/reportes', verificarSesion, TRTController.mostrarReportes);    // GET /trt/reportes

// Rutas protegidas - Solo administradores
router.get('/usuarios', verificarRolAdminWeb, TRTController.mostrarUsuarios);    // GET /trt/usuarios

// POST methods (equivalent to doPost)
router.post('/usuarios', verificarRolAdminWeb, TRTController.crearUsuario);       // POST /trt/usuarios (solo admin)
router.post('/ventas', verificarSesion, TRTController.crearVenta);               // POST /trt/ventas (todos autenticados)
router.put('/usuarios/:id', verificarRolAdminWeb, TRTController.actualizarUsuario); // PUT /trt/usuarios/:id (solo admin)
router.delete('/usuarios/:id', verificarRolAdminWeb, TRTController.eliminarUsuario); // DELETE /trt/usuarios/:id (solo admin)
router.delete('/ventas/:id', verificarRolAdminWeb, TRTController.eliminarVenta);   // DELETE /trt/ventas/:id (solo admin)

module.exports = router;
