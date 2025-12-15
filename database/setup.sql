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
    avatar VARCHAR(255) DEFAULT 'https://placehold.co/40x40',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de ventas
CREATE TABLE IF NOT EXISTS venta (
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
    FOREIGN KEY (advisor_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    INDEX idx_advisor (advisor_id),
    INDEX idx_date (sale_date),
    INDEX idx_code (reservation_code)
);

-- Insertar usuarios de ejemplo para Ventas TRT
INSERT INTO usuario (nombre, apellido, email, password, rol, avatar) VALUES
('Admin', 'User', 'admin@example.com', 'admin123', 'admin', 'https://placehold.co/40x40'),
('Asesor', '1', 'asesor1@example.com', 'asesor123', 'vendedor', 'https://placehold.co/40x40'),
('Asesor', '2', 'asesor2@example.com', 'asesor123', 'vendedor', 'https://placehold.co/40x40');

-- Insertar ventas de ejemplo
INSERT INTO venta (sale_date, reservation_code, client_name, sale_amount, commission, advisor_id, advisor_name) VALUES
('2023-05-15', 'RES-1001', 'Juan Pérez', 1200.00, 360.00, 2, 'Asesor 1'),
('2023-05-16', 'RES-1002', 'María García', 850.00, 255.00, 2, 'Asesor 1'),
('2023-05-17', 'RES-1003', 'Carlos López', 1500.00, 450.00, 3, 'Asesor 2'),
('2023-05-18', 'RES-1004', 'Ana Martínez', 950.00, 285.00, 2, 'Asesor 1'),
('2023-05-19', 'RES-1005', 'Roberto Díaz', 2000.00, 600.00, 3, 'Asesor 2');

-- Mostrar la estructura actualizada
DESCRIBE usuario;
DESCRIBE venta;

-- Mostrar datos de ejemplo
SELECT * FROM usuario;
SELECT * FROM venta;