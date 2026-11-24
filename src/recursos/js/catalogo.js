
const contenedor = document.getElementById('contenedor-productos');

const botonesCategorias = document.querySelectorAll('[data-categoria]');


let productos = [];

function mostrarProductos(listaProductos) {

    let contenido = '';

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    listaProductos.forEach(producto => {

        const productoAgregado = carrito.some(item =>
            item.id === producto.id
        );

        contenido +=
            '<article>' +
                '<img src="recursos/img/' + producto.imagen + '" alt="' + producto.nombre + '">' +
                '<h3>' + producto.nombre + '</h3>' +
                '<p>$' + producto.precio + '</p>' +
                '<button class="agregar-carrito ' + (productoAgregado ? 'producto-agregado' : '') + '" data-id="' + producto.id + '" ' + (productoAgregado ? 'disabled' : '') + '>' +
                    (productoAgregado ? '✓ Agregado' : '+') +
                '</button>' +
                (productoAgregado ? '<p class="texto-agregado">Podés agregar mas desde el carrito.</p>' : '') +
            '</article>';

    });

    contenedor.innerHTML = contenido;

}

//json
async function cargarProductos() {

    try {

        const respuesta = await fetch('recursos/data/productos.json');

        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar los productos');
        }

        productos = await respuesta.json();

        // Mostrar solamente las bandejas al iniciar
        const bandejas = productos.filter(producto =>
            producto.categoria === 'Bandejas'
        );

        mostrarProductos(bandejas);

    } catch (error) {

        console.error('Error:', error);

        contenedor.innerHTML = '<p>No se pudieron cargar los productos.</p>';

    }

}

// Agregar productos al carrito
contenedor.addEventListener('click', (e) => {

    if (e.target.classList.contains('agregar-carrito')) {

        const idProducto = Number(e.target.dataset.id);

        const productoSeleccionado = productos.find(producto =>
            producto.id === idProducto
        );

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        const productoEnCarrito = carrito.find(producto =>
            producto.id === idProducto
        );

        if (productoEnCarrito) {

            productoEnCarrito.cantidad++;

        } else {

            carrito.push({
                ...productoSeleccionado,
                cantidad: 1
            });

        }

        localStorage.setItem('carrito', JSON.stringify(carrito));

        e.target.textContent = '✓ Agregado';
        e.target.classList.add('producto-agregado');
        e.target.disabled = true;

        const texto = document.createElement('p');
        texto.classList.add('texto-agregado');
        texto.textContent = 'Podés modificar la cantidad desde el carrito.';

        e.target.parentElement.appendChild(texto);

    }

});

// Filtrar productos por categoría
botonesCategorias.forEach(boton => {

    boton.addEventListener('click', () => {

        // Marcar la categoría seleccionada
        botonesCategorias.forEach(b => {
            b.classList.remove('categoria-activa');
        });

        boton.classList.add('categoria-activa');

        const categoriaSeleccionada = boton.dataset.categoria.toLowerCase();

        const productosFiltrados = productos.filter(producto =>
            producto.categoria.toLowerCase() === categoriaSeleccionada
        );

        mostrarProductos(productosFiltrados);

    });

});

// Cargar los productos al iniciar
cargarProductos();
