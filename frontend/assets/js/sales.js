// Sales Component
class Sales {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('sales-container');
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div id="sales-section" class="hidden">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">Gestión de Ventas</h1>
                    <button id="add-sale-btn" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        <i class="fas fa-plus mr-2"></i> Nueva Venta
                    </button>
                </div>
                
                <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center space-x-2">
                            <label for="filter-date" class="text-sm font-medium">Filtrar por fecha:</label>
                            <input type="date" id="filter-date" class="border rounded-md px-2 py-1 text-sm">
                        </div>
                        <div>
                            <input type="text" id="search-sales" placeholder="Buscar ventas..." class="border rounded-md px-3 py-1 text-sm w-64">
                        </div>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Código
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha Venta
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Comisión (30%)
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Asesor
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="sales-table-body">
                                <!-- Sales will be inserted here by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="flex justify-between items-center mt-4">
                        <div class="text-sm text-gray-500">
                            Mostrando <span id="showing-from">1</span> a <span id="showing-to">10</span> de <span id="total-entries">50</span> entradas
                        </div>
                        <div class="flex space-x-2">
                            <button class="px-3 py-1 border rounded-md text-sm hover:bg-gray-50" id="prev-page">
                                Anterior
                            </button>
                            <button class="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm" id="page-1">
                                1
                            </button>
                            <button class="px-3 py-1 border rounded-md text-sm hover:bg-gray-50" id="page-2">
                                2
                            </button>
                            <button class="px-3 py-1 border rounded-md text-sm hover:bg-gray-50" id="next-page">
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        document.getElementById('add-sale-btn').addEventListener('click', () => this.app.modals.showSaleModal());
    }

    async update() {
        const salesTableBody = document.getElementById('sales-table-body');
        salesTableBody.innerHTML = '';
        
        const sales = await this.app.db.getSalesForUser(this.app.db.currentUser.id, this.app.db.currentUser.role);
        
        // Asegurar que sales es un array
        const salesArray = Array.isArray(sales) ? sales : [];
        
        salesArray.forEach(sale => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${sale.reservationCode}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${this.formatDate(sale.saleDate)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${sale.clientName}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $${sale.saleAmount.toFixed(2)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $${sale.commission.toFixed(2)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${sale.advisorName}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-indigo-600 hover:text-indigo-900 edit-sale mr-3" data-id="${sale.id}">Editar</button>
                    <button class="text-red-600 hover:text-red-900 delete-sale" data-id="${sale.id}">Eliminar</button>
                </td>
            `;
            
            salesTableBody.appendChild(row);
        });
        
        // Agregar eventos a botones de editar y eliminar
        document.querySelectorAll('.edit-sale').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const saleId = parseInt(e.target.getAttribute('data-id'));
                this.app.modals.editSale(saleId);
            });
        });
        
        document.querySelectorAll('.delete-sale').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const saleId = parseInt(e.target.getAttribute('data-id'));
                this.app.modals.confirmDeleteSale(saleId);
            });
        });
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    async show() {
        document.getElementById('sales-section').classList.remove('hidden');
        await this.update();
    }

    hide() {
        document.getElementById('sales-section').classList.add('hidden');
    }
}
