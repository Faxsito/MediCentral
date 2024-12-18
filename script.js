document.addEventListener("DOMContentLoaded", () => {
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const signinBx = document.getElementById('signinBx');
    const signupBx = document.getElementById('signupBx');

    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModal = document.getElementById('closeModal');

    // Función para mostrar la ventana emergente
    function showModal(message) {
        modalMessage.textContent = message; // Mensaje dinámico
        modal.style.display = 'flex'; // Mostrar modal
    }

    // Cerrar la ventana emergente
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Ocultar modal si se hace clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Alternar entre inicio de sesión y registro
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        signinBx.classList.remove('active');
        signinBx.classList.add('inactive');
        signupBx.classList.remove('inactive');
        signupBx.classList.add('active');
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupBx.classList.remove('active');
        signupBx.classList.add('inactive');
        signinBx.classList.remove('inactive');
        signinBx.classList.add('active');
    });

    // Registro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('registerUser').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPass').value;

        if (user && email && password) {
            localStorage.setItem('user', JSON.stringify({ user, email, password }));
            showModal('Registro exitoso. Ahora puedes iniciar sesión.');
            showLogin.click();
        } else {
            showModal('Por favor, completa todos los campos.');
        }
    });

    // Inicio de sesión
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUser').value;
        const password = document.getElementById('loginPass').value;

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.user === username && storedUser.password === password) {
            showModal(`Inicio de sesión exitoso. Bienvenido, ${storedUser.user}.`);
            setTimeout(() => {
                window.location.href = 'medico.html'; // Redirigir a la página de médico
            }, 1500);
        } else {
            showModal('Usuario o contraseña incorrectos.');
        }
    });
});
const emailField = document.getElementById('registerEmail');
const emailValidation = document.getElementById('emailValidation');

emailField.addEventListener('input', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailField.value)) {
        emailValidation.textContent = 'Correo válido.';
        emailValidation.style.color = 'green';
    } else {
        emailValidation.textContent = 'Por favor, ingresa un correo válido.';
        emailValidation.style.color = 'red';
    }
});

