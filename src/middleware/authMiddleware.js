// Middleware para verificar sesión y roles

function verificarSesion(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/auth/login');
  }
  next();
}

function verificarRolAdmin(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/auth/login');
  }
  
  if (req.session.usuario.role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Acceso denegado',
      message: 'Solo los administradores pueden realizar esta acción'
    });
  }
  
  next();
}

function verificarRolAdminWeb(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/auth/login');
  }
  
  if (req.session.usuario.role !== 'ADMIN') {
    return res.status(403).render('error', {
      title: 'Acceso Denegado',
      message: 'Solo los administradores pueden acceder a esta página'
    });
  }
  
  next();
}

module.exports = {
  verificarSesion,
  verificarRolAdmin,
  verificarRolAdminWeb
};
