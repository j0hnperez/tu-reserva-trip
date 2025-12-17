# Tu Reserva Trip - Sistema de Gestión de Ventas TRT

**Tecnologías:** Node.js, Express, MySQL, EJS, Tailwind CSS, JavaScript, Express-Session, Bcrypt

Sistema completo de gestión de ventas para agencia de viajes con control de usuarios, registro de ventas, y generación automática de códigos de reserva.

## 🏗️ Arquitectura del Sistema

### Backend (Node.js + Express + MySQL)
```
src/
├── app.js              # Servidor principal y configuración de rutas
├── config/
│   └── db.js          # Configuración de conexión a MySQL
├── controllers/
│   ├── trtController.js      # Lógica de negocio para TRT
│   └── usuarioController.js  # Lógica de negocio para usuarios
├── models/
│   ├── usuarioModel.js      # Modelo de usuarios
│   └── ventaModel.js        # Modelo de ventas
└── routes/
    ├── trtRoutes.js         # Rutas para el panel TRT
    └── usuarioRoutes.js     # Rutas de API para usuarios
```

### Frontend (EJS + Tailwind CSS)
```
views/
├── trt-ventas.ejs       # Interfaz de gestión de ventas
├── trt-usuarios.ejs     # Interfaz de gestión de usuarios
└── partials/
    ├── header.ejs       # Encabezado común
    └── footer.ejs       # Pie de página común
```

## 🔧 Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MySQL2** - Cliente MySQL para Node.js
- **Express-Session** - Manejo de sesiones
- **Bcrypt** - Encriptación de contraseñas
- **EJS** - Motor de plantillas

### Frontend
- **Tailwind CSS** - Framework de estilos
- **JavaScript** - Interactividad del lado del cliente
- **Font Awesome** - Iconos

### Base de Datos
- **MySQL** - Sistema de gestión de base de datos relacional
- **phpMyAdmin** - Interfaz de administración

## 📊 Módulos Principales

### Gestión de Ventas
- Registro de nuevas ventas
- Cálculo automático de comisiones (30%)
- Historial de ventas con filtros
- Búsqueda por código de reserva

### Gestión de Usuarios
- Autenticación de usuarios
- Roles: Administrador y Vendedor
- Perfiles de usuario

## 🗄️ Estructura de Base de Datos

### Tabla: venta
```sql
CREATE TABLE venta (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    sale_date DATE NOT NULL,
    register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reservation_code VARCHAR(50) NOT NULL UNIQUE,
    client_name VARCHAR(100) NOT NULL,
    sale_amount DECIMAL(10,2) NOT NULL,
    commission DECIMAL(10,2) NOT NULL,
    advisor_id INT NOT NULL,
    advisor_name VARCHAR(100) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (advisor_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MySQL Server
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd tu-reserva-trip
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar base de datos**
   - Crear base de datos `tu_reserva_trip`
   - Ejecutar el script `database/setup.sql`
   - Ejecutar `database/setup_ventas.sql` para el módulo de ventas
   - Configurar credenciales en `src/config/db.js`

4. **Iniciar el servidor**
   ```bash
   npm run dev    # Modo desarrollo con recarga automática
   ```

5. **Acceder al sistema**
   - URL: http://localhost:3000
   - Usuario por defecto: admin@example.com / admin123

## 📝 Características Técnicas

### Seguridad
- Autenticación con sesiones
- Protección de rutas
- Encriptación de contraseñas con bcrypt
- Validación de entrada

### Rendimiento
- Conexiones persistentes a MySQL
- Consultas optimizadas
- Caché de sesiones

### Usabilidad
- Interfaz intuitiva
- Retroalimentación visual
- Diseño responsivo

