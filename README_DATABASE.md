# Configuración de Base de Datos MySQL

## 📋 Pasos para configurar la base de datos

### 1. **Instalar MySQL y phpMyAdmin**
- Asegúrate de tener MySQL instalado
- Instala phpMyAdmin para gestión visual

### 2. **Ejecutar el script SQL**

#### Opción A: Usando phpMyAdmin
1. Abre phpMyAdmin en tu navegador (usualmente `http://localhost/phpmyadmin`)
2. Haz clic en la pestaña "SQL"
3. Copia y pega el contenido del archivo `database/setup.sql`
4. Haz clic en "Ejecutar"

#### Opción B: Usando línea de comandos
```bash
mysql -u root -p < database/setup.sql
```

### 3. **Verificar la creación**
- Deberías ver la base de datos `tu_reserva_trip`
- Dentro de ella la tabla `usuario` con los siguientes campos:
  - `id_usuario` (INT, AUTO_INCREMENT, PRIMARY KEY)
  - `nombre` (VARCHAR(100), NOT NULL)
  - `apellido` (VARCHAR(100), NOT NULL)
  - `email` (VARCHAR(100), NOT NULL, UNIQUE)
  - `password` (VARCHAR(255), NOT NULL)
  - `rol` (ENUM('vendedor', 'admin'), DEFAULT 'vendedor')
  - `fecha_creacion` (TIMESTAMP)
  - `fecha_actualizacion` (TIMESTAMP)

### 4. **Usuarios de ejemplo**
El script incluye 3 usuarios de prueba:
- **Admin**: juan.perez@email.com / password123
- **Vendedor**: maria.gomez@email.com / password123  
- **Vendedor**: carlos.rodriguez@email.com / password123

### 5. **Configuración del proyecto**
La conexión está configurada en `src/config/db.js`:
- Host: localhost
- Usuario: root
- Password: (vacío)
- Database: tu_reserva_trip

## 🔧 Si usas diferente configuración

Si tu MySQL usa diferente usuario/password, edita `src/config/db.js`:

```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'tu_usuario',     // Cambia aquí
  password: 'tu_password', // Cambia aquí
  database: 'tu_reserva_trip'
});
```

## ✅ Probar la conexión
Ejecuta el servidor:
```bash
npm run dev
```
Y visita `http://localhost:3000` para verificar que la API responde correctamente.
