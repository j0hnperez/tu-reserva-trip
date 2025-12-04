// Dashboard Component
class Dashboard {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('dashboard-container');
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div id="dashboard-section">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow-md p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                                <i class="fas fa-shopping-cart text-xl"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Total Ventas</p>
                                <h3 class="text-2xl font-bold" id="total-sales">0</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                                <i class="fas fa-dollar-sign text-xl"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Total Comisiones</p>
                                <h3 class="text-2xl font-bold" id="total-commissions">$0</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                                <i class="fas fa-user text-xl"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Mi Balance</p>
                                <h3 class="text-2xl font-bold" id="user-balance">$0</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                                <i class="fas fa-calendar-day text-xl"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Ventas Hoy</p>
                                <h3 class="text-2xl font-bold" id="today-sales">0</h3>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-medium">Resumen de Ventas</h3>
                            <div class="flex space-x-2">
                                <button class="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200">
                                    Hoy
                                </button>
                                <button class="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md">
                                    Semana
                                </button>
                                <button class="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200">
                                    Mes
                                </button>
                            </div>
                        </div>
                        <div class="h-64">
                            <img src="" alt="Gráfico de líneas mostrando el resumen de ventas por día con una tendencia ascendente en azul" class="w-full h-full object-contain">
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-lg font-medium mb-4">Últimas Ventas</h3>
                        <div class="space-y-4" id="recent-sales">
                            <!-- Recent sales will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async update() {
        const sales = await this.app.db.getSalesForUser(this.app.db.currentUser.id, this.app.db.currentUser.role);
        const today = new Date().toISOString().split('T')[0];
        
        // Asegurar que sales es un array
        const salesArray = Array.isArray(sales) ? sales : [];
        
        // Total ventas
        document.getElementById('total-sales').textContent = salesArray.length;
        
        // Total comisiones
        const totalCommissions = salesArray.reduce((sum, sale) => sum + (sale.commission || 0), 0);
        document.getElementById('total-commissions').textContent = '$' + totalCommissions.toFixed(2);
        
        // balance de ventas (por asesor)
        if (this.app.db.currentUser.role === 'ASESOR') {
            document.getElementById('user-balance').textContent = '$' + totalCommissions.toFixed(2);
        } else {
            document.getElementById('user-balance').textContent = 'N/A';
        }
        
        // Ventas del día
        const todaySales = sales.filter(sale => sale.saleDate === today).length;
        document.getElementById('today-sales').textContent = todaySales;
        
        // ventas recientes
        this.updateRecentSales(sales);
    }

    updateRecentSales(sales) {
        const recentSalesEl = document.getElementById('recent-sales');
        recentSalesEl.innerHTML = '';
        
        const recentSales = [...sales].sort((a, b) => new Date(b.registerDate) - new Date(a.registerDate)).slice(0, 3);
        
        recentSales.forEach(sale => {
            const saleEl = document.createElement('div');
            saleEl.className = 'border-b pb-2';
            
            const timeDiff = this.formatTimeDifference(new Date(sale.registerDate));
            
            saleEl.innerHTML = `
                <div class="flex justify-between text-sm">
                    <p class="font-medium">${sale.reservationCode}</p>
                    <p class="text-gray-500">${timeDiff}</p>
                </div>
                <p class="text-sm">Cliente: ${sale.clientName}</p>
                <p class="text-sm font-medium text-indigo-600">$${sale.saleAmount.toFixed(2)}</p>
            `;
            
            recentSalesEl.appendChild(saleEl);
        });
    }

    formatTimeDifference(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) {
            return `Hace ${diffInSeconds} segundos`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `Hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `Hace ${hours} hora${hours !== 1 ? 's' : ''}`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `Hace ${days} día${days !== 1 ? 's' : ''}`;
        }
    }

    async show() {
        document.getElementById('dashboard-section').classList.remove('hidden');
        await this.update();
    }

    hide() {
        document.getElementById('dashboard-section').classList.add('hidden');
    }
}
