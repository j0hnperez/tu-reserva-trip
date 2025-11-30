-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS tu_reserva_trip DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE tu_reserva_trip;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('vendedor', 'admin') NOT NULL DEFAULT 'vendedor',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar algunos usuarios de ejemplo (opcional)
INSERT INTO usuario (nombre, apellido, email, password, rol) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', 'password123', 'admin'),
('María', 'Gómez', 'maria.gomez@email.com', 'password123', 'vendedor'),
('Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', 'password123', 'vendedor');

-- Mostrar la estructura de la tabla
DESCRIBE usuario;
