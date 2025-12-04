// Controlador principal de la aplicacion
class App {
    constructor() {
        this.db = new DatabaseMySQL();
        this.currentView = 'dashboard';
        
        this.initElements();
        this.initComponents();
        this.bindEvents();
        
        this.checkAuth();
    }
    
    initElements() {
        // Elementos principales de la aplicacion
        this.authScreen = document.getElementById('auth-screen');
        this.appContainer = document.getElementById('app-container');
        this.loginForm = document.getElementById('login-form');
        this.registerForm = document.getElementById('register-form');
        this.showRegisterBtn = document.getElementById('show-register');
        this.showLoginBtn = document.getElementById('show-login');
    }

    initComponents() {
        // Inicializar componentes de la aplicacion
        this.sidebar = new Sidebar(this);
        this.dashboard = new Dashboard(this);
        this.sales = new Sales(this);
        this.reports = new Reports(this);
        this.users = new Users(this);
        this.modals = new Modals(this);
    }
    
    bindEvents() {
        // Automatizar eventos de autenticacion
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.registerForm.addEventListener('submit', async (e) => await this.handleRegister(e));
        this.showRegisterBtn.addEventListener('click', () => this.showRegisterForm(true));
        this.showLoginBtn.addEventListener('click', () => this.showRegisterForm(false));
    }
            
    checkAuth() {
        if (this.db.currentUser) {
            this.showApp();
        } else {
            this.showAuth();
        }
    }
    
    showAuth() {
        this.authScreen.classList.remove('hidden');
        this.appContainer.classList.add('hidden');
        this.showRegisterForm(false);
    }
    
    async showApp() {
        console.log('🔍 showApp - Current user:', this.db.currentUser);
        this.authScreen.classList.add('hidden');
        this.appContainer.classList.remove('hidden');
        this.sidebar.updateUserInfo(this.db.currentUser);
        await this.showView(this.currentView);
    }
    
    showRegisterForm(show) {
        this.loginForm.classList.toggle('hidden', show);
        this.registerForm.classList.toggle('hidden', !show);
    }
    
    async showView(viewName) {
        // ocultar todas las vistas
        this.dashboard.hide();
        this.sales.hide();
        this.reports.hide();
        this.users.hide();
        
        this.currentView = viewName;
        this.sidebar.setActiveLink(viewName);
        
        // mostrar la vista seleccionada
        switch (viewName) {
            case 'dashboard':
                await this.dashboard.show();
                break;
            case 'sales':
                await this.sales.show();
                break;
            case 'reports':
                this.reports.show();
                break;
            case 'users':
                await this.users.show();
                break;
        }
    }
            
    // Autenticacion
    async handleLogin(e) {
        e.preventDefault();
        
        const email = this.loginForm.querySelector('#email').value;
        const password = this.loginForm.querySelector('#password').value;
        const role = this.loginForm.querySelector('#role').value;
        
        const result = await this.db.authenticate(email, password, role);
        
        if (result.success) {
            await this.showApp();
        } else {
            alert(result.message || 'Credenciales incorrectas. Por favor intente nuevamente.');
        }
    }
    
    async handleRegister(e) {
        e.preventDefault();
        
        const name = 'Nuevo Usuario'; // In a real app, you would collect this from the form
        const email = this.registerForm.querySelector('#reg-email').value;
        const password = this.registerForm.querySelector('#reg-password').value;
        const confirmPassword = this.registerForm.querySelector('#reg-confirm-password').value;
        const role = this.registerForm.querySelector('#reg-role').value;
        console.log('🔍 handleRegister - Rol del formulario:', role);
        console.log('🔍 handleRegister - Todos los datos:', {name, email, role});
        
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        
        const user = await this.db.register(name, email, password, role);
        console.log('🔍 handleRegister - Usuario devuelto:', user);
        if (user) {
            this.db.currentUser = user;
            console.log('🔍 handleRegister - Current user asignado:', this.db.currentUser);
            this.showApp();
        } else {
            alert('Error al registrar el usuario. El correo ya puede estar en uso.');
        }
    }
    
    handleLogout() {
        this.db.currentUser = null;
        this.showAuth();
    }
            
}

// Inicializar la aplicacion una vez que el DOM este cargado
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
