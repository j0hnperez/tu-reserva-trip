const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

// Definir rutas para el recurso usuarios
// Rutas específicas primero (sin parámetros)
router.post('/login', UsuarioController.loginUsuario);                 // POST /api/usuarios/login
router.post('/', UsuarioController.crearUsuario);                    // POST /api/usuarios
router.get('/email/:email', UsuarioController.obtenerUsuarioPorEmail); // GET /api/usuarios/email/:email

// Rutas con parámetros al final
router.get('/', UsuarioController.listarUsuarios);                   // GET /api/usuarios
router.get('/:id', UsuarioController.obtenerUsuarioPorId);           // GET /api/usuarios/:id
router.put('/:id', UsuarioController.actualizarUsuario);             // PUT /api/usuarios/:id
router.delete('/:id', UsuarioController.eliminarUsuario);            // DELETE /api/usuarios/:id

module.exports = router;