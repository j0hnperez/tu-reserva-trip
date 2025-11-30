const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

// Definir rutas para el recurso usuarios
router.post('/', UsuarioController.crearUsuario);                    // POST /api/usuarios
router.get('/', UsuarioController.listarUsuarios);                   // GET /api/usuarios
router.get('/:id', UsuarioController.obtenerUsuarioPorId);           // GET /api/usuarios/:id
router.put('/:id', UsuarioController.actualizarUsuario);             // PUT /api/usuarios/:id
router.delete('/:id', UsuarioController.eliminarUsuario);            // DELETE /api/usuarios/:id

module.exports = router;