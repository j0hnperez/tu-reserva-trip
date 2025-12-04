// Modals Component
class Modals {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('modals-container');
        this.editingSaleId = null;
        this.editingUserId = null;
        this.confirmCallback = null;
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <!-- Modal for Add/Edit Sale -->
            <div id="sale-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden modal">
                <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-medium text-gray-900" id="sale-modal-title">Agregar Nueva Venta</h3>
                            <button id="close-sale-modal" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <form id="sale-form" class="space-y-4">
                            <input type="hidden" id="sale-id">
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label for="sale-date" class="block text-sm font-medium text-gray-700">Fecha de Venta</label>
                                    <input type="date" id="sale-date" required
                                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                </div>
                                
                                <div>
                                    <label for="reservation-code" class="block text-sm font-medium text-gray-700">Código de Reserva</label>
                                    <input type="text" id="reservation-code" required
                                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                           placeholder="Ej: RES-12345">
                                </div>
                                
                                <div class="md:col-span-2">
                                    <label for="client-name" class="block text-sm font-medium text-gray-700">Cliente</label>
                                    <input type="text" id="client-name" required
                                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                           placeholder="Nombre completo del cliente">
                                </div>
                                
                                <div>
                                    <label for="sale-amount" class="block text-sm font-medium text-gray-700">Total de la Venta</label>
                                    <div class="mt-1 relative rounded-md shadow-sm">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span class="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input type="number" id="sale-amount" step="0.01" min="0" required
                                               class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                               placeholder="0.00">
                                    </div>
                                </div>
                                
                                <div>
                                    <label for="sale-commission" class="block text-sm font-medium text-gray-700">Comisión (30%)</label>
                                    <div class="mt-1 relative rounded-md shadow-sm">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span class="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input type="number" id="sale-commission" step="0.01" min="0" readonly
                                               class="bg-gray-100 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                               placeholder="0.00">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex justify-end space-x-4 pt-4">
                                <button type="button" id="cancel-sale-btn" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Cancelar
                                </button>
                                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <!-- Modal for Add/Edit User -->
            <div id="user-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden modal">
                <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-medium text-gray-900" id="user-modal-title">Agregar Nuevo Usuario</h3>
                            <button id="close-user-modal" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <form id="user-form" class="space-y-4">
                            <input type="hidden" id="user-id">
                            
                            <div>
                                <label for="new-user-name" class="block text-sm font-medium text-gray-700">Nombre</label>
                                <input type="text" id="new-user-name" required
                                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                            
                            <div>
                                <label for="new-user-email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                                <input type="email" id="new-user-email" required
                                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                            
                            <div>
                                <label for="new-user-password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                                <input type="password" id="new-user-password" 
                                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                            
                            <div>
                                <label for="new-user-role" class="block text-sm font-medium text-gray-700">Rol</label>
                                <select id="new-user-role" required
                                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="ADMIN">Administrador</option>
                                    <option value="ASESOR">Asesor</option>
                                </select>
                            </div>
                            
                            <div class="flex justify-end space-x-4 pt-4">
                                <button type="button" id="cancel-user-btn" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Cancelar
                                </button>
                                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <!-- Confirmation Modal -->
            <div id="confirm-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden modal">
                <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-medium text-gray-900">Confirmación</h3>
                            <button id="close-confirm-modal" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <p id="confirm-message" class="text-gray-700 mb-6">¿Estás seguro que deseas eliminar este registro?</p>
                        
                        <div class="flex justify-end space-x-4">
                            <button type="button" id="cancel-confirm-btn" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Cancelar
                            </button>
                            <button type="button" id="confirm-btn" class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // modulo de ventas (eventos)
        document.getElementById('sale-form').addEventListener('submit', (e) => this.handleSaleSubmit(e));
        document.getElementById('sale-amount').addEventListener('input', () => this.calculateCommission());
        document.getElementById('close-sale-modal').addEventListener('click', () => this.hideSaleModal());
        document.getElementById('cancel-sale-btn').addEventListener('click', () => this.hideSaleModal());

        // modulo de usuarios (eventos)
        document.getElementById('user-form').addEventListener('submit', async (e) => await this.handleUserSubmit(e));
        document.getElementById('close-user-modal').addEventListener('click', () => this.hideUserModal());
        document.getElementById('cancel-user-btn').addEventListener('click', () => this.hideUserModal());

        // modulo de confirmacion (eventos)
        document.getElementById('close-confirm-modal').addEventListener('click', () => this.hideConfirmModal());
        document.getElementById('cancel-confirm-btn').addEventListener('click', () => this.hideConfirmModal());
        document.getElementById('confirm-btn').addEventListener('click', () => {
            if (this.confirmCallback) this.confirmCallback();
            this.hideConfirmModal();
        });

