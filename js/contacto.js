// Manejo del formulario de contacto
const formularioContacto = document.getElementById('formularioContacto');
const mensajeExito = document.getElementById('mensajeExito');

formularioContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulamos un "envío"
    formularioContacto.reset();
    mensajeExito.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeExito.style.display = 'none';
    }, 3000);
});
