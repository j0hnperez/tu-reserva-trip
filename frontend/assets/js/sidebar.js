// componentes de la barra lateral
class Sidebar {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('sidebar-container');
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="fixed inset-y-0 left-0 w-64 bg-indigo-800 text-white shadow-lg">
                <div class="container-img p-4">
                    <img src="assets/img/LogoRT2L.png" alt="Logo de la empresa en letras blancas sobre fondo azul oscuro" class="h-8">
                </div>
                <div class="p-4 flex flex-col h-[calc(100%-4rem)]">
                    <div class="flex items-center space-x-4 p-4 mb-6">
                        <img src="https://placehold.co/40x40" alt="Foto de perfil del usuario" id="user-avatar" class="h-10 w-10 rounded-full">
                        <div>
                            <p class="font-medium" id="user-name">Nombre Usuario</p>
                            <p class="text-xs text-indigo-200" id="user-role">Rol</p>
                        </div>
                    </div>
                    
                    <nav class="flex-1 space-y-1">
                        <a href="#" class="nav-link block px-4 py-2 rounded-md hover:bg-indigo-700" id="dashboard-link">
                            <i class="fas fa-tachometer-alt mr-3"></i> Dashboard
                        </a>
                        <a href="#" class="nav-link block px-4 py-2 rounded-md hover:bg-indigo-700" id="sales-link">
                            <i class="fas fa-shopping-cart mr-3"></i> Ventas
                        </a>
                        <div id="admin-links" class="space-y-1 mt-4 hidden">
                            <a href="#" class="nav-link block px-4 py-2 rounded-md hover:bg-indigo-700" id="reports-link">
                                <i class="fas fa-chart-bar mr-3"></i> Reportes
                            </a>
                            <a href="#" class="nav-link block px-4 py-2 rounded-md hover:bg-indigo-700" id="users-link">
                                <i class="fas fa-users mr-3"></i> Usuarios
                            </a>
                        </div>
                    </nav>
                    
                    <div class="mt-auto">
                        <button id="logout-btn" class="w-full text-left px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
                            <i class="fas fa-sign-out-alt mr-3"></i> Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // eventos de navegacion
        document.getElementById('dashboard-link').addEventListener('click', (e) => { 
            e.preventDefault(); 
            this.app.showView('dashboard'); 
        });
        document.getElementById('sales-link').addEventListener('click', (e) => { 
            e.preventDefault(); 
            this.app.showView('sales'); 
        });
        document.getElementById('reports-link').addEventListener('click', (e) => { 
            e.preventDefault(); 
            this.app.showView('reports'); 
        });
        document.getElementById('users-link').addEventListener('click', (e) => { 
            e.preventDefault(); 
            this.app.showView('users'); 
        });
        
        // evento de cierre de sesion
        document.getElementById('logout-btn').addEventListener('click', () => this.app.handleLogout());
    }

    updateUserInfo(user) {
        console.log('🔍 sidebar.updateUserInfo - User recibido:', user);
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-role').textContent = user.role === 'ADMIN' ? 'Administrador' : 'Asesor';
        document.getElementById('user-avatar').src = user.avatar || 'https://placehold.co/40x40';
        
        // mostrar enlaces de admin solo si el usuario es admin
        const isAdmin = user.role === 'ADMIN';
        console.log('🔍 sidebar.updateUserInfo - ¿Es admin?', isAdmin);
        document.getElementById('admin-links').classList.toggle('hidden', !isAdmin);
    }

    setActiveLink(viewName) {
        // Remover clase activa de todos los enlaces
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('bg-indigo-700');
        });
        
        // Agregar clase activa al enlace correspondiente
        const activeLink = document.getElementById(`${viewName}-link`);
        if (activeLink) {
            activeLink.classList.add('bg-indigo-700');
        }
    }
}
