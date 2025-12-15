const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const { verificarRolAdmin } = require('../middleware/authMiddleware');

// Definir rutas para el recurso usuarios
// Rutas públicas
router.post('/login', UsuarioController.loginUsuario);                 // POST /api/usuarios/login
router.get('/email/:email', UsuarioController.obtenerUsuarioPorEmail); // GET /api/usuarios/email/:email

// Rutas protegidas - Solo administradores
router.post('/', verificarRolAdmin, UsuarioController.crearUsuario);                    // POST /api/usuarios
router.get('/', verificarRolAdmin, UsuarioController.listarUsuarios);                   // GET /api/usuarios
router.get('/:id', verificarRolAdmin, UsuarioController.obtenerUsuarioPorId);           // GET /api/usuarios/:id
router.put('/:id', verificarRolAdmin, UsuarioController.actualizarUsuario);             // PUT /api/usuarios/:id
router.delete('/:id', verificarRolAdmin, UsuarioController.eliminarUsuario);            // DELETE /api/usuarios/:id

module.exports = router;