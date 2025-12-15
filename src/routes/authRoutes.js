const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Rutas de autenticación equivalentes a servlets Java
// GET methods (equivalent a doGet)
router.get('/login', AuthController.mostrarLoginTRT);           // GET /auth/login (diseño TRT)
router.get('/registro', AuthController.mostrarRegistroTRT);      // GET /auth/registro (diseño TRT)
router.get('/logout', AuthController.cerrarSesion);             // GET /auth/logout

// POST methods (equivalent to doPost)
router.post('/login', AuthController.procesarLogin);             // POST /auth/login
router.post('/registro', AuthController.procesarRegistro);      // POST /auth/registro

module.exports = router;
