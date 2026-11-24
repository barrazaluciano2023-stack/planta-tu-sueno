
// Obtener los elementos del HTML
const contenedorCarrito = document.getElementById('contenedor-carrito');
const totalCarrito = document.getElementById('total-carrito');

// Crear el espacio para los mensajes
const mensajeCarrito = document.createElement('p');
mensajeCarrito.classList.add('mensaje-carrito');
totalCarrito.insertAdjacentElement('afterend', mensajeCarrito);
// Crear confirmación para vaciar el carrito
const confirmacionVaciado = document.createElement('div');
confirmacionVaciado.classList.add('confirmacion-vaciado');
confirmacionVaciado.style.display = 'none';

confirmacionVaciado.innerHTML =
    '<p>¿Estás seguro de que querés vaciar el carrito?</p>' +
    '<button id="aceptar-vaciado">Sí, vaciar carrito</button>' +
    '<button id="cancelar-vaciado">Conservar carrito</button>';

mensajeCarrito.insertAdjacentElement('afterend', confirmacionVaciado);
// Crear confirmación de compra
const confirmacionCompra = document.createElement('div');
confirmacionCompra.classList.add('confirmacion-compra');
confirmacionCompra.style.display = 'none';

confirmacionCompra.innerHTML =
    '<p>¿Enviaste tu pedido por WhatsApp?</p>' +
    '<button id="aceptar-compra">Sí, envié el pedido</button>' +
    '<button id="cancelar-compra">No, conservar carrito</button>';

confirmacionVaciado.insertAdjacentElement('afterend', confirmacionCompra);

// Mostrar mensajes en la página
function mostrarMensaje(texto) {
    mensajeCarrito.textContent = texto;
}

// Obtener los productos guardados
function obtenerCarrito() {

    try {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        return [];
    }

}

// Mostrar los productos del carrito
function mostrarCarrito() {

    const carrito = obtenerCarrito();

    let contenido = '';
    let total = 0;

    if (carrito.length === 0) {

        contenedorCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalCarrito.textContent = 'Total: $0';
        return;

    }

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        contenido +=
            '<article>' +
                '<img src="recursos/img/' + producto.imagen + '" alt="' + producto.nombre + '">' +
                '<div class="info-producto">' +
                    '<h3>' + producto.nombre + '</h3>' +
                    '<p>Precio: $' + producto.precio + '</p>' +
                    '<div class="controles-cantidad">' +
                        '<button class="disminuir" data-id="' + producto.id + '">-</button>' +
                        '<span>' + producto.cantidad + '</span>' +
                        '<button class="aumentar" data-id="' + producto.id + '">+</button>' +
                    '</div>' +
                    '<p class="subtotal-producto">Subtotal: $' + subtotal + '</p>' +
                '</div>' +
                '<button class="eliminar" data-id="' + producto.id + '">' +
                    'Eliminar' +
                '</button>' +
            '</article>';

    });

    contenedorCarrito.innerHTML = contenido;

    totalCarrito.textContent = 'Total: $' + total;

}

// Modificar cantidades y eliminar productos
contenedorCarrito.addEventListener('click', (e) => {

    const idProducto = Number(e.target.dataset.id);

    if (!idProducto) {
        return;
    }

    let carrito = obtenerCarrito();

    // Aumentar la cantidad
    if (e.target.classList.contains('aumentar')) {

        const producto = carrito.find(p => p.id === idProducto);

        producto.cantidad++;

    }

    // Disminuir la cantidad
    if (e.target.classList.contains('disminuir')) {

        const producto = carrito.find(p => p.id === idProducto);

        if (producto.cantidad > 1) {
            producto.cantidad--;
        }

    }

    // Eliminar el producto
    if (e.target.classList.contains('eliminar')) {

        carrito = carrito.filter(p => p.id !== idProducto);

    }

    // Guardar los cambios
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarMensaje('');

    // Actualizar la vista
    mostrarCarrito();

});

// Vaciar el carrito
const botonVaciar = document.getElementById('vaciar-carrito');

botonVaciar.addEventListener('click', () => {

    if (obtenerCarrito().length === 0) {
        mostrarMensaje('El carrito ya está vacío.');
        return;
    }

    mostrarMensaje('');
    confirmacionVaciado.style.display = 'block';

});

// Confirmar o cancelar el vaciado
confirmacionVaciado.addEventListener('click', (e) => {

    if (e.target.id === 'aceptar-vaciado') {

        localStorage.removeItem('carrito');

        mostrarCarrito();

        confirmacionVaciado.style.display = 'none';

        mostrarMensaje('El carrito se vació correctamente.');

    }

    if (e.target.id === 'cancelar-vaciado') {

        confirmacionVaciado.style.display = 'none';

    }

});

// Confirmar compra por WhatsApp
const botonConfirmar = document.getElementById('confirmar-compra');

botonConfirmar.addEventListener('click', () => {

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        mostrarMensaje('Tu carrito está vacío.');
        return;
    }

    let mensaje = '¡Hola! Quiero realizar el siguiente pedido:\n\n';

    let total = 0;

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        mensaje += producto.nombre + '\n';
        mensaje += 'Cantidad: ' + producto.cantidad + '\n';
        mensaje += 'Subtotal: $' + subtotal + '\n\n';

    });

    mensaje += 'Total de la compra: $' + total;

    const numero = '5493517529217';

    const enlace = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(mensaje);

    // Abrir WhatsApp con el pedido
    window.open(enlace, '_blank');

    // Mostrar confirmación dentro de la página
    mostrarMensaje('');
    confirmacionVaciado.style.display = 'none';
    confirmacionCompra.style.display = 'block';

});

// Confirmar o cancelar el envío
confirmacionCompra.addEventListener('click', (e) => {

    if (e.target.id === 'aceptar-compra') {

        localStorage.removeItem('carrito');

        mostrarCarrito();

        confirmacionCompra.style.display = 'none';

        mostrarMensaje('¡Gracias por tu compra!');

    }

    if (e.target.id === 'cancelar-compra') {

        confirmacionCompra.style.display = 'none';

        mostrarMensaje('Tu carrito se conservó. Podés confirmar el pedido cuando quieras.');

    }

});

// Mostrar el carrito al cargar la página
mostrarCarrito();
