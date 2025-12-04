// componentes de gestion de usuarios
class Users {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('users-container');
        this.users = []; // Cache de usuarios
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div id="users-section" class="hidden">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
                    <button id="add-user-btn" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        <i class="fas fa-plus mr-2"></i> Nuevo Usuario
                    </button>
                </div>
                
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="mb-4">
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-info-circle mr-2"></i>
                            <span>Usuarios cargados desde base de datos MySQL</span>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rol
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ventas
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="users-table-body">
                                <!-- Users will be inserted here by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        document.getElementById('add-user-btn').addEventListener('click', () => this.app.modals.showUserModal());
    }

    // Cargar usuarios desde la API
    async loadUsers() {
        try {
            if (!this.app || !this.app.db) {
                throw new Error('Database no está disponible');
            }
            this.users = await this.app.db.getUsers();
            console.log('Usuarios cargados desde MySQL:', this.users);
            this.renderUsersTable();
        } catch (error) {
            console.error('Error cargando usuarios:', error);
            this.showErrorMessage('Error al cargar usuarios desde la base de datos');
        }
    }

    // Renderizar tabla de usuarios
    renderUsersTable() {
        const usersTableBody = document.getElementById('users-table-body');
        usersTableBody.innerHTML = '';
        
        if (this.users.length === 0) {
            usersTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                        No hay usuarios registrados
                    </td>
                </tr>
            `;
            return;
        }
        
        this.users.forEach(user => {
            const row = this.createUserRow(user);
            usersTableBody.appendChild(row);
        });
        
        this.bindUserActions();
    }

    // Crear fila de usuario
    createUserRow(user) {
        const row = document.createElement('tr');
        
        // Calcular ventas (simulado por ahora)
        const userSales = Math.floor(Math.random() * 10); // Simulación
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <img src="${user.avatar || 'https://placehold.co/40x40'}" alt="Foto del asesor ${user.nombre}" class="h-8 w-8 rounded-full mr-3">
                    <div>
                        <div class="text-sm font-medium text-gray-900">${user.nombre} ${user.apellido || ''}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${user.email}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.rol === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                }">
                    ${user.rol === 'admin' ? 'Administrador' : 'Vendedor'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                    <i class="fas fa-shopping-cart mr-2 text-gray-400"></i>
                    ${userSales}
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900 edit-user mr-3" data-id="${user.id_usuario}" title="Editar usuario">
                    <i class="fas fa-edit mr-1"></i> Editar
                </button>
                <button class="text-red-600 hover:text-red-900 delete-user" data-id="${user.id_usuario}" title="Eliminar usuario">
                    <i class="fas fa-trash mr-1"></i> Eliminar
                </button>
            </td>
        `;
        
        return row;
    }

    // Vincular eventos de acciones de usuario
    bindUserActions() {
        // Eventos de editar
        document.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const userId = parseInt(e.target.getAttribute('data-id'));
                const user = this.users.find(u => u.id_usuario === userId);
                if (user) {
                    await this.app.modals.editUser(userId);
                }
            });
        });
        
        // Eventos de eliminar
        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const userId = parseInt(e.target.getAttribute('data-id'));
                const user = this.users.find(u => u.id_usuario === userId);
                if (user) {
                    this.app.modals.confirmDeleteUser(userId, user);
                }
            });
        });
    }

    // Mostrar mensaje de error
    showErrorMessage(message) {
        const usersTableBody = document.getElementById('users-table-body');
        usersTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-4 text-center">
                    <div class="text-red-600">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        ${message}
                    </div>
                </td>
            </tr>
        `;
    }

    async show() {
        document.getElementById('users-section').classList.remove('hidden');
        await this.loadUsers(); // Cargar desde MySQL en lugar de update()
    }

    hide() {
        document.getElementById('users-section').classList.add('hidden');
    }

    // Refrescar lista de usuarios
    refresh() {
        this.loadUsers();
    }

    // Obtener usuario por ID
    getUserById(userId) {
        return this.users.find(user => user.id_usuario === userId);
    }
}
