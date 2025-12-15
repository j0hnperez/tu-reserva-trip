const db = require('../config/db');

const VentaModel = {
  // Crear una nueva venta
  crearVenta: (venta, callback) => {
    const query = `
      INSERT INTO venta 
      (sale_date, reservation_code, client_name, sale_amount, commission, advisor_id, advisor_name)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      venta.saleDate || new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      venta.reservationCode,
      venta.clientName,
      venta.saleAmount,
      venta.commission,
      venta.advisorId || 1, // Default advisor ID
      venta.advisorName
    ];
    
    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Error al crear venta:', error);
        return callback(error, null);
      }
      callback(null, { id_venta: result.insertId, ...venta });
    });
  },

  // Obtener todas las ventas
  obtenerVentas: (callback) => {
    const query = 'SELECT * FROM venta ORDER BY sale_date DESC';
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error al obtener ventas:', error);
        return callback(error, null);
      }
      callback(null, results);
    });
  },

  // Obtener una venta por ID
  obtenerVentaPorId: (id, callback) => {
    const query = 'SELECT * FROM venta WHERE id_venta = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Error al obtener venta:', error);
        return callback(error, null);
      }
      callback(null, results[0]);
    });
  },

  // Obtener el siguiente código de reserva
  obtenerSiguienteCodigoReserva: (callback) => {
    const query = 'SELECT MAX(reservation_code) as max_code FROM venta';
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error al obtener máximo código de reserva:', error);
        return callback(error, null);
      }
      
      const maxCode = results[0].max_code;
      let nextCode;
      
      if (!maxCode) {
        // Si no hay ventas, empezar con RES-001
        nextCode = 'RES-001';
      } else {
        // Extraer el número del código y incrementar
        const match = maxCode.match(/RES-(\d+)/);
        if (match) {
          const currentNumber = parseInt(match[1]);
          const nextNumber = currentNumber + 1;
          nextCode = `RES-${nextNumber.toString().padStart(3, '0')}`;
        } else {
          // Si el formato no coincide, empezar con RES-001
          nextCode = 'RES-001';
        }
      }
      
      callback(null, nextCode);
    });
  }
};

module.exports = VentaModel;
