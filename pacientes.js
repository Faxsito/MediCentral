// Obtener los elementos
const hamburgerMenu = document.getElementById("hamburger-menu");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");
const closeMenuButton = document.getElementById("close-menu");

// Mostrar el menú cuando se hace clic en el icono de menú
hamburgerMenu.addEventListener("click", () => {
    menu.style.left = "0";  // Abrir el menú
    overlay.classList.add("active");  // Mostrar el overlay
});

// Cerrar el menú al hacer clic en "Cerrar Menú"
closeMenuButton.addEventListener("click", () => {
    menu.style.left = "-250px";  // Cerrar el menú
    overlay.classList.remove("active");  // Ocultar el overlay
});

// Cerrar el menú si se hace clic en el overlay
overlay.addEventListener("click", () => {
    menu.style.left = "-250px";  // Cerrar el menú
    overlay.classList.remove("active");  // Ocultar el overlay
});

// Lista simulada de pacientes
const patients = [
    { name: "Juan Pérez", age: 45 },
    { name: "Ana Gómez", age: 30 },
    { name: "Carlos Martínez", age: 55 },
    { name: "Laura Sánchez", age: 40 },
    { name: "Pedro López", age: 60 }
];

// Mostrar los pacientes en la página
const patientsList = document.getElementById("patients-list");

patients.forEach(patient => {
    const patientElement = document.createElement("div");
    patientElement.classList.add("patient");
    patientElement.innerHTML = `
        <p><strong>${patient.name}</strong></p>
        <p>Edad: ${patient.age}</p>
    `;
    patientsList.appendChild(patientElement);
});
