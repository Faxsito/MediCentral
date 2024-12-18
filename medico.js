document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const overlay = document.getElementById("overlay");
    const menu = document.getElementById("menu");
    const userAvatar = document.getElementById("userAvatar"); // Ícono de perfil
    const homeLink = document.getElementById("homeLink"); // Enlace Inicio
    const patientsLink = document.getElementById("patientsLink"); // Enlace Pacientes
    const closeMenuBtn = document.getElementById("close-menu"); // Botón de cerrar menú
    const menuItems = menu.querySelectorAll("li"); // Todos los elementos del menú
    const patientsList = document.getElementById("patients-list"); // Contenedor de pacientes

    // Abrir y cerrar el menú al hacer clic en el icono de hamburguesa
    hamburgerMenu.addEventListener("click", () => {
        menu.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    // Cerrar el menú cuando se haga clic en el overlay
    overlay.addEventListener("click", () => {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Redirigir al perfil del usuario al hacer clic en el ícono de perfil
    userAvatar.addEventListener("click", () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            // Redirigir al perfil con datos del usuario
            window.location.href = `perfil.html?user=${storedUser.user}`;
        } else {
            alert("No hay un usuario autenticado.");
        }
    });

    // Funcionalidad de "Inicio" (recargar la página)
    homeLink.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveMenuItem(homeLink); // Marcar como activo
        window.location.reload(); // Recargar la página
    });

    // Funcionalidad de "Pacientes" (redirigir a pacientes.html)
    patientsLink.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveMenuItem(patientsLink); // Marcar como activo
        window.location.href = "pacientes.html"; // Redirigir a la página de pacientes
    });

    // Funcionalidad de cerrar el menú con el botón "Cerrar Menú"
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener("click", () => {
            menu.classList.remove("active");
            overlay.classList.remove("active");
        });
    }

    // Función para marcar un elemento del menú como activo
    function setActiveMenuItem(activeItem) {
        menuItems.forEach((item) => {
            item.classList.remove("active");
        });
        activeItem.parentElement.classList.add("active");
    }
});

// Lista simulada de pacientes
const patients = [
    { name: "Juan Pérez", age: 45, medicalRecord: "Historial médico de Juan..." },
    { name: "Ana Gómez", age: 30, medicalRecord: "Historial médico de Ana..." },
    { name: "Carlos Martínez", age: 55, medicalRecord: "Historial médico de Carlos..." },
    { name: "Laura Sánchez", age: 40, medicalRecord: "Historial médico de Laura..." },
    { name: "Pedro López", age: 60, medicalRecord: "Historial médico de Pedro..." },
];

// Función para mostrar pacientes (solo cuando se realiza la búsqueda)
function displayPatients(filteredPatients) {
    const patientsList = document.getElementById("patients-list");
    patientsList.innerHTML = ""; // Limpiar los resultados anteriores

    // Si no hay coincidencias, mostrar un mensaje
    if (filteredPatients.length === 0) {
        patientsList.innerHTML = "<p>No se encontraron pacientes con ese nombre.</p>";
    } else {
        // Mostrar los pacientes encontrados
        filteredPatients.forEach((patient) => {
            const div = document.createElement("div");
            div.classList.add("patient");
            div.innerHTML = `<strong>${patient.name}</strong><br>Edad: ${patient.age}<br>`;
            div.addEventListener("click", () => {
                alert(patient.medicalRecord); // Mostrar historial médico al hacer clic
            });
            patientsList.appendChild(div);
        });
    }

    // Mostrar la lista si hay resultados
    if (filteredPatients.length > 0) {
        patientsList.style.display = "block"; // Mostrar la lista si hay coincidencias
        patientsList.classList.add("show");
    } else {
        patientsList.style.display = "none"; // Ocultar la lista si no hay coincidencias
    }
}

// Función de búsqueda (filtrar pacientes en tiempo real)
function searchPatient() {
    const query = document.getElementById("search").value.toLowerCase(); // Obtener el texto de búsqueda

    // Si el campo de búsqueda está vacío, no mostrar nada
    if (query === "") {
        const patientsList = document.getElementById("patients-list");
        patientsList.innerHTML = ""; // Limpiar la lista
        patientsList.style.display = "none"; // Ocultar la lista
        patientsList.classList.remove("show");
        return;
    }

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(query)
    );
    displayPatients(filteredPatients); // Mostrar los pacientes filtrados
}
