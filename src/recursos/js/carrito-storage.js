
// Obtener los productos guardados en el carrito
export function obtenerCarrito() {

    try {

        return JSON.parse(localStorage.getItem('carrito')) || [];

    } catch (error) {

        console.error('Error al obtener el carrito:', error);
        return [];

    }

}

// Guardar los productos del carrito
export function guardarCarrito(carrito) {

    localStorage.setItem('carrito', JSON.stringify(carrito));

}

// Vaciar el carrito
export function vaciarCarrito() {

    localStorage.removeItem('carrito');

}
