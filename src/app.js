const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const UsuarioController = require('./controllers/usuarioController');

const app = express();
const SERVER_PORT = 3000;
const API_BASE_URL = '/api';

// Configurar middleware
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use(`${API_BASE_URL}/usuarios`, usuarioRoutes);

// Ruta de login directa
app.post(`${API_BASE_URL}/login`, UsuarioController.loginUsuario);

// Ruta de verificación del servidor
app.get('/health', (request, response) => {
  response.status(200).json({
    status: 'OK',
    message: 'API Tu Reserva Trip funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(SERVER_PORT, () => {
  console.log(` Servidor escuchando en http://localhost:${SERVER_PORT}`);
  console.log(` API disponible en http://localhost:${SERVER_PORT}${API_BASE_URL}`);
  console.log(`  Base de datos: tu_reserva_trip`);
});