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