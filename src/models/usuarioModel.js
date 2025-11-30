const db = require('../config/db');

const UsuarioModel = {
  crearUsuario: (usuario, callback) => {
    const sql = `
      INSERT INTO usuario (nombre, apellido, email, password, rol)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      usuario.nombre,
      usuario.apellido,
      usuario.email,
      usuario.password,
      usuario.rol
    ];
    db.query(sql, params, callback);
  },

  obtenerUsuarios: (callback) => {
    const sql = 'SELECT * FROM usuario';
    db.query(sql, callback);
  },

  obtenerUsuarioPorId: (id, callback) => {
    const sql = 'SELECT * FROM usuario WHERE id_usuario = ?';
    db.query(sql, [id], callback);
  },

  actualizarUsuario: (id, usuario, callback) => {
    const sql = `
      UPDATE usuario
      SET nombre = ?, apellido = ?, email = ?, rol = ?
      WHERE id_usuario = ?
    `;
    const params = [
      usuario.nombre,
      usuario.apellido,
      usuario.email,
      usuario.rol,
      id
    ];
    db.query(sql, params, callback);
  },

  eliminarUsuario: (id, callback) => {
    const sql = 'DELETE FROM usuario WHERE id_usuario = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = UsuarioModel;