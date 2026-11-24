
// Obtener el contenedor de productos destacados
const contenedor = document.getElementById('productos-destacados');

// Cargar los productos desde JSON
async function cargarProductosDestacados() {

    try {

        const respuesta = await fetch('recursos/data/productos.json');

        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar los productos');
        }

        const productos = await respuesta.json();

        // Seleccionar los productos destacados
        const productosDestacados = productos.filter(producto =>
            producto.id === 1 ||
            producto.id === 2 ||
            producto.id === 6 ||
            producto.id === 5
        );

        let contenido = '';

        productosDestacados.forEach(producto => {

            contenido +=
                '<article>' +
                    '<img src="recursos/img/' + producto.imagen + '" alt="' + producto.nombre + '">' +
                    '<h3>' + producto.nombre + '</h3>' +
                    '<p>$' + producto.precio + '</p>' +
                '</article>';

        });

        contenedor.innerHTML = contenido;

    } catch (error) {

        console.error('Error:', error);

        contenedor.innerHTML = '<p>No se pudieron cargar los productos destacados.</p>';

    }

}

// Ejecutar la función
cargarProductosDestacados();
