const mysql = require('mysql2');

// Configuración de la base de datos
const DATABASE_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tu_reserva_trip',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000
};

// Crear pool de conexiones
const connectionPool = mysql.createPool(DATABASE_CONFIG);

module.exports = connectionPool;