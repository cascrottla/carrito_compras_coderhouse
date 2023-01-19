class Compra {
    constructor(totalCompra, totalIVA, listadoProductos, totalSinIVA) {
        this.totalCompra = totalCompra;
        this.totalIVA = totalIVA;
        this.listadoProductos = listadoProductos;
        this.totalSinIVA = totalSinIVA;
    }

    calcularMontoTotal(){
        let totalCompra = parseInt(this.totalSinIVA) + parseInt(this.totalIVA);
        let mensajeMontos = 'El monto total de la compra sin IVA es: $' + this.totalSinIVA;
        mensajeMontos += '\nEl monto total de la compra con IVA (19%) es: $' +totalCompra;

        if (totalCompra < 3000) {
            const envioDomicilio = 750;
            alert('El monto total de la compra es $'+ totalCompra + ', por lo que se recargará el monto de envío a domicilio ($750)');
            totalCompra += envioDomicilio;
            mensajeMontos += '\nEl monto total con IVA y envío ($750) es: $'+totalCompra;
        }
        alert(mensajeMontos);
        this.totalCompra = totalCompra;
    }
   
    muestraResumenCompra(productosComprados) {
        const nombre = prompt('Ingrese nombre y apellido de quién compra');
        const direccion = prompt('Ingrese dirección de envío');
        const ciudad = prompt('Ingrese ciudad');

        const div = document.createElement('div');
        const ul = document.createElement('ul');

        div.innerHTML = ` 
            <h1>Resumen de Compra realizada</h1>
            <b>Monto Productos:</b> ${this.totalSinIVA}<br></br>
            <b>IVA (19%):</b> ${this.totalIVA}<br></br>
            <b>Monto Total Compra:</b> ${this.totalCompra}<br></br>
            <b>Nombre cliente:</b> ${nombre}<br></br>
            <b>Dirección:</b> ${direccion}<br></br>
            <b>Ciudad:</b> ${ciudad}<br></br>
            <br></br>
            <h2>Listado de productos comprados:</h2>`;
        
        for (const producto of productosComprados) {
            const li = document.createElement('li');
            li.innerHTML = `<p><strong>${producto.nombre}</strong></p>`;
            ul.append(li);
        }

        document.getElementById('resumen').append(div);
        document.getElementById('productos').append(ul);
        
    }
}

class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    //Baja stock de producto luego de una compra
    cambiaStock(cantidadProductoABajar) {
        this.stock =- cantidadProductoABajar;
    }

    obtenerMontoProducto(cantidad){
        if (cantidad > 0 && this.stock >= cantidad) {
            return cantidad * this.precio
        }
    }

    calcularIVA(montoProducto) {
        const IVA = 19; //% IVA en Chile
        let montoIVA = (montoProducto * IVA)/100;
        montoIVA = parseFloat(montoIVA);

        if ( isNaN(montoIVA) || montoIVA < 1 ) {
            alert('Problemas al calcular el Monto IVA de la compra, ingrese los productos nuevamente por favor');
            return -1;
        }
        return montoIVA;
    }
}

class ProductoComprado {
    constructor(id, nombre, montoTotalSinIVA, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.montoTotalSinIVA = montoTotalSinIVA;
        this.cantidad = cantidad;
    }
}


let showMenu = true;
let totalSinIVA = 0;
const productosComprados = []
const carrito = new Compra(0,'', 0, productosComprados, 0);
const productos = [];
productos.push(new Producto(1, "Lápiz", "100", Math.floor(Math.random() * 10) + 1));
productos.push(new Producto(2, "Libro", "500", Math.floor(Math.random() * 20) + 1));
productos.push(new Producto(3, "Goma", "50", Math.floor(Math.random() * 50) + 1));
productos.push(new Producto(4, "Destacador", "120", Math.floor(Math.random() * 20) + 1));
productos.push(new Producto(5, "Regla", "35", Math.floor(Math.random() * 40) + 1));
productos.push(new Producto(6, "Estuche", "250", Math.floor(Math.random() * 5) + 1));
productos.push(new Producto(7, "Clips", "34", Math.floor(Math.random() * 11) + 1));

console.log("cantidad de productos ingresados:"+productos.length);
alert( 'Las compras con un monto total mayor a $3.000 tienen envío gratuito.\nCompras con monto menor a eso, tienen un recargo de $750 por envío a domicilio');

while (showMenu){
    let opcion = prompt(`Indique el producto que quiere comprar:
                        1. Lápiz --> $100
                        2. Libro  --> $500 
                        3. Goma  -->$50
                        4. Destacador  -->$120
                        5. Regla  --> $35
                        6. Estuche  --> $250 
                        7. Clips(5 un)  --> $34
                        0. Ver stock de productos`);

    opcion = parseInt(opcion);
   
    if (isNaN(opcion) || opcion < 0 || opcion > 7) {
        alert('Ingrese una opción de menú válida [1..7]');
    } else {
        //ver stock de productos
        if (opcion === 0){
            let stockProductos  = "Stock de productos disponibles:\n ==========================\n";
            productos.forEach((producto) => {
                stockProductos += producto.id +". " + producto.nombre + ": "+producto.stock + "\n";
            });
            alert(stockProductos);
        } else {
            const prodSeleccionado = productos.find(producto => producto.id === opcion);
            let cantidad = prompt('Indique la cantidad de producto ' + prodSeleccionado.nombre + ' a comprar');
            cantidad = parseInt(cantidad);

            if (isNaN(cantidad) || cantidad == 0) {
                alert('La cantidad de productos ingresada no es correcta, debe ser un número mayor a 0');
            }else {
                if(cantidad > prodSeleccionado.stock) {
                    alert('La cantidad de producto '+prodSeleccionado.nombre+' es superior a la disponible.\n Si desea puede ver el stock disponible ingresando la opción 0 en menu principal.');
                } else {
                    montoTotalPorProductoSeleccionado = prodSeleccionado.obtenerMontoProducto(cantidad); 
                    carrito.totalSinIVA += montoTotalPorProductoSeleccionado;
                    totalIVA = prodSeleccionado.calcularIVA(montoTotalPorProductoSeleccionado);
                    carrito.totalIVA += totalIVA;
                    const productoComprado = new ProductoComprado(prodSeleccionado.id, prodSeleccionado.nombre, montoTotalPorProductoSeleccionado, cantidad);
                    productosComprados.push(productoComprado);

                    const nuevaCompra = confirm('¿Quiere realizar otra compra?');
                    if (nuevaCompra == false){
                        showMenu = false;
                        carrito.calcularMontoTotal();
                        carrito.muestraResumenCompra(productosComprados);
                    } else {
                        showMenu = true;
                    }
                }
                
            }
        }
        
    }
}
