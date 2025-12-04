const db = require('../config/db');

const UsuarioModel = {
  // Crear usuario
  crearUsuario: (usuario, callback) => {
    const sql = `
      INSERT INTO usuario (nombre, apellido, email, password, rol, avatar)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      usuario.nombre,
      usuario.apellido,
      usuario.email,
      usuario.password,
      usuario.rol,
      usuario.avatar || 'https://placehold.co/40x40'
    ];
    db.query(sql, params, callback);
  },

  // Obtener todos los usuarios
  obtenerUsuarios: (callback) => {
    const sql = 'SELECT * FROM usuario ORDER BY created_at DESC';
    db.query(sql, callback);
  },

  // Obtener usuario por ID
  obtenerUsuarioPorId: (id, callback) => {
    const sql = 'SELECT * FROM usuario WHERE id_usuario = ?';
    db.query(sql, [id], callback);
  },

  // Obtener usuario por email (para login)
  obtenerUsuarioPorEmail: (email, callback) => {
    const sql = 'SELECT * FROM usuario WHERE email = ?';
    db.query(sql, [email], callback);
  },

  // Obtener usuario por email y rol (para login específico)
  obtenerUsuarioPorEmailYRol: (email, rol, callback) => {
    const sql = 'SELECT * FROM usuario WHERE email = ? AND rol = ?';
    db.query(sql, [email, rol], callback);
  },

  // Actualizar usuario
  actualizarUsuario: (id, usuario, callback) => {
    const sql = `
      UPDATE usuario
      SET nombre = ?, apellido = ?, email = ?, rol = ?, avatar = ?
      WHERE id_usuario = ?
    `;
    const params = [
      usuario.nombre,
      usuario.apellido,
      usuario.email,
      usuario.rol,
      usuario.avatar,
      id
    ];
    db.query(sql, params, callback);
  },

  // Eliminar usuario
  eliminarUsuario: (id, callback) => {
    const sql = 'DELETE FROM usuario WHERE id_usuario = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = UsuarioModel;