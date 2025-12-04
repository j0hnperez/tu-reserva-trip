// Reports Component
class Reports {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('reports-container');
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div id="reports-section" class="hidden">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">Reportes</h1>
                
                <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-medium">Ventas por Asesor</h2>
                        <div class="flex space-x-4">
                            <div class="flex items-center">
                                <label for="report-start-date" class="mr-2 text-sm">Desde:</label>
                                <input type="date" id="report-start-date" class="border rounded-md px-2 py-1 text-sm">
                            </div>
                            <div class="flex items-center">
                                <label for="report-end-date" class="mr-2 text-sm">Hasta:</label>
                                <input type="date" id="report-end-date" class="border rounded-md px-2 py-1 text-sm">
                            </div>
                            <button id="generate-report-btn" class="px-4 py-1 bg-indigo-600 text-white rounded-md text-sm">
                                Generar
                            </button>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <div class="h-80">
                                <img src="https://placehold.co/600x400" alt="Gráfico de barras mostrando las ventas por asesor, con barras de colores diferentes para cada representante" class="w-full h-full object-contain">
                            </div>
                        </div>
                        <div>
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Asesor
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ventas
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Comisión
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200" id="reports-table-body">
                                        <!-- Report data will be inserted here by JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-medium mb-4">Ventas por Día</h2>
                    <div class="h-96">
                        <img src="https://placehold.co/1200x500" alt="Gráfico de líneas mostrando la evolución de ventas día a día con una línea azul sobre fondo blanco" class="w-full h-full object-contain">
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        document.getElementById('generate-report-btn').addEventListener('click', () => this.generateReport());
        
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('report-start-date').value = today;
        document.getElementById('report-end-date').value = today;
    }

    generateReport() {
        if (this.app.db.currentUser.role !== 'ADMIN') return;
        
        const startDate = document.getElementById('report-start-date').value;
        const endDate = document.getElementById('report-end-date').value;
        
        const report = this.app.db.getSalesReport(startDate, endDate);
        const reportsTableBody = document.getElementById('reports-table-body');
        reportsTableBody.innerHTML = '';
        
        Object.values(report).forEach(data => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <img src="https://placehold.co/30x30" alt="Foto en miniatura del asesor ${data.advisor}" class="h-6 w-6 rounded-full mr-2">
                        ${data.advisor}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${data.salesCount}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $${data.totalSales.toFixed(2)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $${data.totalCommission.toFixed(2)}
                </td>
            `;
            
            reportsTableBody.appendChild(row);
        });
    }

    show() {
        document.getElementById('reports-section').classList.remove('hidden');
        this.generateReport();
    }

    hide() {
        document.getElementById('reports-section').classList.add('hidden');
    }
}
