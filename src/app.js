const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const trtRoutes = require('./routes/trtRoutes');
const UsuarioController = require('./controllers/usuarioController');

const app = express();
const SERVER_PORT = 3000;
const API_BASE_URL = '/api';

// Configurar middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Soporte para PUT/DELETE via POST

// Configurar motor de plantillas EJS (equivalente a JSP)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar sesiones (equivalente a HttpSession en Java)
app.use(session({
  secret: 'tu-reserva-trip-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // En producción usar true con HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

// Middleware para verificar sesión en rutas protegidas
function verificarSesion(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/auth/login');
  }
  next();
}

// Rutas de la API REST
app.use(`${API_BASE_URL}/usuarios`, usuarioRoutes);
app.post(`${API_BASE_URL}/login`, UsuarioController.loginUsuario);

// Rutas de aplicación web (equivalentes a servlets)
app.use('/auth', authRoutes);
app.use('/trt', trtRoutes); // Added this line

// Rutas protegidas (dashboards)
app.get('/trt/dashboard', verificarSesion, (req, res) => {
  res.render('main-trt', { 
    title: 'Dashboard - Ventas TRT',
    usuario: req.session.usuario 
  });
});

app.get('/admin/dashboard', verificarSesion, (req, res) => {
  if (req.session.usuario.role !== 'ADMIN') {
    return res.redirect('/user/dashboard');
  }
  res.render('dashboard-admin', { 
    title: 'Dashboard Administrador',
    usuario: req.session.usuario 
  });
});

app.get('/user/dashboard', verificarSesion, (req, res) => {
  res.render('dashboard-user', { 
    title: 'Dashboard Usuario',
    usuario: req.session.usuario 
  });
});

// Ruta raíz redirige al login
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

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