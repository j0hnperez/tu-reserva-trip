# Tu Reserva Trip - Sistema de Gestión de Usuarios


## 🎯 Objetivo del Proyecto

Desarrollar un sistema de gestión de usuarios que demuestre las competencias adquiridas en el componente formativo "Construcción de aplicaciones con JAVASCRIPT", aplicando buenas prácticas de codificación, conexión a bases de datos MySQL y arquitectura MVC.

## 🏗️ Arquitectura del Sistema

### Backend (Node.js + Express + MySQL)
```
src/
├── app.js              # Servidor principal y configuración de rutas
├── config/
│   └── db.js          # Configuración de conexión a MySQL
├── controllers/
│   └── usuarioController.js  # Lógica de negocio CRUD
├── models/
│   └── usuarioModel.js      # Consultas SQL y manejo de datos
└── routes/
    └── usuarioRoutes.js     # Definición de rutas API REST
```

### Frontend (HTML + CSS + JavaScript)
```
frontend/
├── usuarios.html      # Interfaz principal de gestión
└── assets/
    └── js/
        └── usuarios.js   # Lógica JavaScript del cliente
```

## 🔧 Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL2** - Driver de base de datos
- **CORS** - Habilitación de peticiones cross-origin

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos y diseño responsive
- **JavaScript ES6+** - Lógica del cliente
- **Fetch API** - Comunicación con el backend

### Base de Datos
- **MySQL** - Sistema de gestión de base de datos relacional
- **phpMyAdmin** - Interfaz de administración

## 📊 Funcionalidades CRUD

### ✅ Create (Crear)
- Endpoint: `POST /api/usuarios`
- Formulario de registro con validación
- Campos: nombre, apellido, email, password, rol

### ✅ Read (Leer)
- Endpoint: `GET /api/usuarios` - Listar todos
- Endpoint: `GET /api/usuarios/:id` - Obtener uno
- Tabla dinámica con datos en tiempo real

### ✅ Update (Actualizar)
- Endpoint: `PUT /api/usuarios/:id`
- Formulario reutilizable para edición
- Validación de datos

### ✅ Delete (Eliminar)
- Endpoint: `DELETE /api/usuarios/:id`
- Confirmación de eliminación
- Actualización automática de la lista

## 📝 Estándares de Codificación Aplicados

### ✅ Nombramiento de Variables
- **Constantes:** `MAYUSCULAS_SNAKE_CASE` (API_CONFIG, DOM_ELEMENTS)
- **Variables:** `camelCase` (usuarioId, usuarioData)
- **Funciones:** `camelCase` descriptivo (cargarUsuarios, validarFormulario)

### ✅ Nombramiento de Métodos
- Verbos en español: `crearUsuario`, `actualizarUsuario`, `eliminarUsuario`
- Nombres descriptivos que indican la acción: `renderizarTablaUsuarios`, `manejarEnvioFormulario`

### ✅ Nombramiento de Clases
- Archivos con PascalCase: `usuarioController.js`, `usuarioModel.js`
- Objetos literales con camelCase: `UsuarioController`, `UsuarioModel`

### ✅ Nombramiento de Paquetes
- Estructura MVC clara: `controllers/`, `models/`, `routes/`, `config/`
- Separación de responsabilidades

## 🗄️ Estructura de Base de Datos

```sql
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('vendedor', 'admin') DEFAULT 'vendedor',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MySQL Server
- phpMyAdmin (recomendado)

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
   - Verificar conexión en `src/config/db.js`

4. **Iniciar el servidor**
   ```bash
   npm run dev    # Desarrollo con nodemon
   npm start      # Producción
   ```

5. **Acceder a la aplicación**
   - API: http://localhost:3000
   - Frontend: Abrir `frontend/usuarios.html`

## 🔍 Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Verificación del servidor |
| GET | `/api/usuarios` | Listar todos los usuarios |
| GET | `/api/usuarios/:id` | Obtener usuario por ID |
| POST | `/api/usuarios` | Crear nuevo usuario |
| PUT | `/api/usuarios/:id` | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Eliminar usuario |

## 🧪 Pruebas y Validación

### Pruebas Funcionales
- ✅ Creación de usuarios
- ✅ Listado de usuarios
- ✅ Edición de usuarios
- ✅ Eliminación de usuarios
- ✅ Validación de formularios
- ✅ Manejo de errores

### Pruebas Técnicas
- ✅ Conexión a base de datos
- ✅ Respuestas HTTP correctas
- ✅ Manejo de CORS
- ✅ Validación de entrada

## 📱 Características Adicionales

### Frontend
- ✅ Validación de formularios en tiempo real
- ✅ Notificaciones visuales para feedback
- ✅ Diseño responsive
- ✅ Confirmación para acciones destructivas
- ✅ Manejo de errores de conexión

### Backend
- ✅ Respuestas JSON consistentes
- ✅ Códigos de estado HTTP apropiados
- ✅ Logging de errores
- ✅ Validación de parámetros
- ✅ Manejo de excepciones

## 🔄 Flujo de Trabajo del Desarrollo

1. **Planificación** - Definición de requerimientos y arquitectura
2. **Diseño** - Estructura MVC y diseño de base de datos
3. **Implementación** - Codificación siguiendo estándares
4. **Pruebas** - Validación funcional y técnica
5. **Documentación** - README y comentarios en código
6. **Versionamiento** - Control de versiones con Git

## 📈 Métricas del Proyecto

- **Archivos:** 8 archivos principales
- **Líneas de código:** ~500 líneas (backend + frontend)
- **Endpoints API:** 6 endpoints funcionales
- **Funcionalidades:** CRUD completo + validaciones
- **Estándares:** 100% cumplimiento de convenciones

## 🎓 Competencias Demostradas

### Técnicas
- ✅ Construcción de aplicaciones con JavaScript
- ✅ Conexión a bases de datos MySQL
- ✅ Arquitectura MVC
- ✅ API REST
- ✅ Manejo de errores y validaciones

### Blandas
- ✅ Pensamiento estructurado
- ✅ Resolución de problemas
- ✅ Atención al detalle
- ✅ Documentación técnica
- ✅ Buenas prácticas de desarrollo

## 📦 Entrega de la Evidencia

### Archivos Incluidos
- ✅ Código fuente completo del proyecto
- ✅ Base de datos SQL
- ✅ Documentación README
- ✅ Enlace al repositorio Git

### Formato de Entrega
- Nombre del archivo: `NOMBREAPELLIDO_AA2_EV01.zip`
- Contenido: Todos los archivos del proyecto + enlace del repositorio

---

**Desarrollado para:** Evidencia de desempeño GA7-220501096-AA2-EV01  
**Tecnologías:** Node.js, Express, MySQL, JavaScript  
**Estándares:** Cumplimiento total de convenciones de codificación
