// JavaScript para alternar la visibilidad del menú y el overlay
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const overlay = document.getElementById('overlay'); 
    const menu = document.getElementById('menu');

    // Abrir y cerrar el menú al hacer clic en el icono de hamburguesa
    hamburgerMenu.addEventListener('click', () => {
        menu.classList.toggle('active'); // Abre o cierra el menú
        overlay.classList.toggle('active'); // Muestra o oculta el overlay (oscurecer el fondo)
    });

    // Cerrar el menú cuando se haga clic en el overlay
    overlay.addEventListener('click', () => {
        menu.classList.remove('active'); // Cerrar el menú
        overlay.classList.remove('active'); // Ocultar el overlay
    });
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
    const patientsList = document.getElementById('patients-list');
    patientsList.innerHTML = '';  // Limpiar los resultados anteriores

    // Si no hay coincidencias, mostrar un mensaje
    if (filteredPatients.length === 0) {
        patientsList.innerHTML = "<p>No se encontraron pacientes con ese nombre.</p>";
    } else {
        // Mostrar los pacientes encontrados
        filteredPatients.forEach(patient => {
            const div = document.createElement('div');
            div.classList.add('patient');
            div.innerHTML = `<strong>${patient.name}</strong><br>Edad: ${patient.age}<br>`;
            div.addEventListener('click', () => {
                alert(patient.medicalRecord); // Mostrar el historial médico al hacer clic
            });
            patientsList.appendChild(div);
        });
    }

    // Mostrar la lista si hay resultados
    if (filteredPatients.length > 0) {
        patientsList.classList.add('show'); // Mostrar la lista si hay coincidencias
    } else {
        patientsList.classList.remove('show'); // Si no hay coincidencias, ocultar la lista
    }
}

// Función de búsqueda (filtrar pacientes en tiempo real)
function searchPatient() {
    const query = document.getElementById('search').value.toLowerCase(); // Obtener el texto de búsqueda

    // Si el campo de búsqueda está vacío, no mostrar nada
    if (query === "") {
        document.getElementById('patients-list').innerHTML = ''; // Limpiar la lista
        document.getElementById('patients-list').classList.remove('show'); // Asegurarse de que la lista esté oculta
        return;
    }

    const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(query)); // Filtrar pacientes
    displayPatients(filteredPatients);  // Mostrar los pacientes filtrados
}

// Inicialmente, no mostrar pacientes hasta que el usuario escriba algo
