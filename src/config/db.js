const mysql = require('mysql2');

// Configuración de la base de datos
const DATABASE_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tu_reserva_trip',
  connectionLimit: 10
};

// Crear pool de conexiones
const connectionPool = mysql.createPool(DATABASE_CONFIG);

module.exports = connectionPool;