        // configurar fecha por defecto en el modulo de ventas
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('sale-date').value = today;
    }

    // mirar modulo de ventas
    showSaleModal() {
        document.getElementById('sale-modal-title').textContent = 'Agregar Nueva Venta';
        document.getElementById('sale-form').reset();
        document.getElementById('sale-id').value = '';
        
        // Configurar fecha por defecto
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('sale-date').value = today;
        
        document.getElementById('sale-modal').classList.remove('hidden');
    }

    hideSaleModal() {
        document.getElementById('sale-modal').classList.add('hidden');
    }

    async editSale(saleId) {
        const sales = await this.app.db.getSalesForUser(this.app.db.currentUser.id, this.app.db.currentUser.role);
        const sale = sales.find(s => s.id === saleId);
        if (!sale || (this.app.db.currentUser.role !== 'ADMIN' && sale.userId !== this.app.db.currentUser.id)) {
            return;
        }
        
        document.getElementById('sale-modal-title').textContent = 'Editar Venta';
        document.getElementById('sale-id').value = sale.id;
        document.getElementById('sale-date').value = sale.saleDate;
        document.getElementById('reservation-code').value = sale.reservationCode;
        document.getElementById('client-name').value = sale.clientName;
        document.getElementById('sale-amount').value = sale.saleAmount;
        document.getElementById('sale-commission').value = sale.commission;
        
        document.getElementById('sale-modal').classList.remove('hidden');
    }

    calculateCommission() {
        const amount = parseFloat(document.getElementById('sale-amount').value) || 0;
        const commission = amount * 0.3;
        document.getElementById('sale-commission').value = commission.toFixed(2);
    }

    handleSaleSubmit(e) {
        e.preventDefault();
        
        const saleData = {
            saleDate: document.getElementById('sale-date').value,
            reservationCode: document.getElementById('reservation-code').value,
            clientName: document.getElementById('client-name').value,
            saleAmount: document.getElementById('sale-amount').value,
            commission: document.getElementById('sale-commission').value
        };
        
        if (document.getElementById('sale-id').value) {
            // Actualizar venta existente
            if (this.app.db.updateSale(parseInt(document.getElementById('sale-id').value), saleData)) {
                this.app.sales.update();
                this.app.dashboard.update();
                this.hideSaleModal();
            }
        } else {
            // Agreagar nueva venta
            this.app.db.addSale(saleData);
            this.app.sales.update();
            this.app.dashboard.update();
            this.hideSaleModal();
        }
    }

    // mirar modulo de usuarios
    showUserModal() {
        document.getElementById('user-modal-title').textContent = 'Agregar Nuevo Usuario';
        document.getElementById('user-form').reset();
        document.getElementById('user-id').value = '';
        document.getElementById('new-user-password').required = true;
        
        document.getElementById('user-modal').classList.remove('hidden');
    }

    hideUserModal() {
        document.getElementById('user-modal').classList.add('hidden');
    }

    async editUser(userId) {
        // Obtener usuarios desde MySQL
        const users = await this.app.db.getUsers();
        const user = users.find(u => u.id_usuario === userId);
        if (!user || userId === this.app.db.currentUser.id) return;
        
        document.getElementById('user-modal-title').textContent = 'Editar Usuario';
        document.getElementById('user-id').value = user.id_usuario;
        document.getElementById('new-user-name').value = user.nombre;
        document.getElementById('new-user-email').value = user.email;
        document.getElementById('new-user-password').required = false;
        document.getElementById('new-user-role').value = user.rol.toUpperCase();
        
        document.getElementById('user-modal').classList.remove('hidden');
    }

    async handleUserSubmit(e) {
        e.preventDefault();
        if (this.app.db.currentUser.role !== 'ADMIN') return;
        
        const userId = document.getElementById('user-id').value ? parseInt(document.getElementById('user-id').value) : null;
        const name = document.getElementById('new-user-name').value;
        const email = document.getElementById('new-user-email').value;
        const password = document.getElementById('new-user-password').value;
        const role = document.getElementById('new-user-role').value;
        
        if (userId) {
            // actualizar usuario existente
            const userData = { nombre: name, email: email, role: role.toLowerCase() };
            if (password) {
                userData.password = password;
            }
            
            const success = await this.app.db.updateUser(userId, userData);
            if (success) {
                await this.app.users.refresh();
                this.hideUserModal();
            } else {
                alert('Error al actualizar el usuario.');
            }
        } else {
            // Agregar nuevo usuario
            const user = await this.app.db.register(name, email, password, role);
            if (user) {
                await this.app.users.refresh();
                this.hideUserModal();
            } else {
                alert('Error al registrar el usuario.');
            }
        }
    }

    // mensaje de confirmacion
    showConfirmModal(message, callback) {
        document.getElementById('confirm-message').textContent = message;
        this.confirmCallback = callback;
        document.getElementById('confirm-modal').classList.remove('hidden');
    }

    hideConfirmModal() {
        document.getElementById('confirm-modal').classList.add('hidden');
        this.confirmCallback = null;
    }

    confirmDeleteSale(saleId) {
        this.showConfirmModal('¿Estás seguro que deseas eliminar esta venta?', async () => {
            const success = await this.app.db.deleteSale(saleId);
            if (success) {
                await this.app.sales.refresh();
                if (this.app.currentView === 'dashboard') {
                    await this.app.dashboard.show();
                }
                this.hideConfirmModal();
            } else {
                alert('Error al eliminar la venta.');
            }
        });
    }

    confirmDeleteUser(userId) {
        this.showConfirmModal('¿Estás seguro que deseas eliminar este usuario?', async () => {
            const success = await this.app.db.deleteUser(userId);
            if (success) {
                await this.app.users.refresh();
                this.hideConfirmModal();
            } else {
                alert('Error al eliminar el usuario.');
            }
        });
    }
}
