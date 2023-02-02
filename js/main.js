let cantidadCarrito = document.getElementById("cantidad-carrito");
let contenedorProductos = document.getElementById('contenedor-productos');
let carritoStorage = JSON.parse(localStorage.getItem('carritoStorage')) || JSON.parse('[]');
const cantidad =  carritoStorage.reduce((acc, { cantidad }) => acc + cantidad, 0);

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
productos.push(new Producto(8, "Cuaderno", "1800", (Math.floor(Math.random() * 13) + 1), 'img/cuaderno.jpg'));
productos.push(new Producto(9, "Lápiz Pasta", "890", (Math.floor(Math.random() * 7) + 1), 'img/lapiz_pasta.jpg'));


//arma card por cada producto
const agregarCardDeProducto = producto => {
    const cardProducto = document.createElement('div');
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
            const productoAgregado = carritoStorage.find(
                (productoSeleccionado) => productoSeleccionado.id === producto.id
            );
            //se aumenta al cantidad de productos por tipo agregados en carrito
            const cantidad = (productoAgregado?.cantidad ? productoAgregado.cantidad : 0) + 1;
        
            if(!productoAgregado){
                //agrega producto en el carrito con cantidad aumentanda en 1
                carritoStorage.push({
                    ...producto,
                    cantidad
                });
            } else {
                //aumenta la cantidad seleccionada de ese producto
                productoAgregado.cantidad = cantidad;
            }
            
            //se actualizan los productos en el array del storage
            localStorage.setItem('carritoStorage', JSON.stringify(carritoStorage));

            //se actualiza la cantidad de productos en el carrito (html)
            const cantidadProductosCarrito = carritoStorage.reduce((acc, { cantidad }) => acc + cantidad, 0);
            console.log("cantidad al agregar producto, carrito html:"+cantidadProductosCarrito);
            //mostramos cambios en cantidad de productos en carrito
            cantidadCarrito.innerHTML=`<button data-bs-toggle="modal" data-bs-target="#basiceModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>(${cantidadProductosCarrito}) </button>`;
});

}

// evento clic en carrito: muestra los productos agregados, su precio y cantidad, además del total de la compra
document.querySelector(`#cantidad-carrito button`).addEventListener(
    'click', () => {
        const detalleCarrito = document.getElementById("body-carrito");
        let productosEnModal = `<div class="body">`;
        console.log(carritoStorage);
        carritoStorage.forEach((productoSeleccionado => {
            productosEnModal += contenidoCarrito(productoSeleccionado);
        
        }));
        productosEnModal += contenidoResumenCarrito(carritoStorage);
        detalleCarrito.innerHTML= productosEnModal;
    }
);

const contenidoResumenCarrito = (carrito) => {
    const totalDeLaCompra = totalCompra(carrito);
    return `
    <div class="footer">
        <h6>Total Productos: $${totalDeLaCompra.totalSinIVA}</h6>
        <h6>Total IVA: $${totalDeLaCompra.totalIVA}</h6>
        <h6>Total Compra: $${totalDeLaCompra.totalCompra}</h6>
    </div>`;
}

const contenidoCarrito = (producto) => {
   return `
    <div class="body">
        <h5>${producto.nombre}</h5>
        <span>Cantidad: ${producto.cantidad}</span>
        <span>Precio: $${producto.precio}</span>
    </div> <hr> `;
 
}

//obtiene los totales de la compra a realizar
const totalCompra = (productosEnCarrito) => {
    let totalCompra = 0, totalPorProducto = 0, montoIVA = 0;
    
    productosEnCarrito.forEach((producto => {
        totalPorProducto = producto.cantidad * producto.precio;
        montoIVA += Math.round(calculaIVA(totalPorProducto));
        totalCompra += totalPorProducto;
     }));

    const compraARealizar = new Compra((totalCompra + montoIVA),montoIVA,productosEnCarrito,totalCompra);
    return compraARealizar;
}

//calcula el iva a partir del monto de un producto seleccionado
const calculaIVA = (montoProducto) => {
    const IVA = 19; //% IVA en Chile
    let montoIVA = (montoProducto * IVA)/100;
    montoIVA = parseFloat(montoIVA);

    return montoIVA;
}

//muestra productos en html
productos.forEach((producto => {
    agregarCardDeProducto(producto);
}));
