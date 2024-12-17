// Alternar entre pantallas de Registro e Inicio de Sesión
document.addEventListener("DOMContentLoaded", () => {
    const showRegister = document.getElementById('showRegister');  // Enlace para mostrar Registro
    const showLogin = document.getElementById('showLogin');  // Enlace para mostrar Inicio de sesión
    const signinBx = document.getElementById('signinBx');  // Sección de Inicio de sesión
    const signupBx = document.getElementById('signupBx');  // Sección de Registro

    // Mostrar formulario de Registro
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();  // Evita que se recargue la página
        signinBx.style.display = 'none';  // Oculta el formulario de inicio de sesión
        signupBx.style.display = 'flex';  // Muestra el formulario de registro
    });

    // Mostrar formulario de Inicio de Sesión
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();  // Evita que se recargue la página
        signupBx.style.display = 'none';  // Oculta el formulario de registro
        signinBx.style.display = 'flex';  // Muestra el formulario de inicio de sesión
    });

    // Manejo del Registro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Evita que se recargue la página
        const user = document.getElementById('registerUser').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPass').value;

        if (user && email && password) {
            // Guardar usuario en localStorage (simulación)
            localStorage.setItem('user', JSON.stringify({ user, email, password }));
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            showLogin.click();  // Cambia a la pantalla de inicio de sesión
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    // Manejo del Inicio de Sesión
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Evita que se recargue la página
        const username = document.getElementById('loginUser').value;
        const password = document.getElementById('loginPass').value;

        // Verificar con localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.user === username && storedUser.password === password) {
            alert(`Inicio de sesión exitoso. Bienvenido, ${storedUser.user}.`);
            window.location.href = 'medico.html';  // Redirigir a la página de médico
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });
});