class Producto {
    constructor(id, nombre, precio, stock, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
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