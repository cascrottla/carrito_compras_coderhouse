
let showMenu = true;
let totalSinIVA = 0;
const productosEnCarrito = JSON.parse(localStorage.getItem('carritoStorage')) || [];
let cantidadCarrito = document.getElementById("cantidad-carrito");
const cantidad =  productosEnCarrito.reduce((acc, { cantidad }) => acc + cantidad, 0);

cantidadCarrito.innerHTML= `
    <button data-bs-toggle="modal" data-bs-target="#basiceModal">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>(${cantidad})
    </button>
`

const productos = [];

productos.push(new Producto(1, "Lápiz Grafito", "390", (Math.floor(Math.random() * 10) + 1), 'img/lapiz_grafito.jpg'));
productos.push(new Producto(2, "Block Dibujo", "2490", (Math.floor(Math.random() * 20) + 1), 'img/block_dibujo.jpg'));
productos.push(new Producto(3, "Goma de Borrar", "990", (Math.floor(Math.random() * 50) + 1), 'img/goma_borrar.jpg'));
productos.push(new Producto(4, "Destacador", "2150", (Math.floor(Math.random() * 20) + 1), 'img/destacador.jpg'));
productos.push(new Producto(5, "Regla", "510", (Math.floor(Math.random() * 40) + 1),'img/regla.jpg'));
productos.push(new Producto(6, "Estuche", "1990", (Math.floor(Math.random() * 5) + 1), 'img/estuche.jpg'));
productos.push(new Producto(7, "Clips", "790", (Math.floor(Math.random() * 11) + 1), 'img/clips.jpg'));
productos.push(new Producto(8, "Cuaderno", "180", (Math.floor(Math.random() * 13) + 1), 'img/cuaderno.jpg'));
productos.push(new Producto(9, "Lápiz Pasta", "890", (Math.floor(Math.random() * 7) + 1), 'img/lapiz_pasta.jpg'));

const contenedorProductos = document.getElementById('contenedor-productos');

const agregarCardDeProducto = producto => {
    const cardProducto = document.createElement('div');
    cardProducto.className = 'col';
    cardProducto.innerHTML = `
        <div id="producto-${producto.id}" class="card" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top">
            <div class="card-body">
                <h5>${producto.nombre}</h5>
                <p>$ ${producto.precio}</p>
                <button class="btn btn-primary">Agregar al carrito</button>
            </div>
        </div>`;

    contenedorProductos.append(cardProducto);    

    //agrega producto seleccionado en carrito
    document.querySelector(`#producto-${producto.id} button`).addEventListener(
        'click', () => {
        const productoAgregado = productosEnCarrito.find(
            (productoSeleccionado) => productoSeleccionado.id === producto.id
        );
        const cantidad = (productoAgregado?.cantidad ? productoAgregado.cantidad : 0) + 1;
        
        if(!productoAgregado){
            //agrega producto en el carrito con cantidad aumentanda en 1
            productosEnCarrito.push({
                ...producto,
                cantidad
            });
        } else {
            //aumenta la cantidad seleccionada de ese producto
            productoAgregado.cantidad = cantidad;
        }

        //se actualizan los productos en el array del storage
        localStorage.setItem('carritoStorage', JSON.stringify(productosEnCarrito));

        //se actualiza la cantidad de productos en el carrito
        const cantidadProductosCarrito = productosEnCarrito.reduce((acc, { cantidad }) => acc + cantidad, 0);
       
        //mostramos cambios en cantidad de productos en carrito
        cantidadCarrito.innerHTML=`<button data-bs-toggle="modal" data-bs-target="#basiceModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>(${cantidadProductosCarrito}) </button>`;
        
        console.log(productosEnCarrito);
});


}

//muestra productos en html
productos.forEach((producto => {
    agregarCardDeProducto(producto);
}));

// alert( 'Las compras con un monto total mayor a $3.000 tienen envío gratuito.\nCompras con monto menor a eso, tienen un recargo de $750 por envío a domicilio');

// while (showMenu){
//     let opcion = prompt(`Indique el producto que quiere comprar:
//                         1. Lápiz --> $100
//                         2. Libro  --> $500 
//                         3. Goma  -->$50
//                         4. Destacador  -->$120
//                         5. Regla  --> $35
//                         6. Estuche  --> $250 
//                         7. Clips(5 un)  --> $34
//                         0. Ver stock de productos`);

//     opcion = parseInt(opcion);
   
//     if (isNaN(opcion) || opcion < 0 || opcion > 7) {
//         alert('Ingrese una opción de menú válida [1..7]');
//     } else {
//         //ver stock de productos
//         if (opcion === 0){
//             let stockProductos  = "Stock de productos disponibles:\n ==========================\n";
//             productos.forEach((producto) => {
//                 stockProductos += producto.id +". " + producto.nombre + ": "+producto.stock + "\n";
//             });
//             alert(stockProductos);
//         } else {
//             const prodSeleccionado = productos.find(producto => producto.id === opcion);
//             let cantidad = prompt('Indique la cantidad de producto ' + prodSeleccionado.nombre + ' a comprar');
//             cantidad = parseInt(cantidad);

//             if (isNaN(cantidad) || cantidad == 0) {
//                 alert('La cantidad de productos ingresada no es correcta, debe ser un número mayor a 0');
//             }else {
//                 if(cantidad > prodSeleccionado.stock) {
//                     alert('La cantidad de producto '+prodSeleccionado.nombre+' es superior a la disponible.\n Si desea puede ver el stock disponible ingresando la opción 0 en menu principal.');
//                 } else {
//                     montoTotalPorProductoSeleccionado = prodSeleccionado.obtenerMontoProducto(cantidad); 
//                     carrito.totalSinIVA += montoTotalPorProductoSeleccionado;
//                     totalIVA = prodSeleccionado.calcularIVA(montoTotalPorProductoSeleccionado);
//                     carrito.totalIVA += totalIVA;
//                     const productoComprado = new ProductoComprado(prodSeleccionado.id, prodSeleccionado.nombre, montoTotalPorProductoSeleccionado, cantidad);
//                     productosComprados.push(productoComprado);

//                     const nuevaCompra = confirm('¿Quiere realizar otra compra?');
//                     if (nuevaCompra == false){
//                         showMenu = false;
//                         carrito.calcularMontoTotal();
//                         carrito.muestraResumenCompra(productosComprados);
//                     } else {
//                         showMenu = true;
//                     }
//                 }
                
//             }
//         }
        
//     }
// }
