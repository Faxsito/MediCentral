document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileDomicilio = document.getElementById('profileDomicilio');
    const profileRut = document.getElementById('profileRut');
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');
    const logoutButton = document.getElementById('logoutButton');
    const backToMedicoButton = document.getElementById('backToMedicoButton'); // Nuevo botón

    const emailError = document.getElementById('emailError');
    const domicilioError = document.getElementById('domicilioError');
    const rutError = document.getElementById('rutError');

    // Obtener los datos del usuario desde localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        profileName.textContent = storedUser.user; // Nombre del usuario
        profileEmail.value = storedUser.email; // Correo del usuario
        profileDomicilio.value = storedUser.domicilio; // Domicilio del usuario
        profileRut.value = storedUser.rut; // RUT del usuario
    } else {
        alert('No hay un usuario autenticado.');
        window.location.href = 'index.html'; // Redirigir al inicio de sesión
    }

    // Habilitar campos para editar
    editButton.addEventListener('click', () => {
        profileEmail.disabled = false;
        profileDomicilio.disabled = false;
        profileRut.disabled = false;
        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';
    });

    // Función para validar el correo electrónico
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Función para validar el domicilio (solo letras y espacios)
    function validateDomicilio(domicilio) {
        const domicilioRegex = /^[a-zA-Z\s]+$/;
        return domicilioRegex.test(domicilio);
    }

    // Función para validar el RUT chileno (formato: 12.345.678-9)
    function validateRut(rut) {
        const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]{1}$/;
        return rutRegex.test(rut);
    }

    // Mostrar el mensaje de error en la parte superior del campo
    function showErrorMessage(fieldError) {
        fieldError.style.display = 'block';
    }

    // Ocultar los mensajes de error
    function hideErrorMessage(fieldError) {
        fieldError.style.display = 'none';
    }

    // Guardar los cambios realizados
    saveButton.addEventListener('click', () => {
        const email = profileEmail.value;
        const domicilio = profileDomicilio.value;
        const rut = profileRut.value;

        let valid = true;

        // Validación de campos
        if (!validateEmail(email)) {
            showErrorMessage(emailError);
            valid = false;
        } else {
            hideErrorMessage(emailError);
        }

        if (!validateDomicilio(domicilio)) {
            showErrorMessage(domicilioError);
            valid = false;
        } else {
            hideErrorMessage(domicilioError);
        }

        if (!validateRut(rut)) {
            showErrorMessage(rutError);
            valid = false;
        } else {
            hideErrorMessage(rutError);
        }

        // Si todo es válido, guardar los cambios
        if (valid) {
            const updatedUser = {
                user: storedUser.user,
                email: email,
                password: storedUser.password, // Mantener la contraseña sin cambios
                domicilio: domicilio,
                rut: rut
            };

            // Guardar los datos actualizados en localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser));
            alert('Información actualizada con éxito.');

            // Deshabilitar los campos y ocultar el botón "Guardar"
            profileEmail.disabled = true;
            profileDomicilio.disabled = true;
            profileRut.disabled = true;
            saveButton.style.display = 'none';
            editButton.style.display = 'inline-block';
        }
    });

    // Cerrar sesión
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user'); // Eliminar los datos del usuario
        alert('Has cerrado sesión.');
        window.location.href = 'index.html'; // Redirigir al inicio de sesión
    });

    // Volver a la página del médico
    backToMedicoButton.addEventListener('click', () => {
        window.location.href = 'medico.html'; // Redirigir a la página del médico
    });
});
