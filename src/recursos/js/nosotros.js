
const formulario = document.getElementById('formulario-contacto');
const nombre = document.getElementById('nombre');
const mensaje = document.getElementById('mensaje');
const mensajeValidacion = document.getElementById('mensaje-validacion');

formulario.addEventListener('submit', function(event) {

    event.preventDefault();

    try {

        // Validar que los campos no estén vacíos
        if (nombre.value.trim() === '' ||
            mensaje.value.trim() === '') {

            mensajeValidacion.textContent = 'Por favor, complete todos los campos';
            return;

        }

        

        // Crear el mensaje para WhatsApp
        const numeroWhatsApp = '5493517529217';

        const textoWhatsApp =
            'Hola, soy ' + nombre.value.trim() +
            '. Mi consulta es: ' + mensaje.value.trim();

        // Codificar el mensaje para la URL
        const mensajeCodificado = encodeURIComponent(textoWhatsApp);

        // Abrir WhatsApp con el mensaje preparado
        const enlace = 'https://wa.me/' + numeroWhatsApp + '?text=' + mensajeCodificado;

        window.open(enlace, '_blank');

        // Mostrar confirmación en la página
        mensajeValidacion.textContent = 'Se abrió WhatsApp con tu mensaje preparado. ¡Gracias por contactarte!';

        // Limpiar los campos
        formulario.reset();

    } catch (error) {

        console.error('Error al procesar el formulario:', error);

        mensajeValidacion.textContent = 'Ocurrió un error al procesar el formulario';

    }

});
