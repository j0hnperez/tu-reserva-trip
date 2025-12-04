// Database connection to MySQL backend
class DatabaseMySQL {
    constructor() {
        this.apiBaseUrl = 'http://localhost:3000/api';
        this.currentUser = null;
    }

    async authenticate(email, password, role) {
        try {
            // Usar ruta alternativa que debería funcionar
            const response = await fetch(`${this.apiBaseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, role: role })
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    this.currentUser = data.data;
                    return { success: true, user: data.data };
                } else {
                    return { success: false, message: data.message || 'Credenciales inválidas' };
                }
            } else {
                // Error de autenticación - no usar fallback
                const errorData = await response.json();
                return { success: false, message: errorData.message || 'Error de autenticación' };
            }
        } catch (error) {
            console.error('Error en autenticación MySQL:', error);
            return { success: false, message: 'Error de conexión al servidor' };
        }
    }

    async register(name, email, password, role) {
        console.log('🔍 Register - Rol recibido:', role);
        try {
            const response = await fetch(`${this.apiBaseUrl}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    nombre: name, 
                    apellido: '', // Agregar campo si es necesario
                    email, 
                    password, 
                    rol: role 
                })
            });
            
            console.log('🔍 Register - Status:', response.status);
            const data = await response.json();
            console.log('🔍 Register - Response:', data);
            
            if (response.ok) {
                return data.success ? data.data : false;
            }
            return false;
        } catch (error) {
            console.error('Error en registro:', error);
            return false;
        }
    }

    async getUsers() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/usuarios`);
            if (response.ok) {
                const data = await response.json();
                return data.success ? data.data : [];
            }
            return [];
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
            return [];
        }
    }

    async updateUser(userId, userData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/usuarios/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: userData.name,
                    apellido: userData.apellido || '',
                    email: userData.email,
                    role: userData.role.toLowerCase()
                })
            });
            
            return response.ok;
        } catch (error) {
            console.error('Error actualizando usuario:', error);
            return false;
        }
    }

    async deleteUser(userId) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/usuarios/${userId}`, {
                method: 'DELETE'
            });
            
            return response.ok;
        } catch (error) {
            console.error('Error eliminando usuario:', error);
            return false;
        }
    }

    // Métodos para ventas (datos de prueba mientras se implementa el backend)
    async getSalesForUser(userId, role) {
        // Datos de prueba mientras se implementa el backend
        const mockSales = [
            {
                id: 1,
                reservationCode: 'RES-001',
                saleDate: '2024-01-15',
                clientName: 'Cliente A',
                saleAmount: 1500,
                commission: 150,
                userId: 1,
                status: 'completed'
            },
            {
                id: 2,
                reservationCode: 'RES-002',
                saleDate: '2024-01-16',
                clientName: 'Cliente B',
                saleAmount: 2000,
                commission: 200,
                userId: 1,
                status: 'completed'
            },
            {
                id: 3,
                reservationCode: 'RES-003',
                saleDate: '2024-01-17',
                clientName: 'Cliente C',
                saleAmount: 1800,
                commission: 180,
                userId: 2,
                status: 'pending'
            }
        ];

        if (role === 'ADMIN') {
            return mockSales; // Admin ve todas las ventas
        } else {
            return mockSales.filter(sale => sale.userId === parseInt(userId)); // Vendedores ven solo sus ventas
        }
    }

    async addSale(saleData) {
        // Implementar cuando tengas el endpoint de ventas
        return null;
    }

    async updateSale(saleId, saleData) {
        // Implementar cuando tengas el endpoint de ventas
        return false;
    }

    async deleteSale(saleId) {
        // Implementar cuando tengas el endpoint de ventas
        return false;
    }

    async getSalesReport(startDate, endDate) {
        // Implementar cuando tengas el endpoint de reportes
        return {};
    }
}

// Exportar la clase para que pueda ser usada
window.DatabaseMySQL = DatabaseMySQL;
