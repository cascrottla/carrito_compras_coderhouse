let showMenu = true;
let envioDomicilio = 0;
let totalSinIVA = 0;

const precioLapiz = 100;
const precioLibro = 500;
const precioGoma = 50;
const precioDestacador = 120;
const precioRegla = 35;
const precioEstuche = 250;
const precioClips = 34;

//Muestra un pequeño resumen con los montos, iva y total a pagar por la compra más los datos ingresados para el envio a domicilio
const mostrarResumenCompra = (totalSinIVA, totalConIVA, montoIVA) => {
    const direccion = prompt('Ingrese dirección de envío');
    const ciudad = prompt('Ingrese ciudad');

    document.body.innerHTML = "<h1>Resumen de Compra realizada</h1> "+
    "<div>"+
        "<b>Monto Productos:</b> $"+totalSinIVA+"<br></br>"+
        "<b>IVA (19%):</b> $"+montoIVA+"<br></br>"+
        "<b>Monto Total Compra:</b> $"+totalConIVA+"<br></br>"+
        "<b>Dirección:</b> "+direccion+"<br></br>"+
        "<b>Ciudad:</b> "+ciudad+"<br></br>"+
    "</div>"+
    "<br></br>"+
    "<p>Dentro de 3 días hábiles sus productos estarán en su domicilio.<br></br>"+
    "¡Gracias por su compra!</p>";
}

// Obtiene el monto a pagar por producto de acuerdo a la opcion y cantidad ingresada
const obtenerMontoProducto = (cantidad, opcion) => {
    let total = 0;
    switch (opcion) {
        case 1 : { // precioLapiz = 100
            total = precioLapiz * cantidad;
            break;
        }
        case 2 : { // precioGoma = 50
            total = precioGoma * cantidad;
            break;
        }
        case 3 : { // precioDestacador = 120
            total = precioDestacador * cantidad;
            break;
        }
        case 4 : { // precioRegla = 35
            total = precioRegla * cantidad;
            break;
        }
        case 5 : { // precioLibro = 500
            total = precioLibro * cantidad;
            break;
        }
        case 6 : { // precioEstuche = 250
            total = precioEstuche * cantidad;
            break;
        }
        case 7 : {// precioClips = 34
            total = precioClips * cantidad;
            break;
        }
    }
    return total;
}

//Crea string con el codigo del producto y el nombre para ser mostrado al usuario
const obtenerNombreProducto = (opcion) => {
    switch ( opcion ){
        case 1 : { 
            return '( '+opcion + ' - Lápiz )';
        }
        case 2 : { 
            return '( '+opcion + ' - Goma de Borrar )';
        }
        case 3 : { 
            return '( '+opcion + ' - Destacador )';
        }
        case 4 : {
            return '( '+opcion + ' - Regla )';
        }
        case 5 : { 
            return '( '+opcion + ' - Libro )';
        }
        case 6 : {
            return '( '+opcion + ' - Estuche )';
        }
        case 7 : {
            return '( '+opcion + ' - Clips )';
        }
    }
}

//Calcula el IVA de la compra
const calcularIVA = (montoProducto) => {
    const IVA = 19; //es el valor del IVA en Chile

    let montoIVA = (montoProducto * IVA)/100;
    montoIVA = parseFloat(montoIVA);

    if ( isNaN(montoIVA) || montoIVA < 1 ) {
        alert('Problemas al calcular el Monto IVA de la compra, ingrese los productos nuevamente por favor');
        return -1;
    }
    return montoIVA;
}

// Calcula el monto total de la compra, incluyendo el IVA
const calcularMontoTotal = (totalSinIVA, montoIVA) => {
    
    let totalCompra = parseInt(totalSinIVA) + parseInt(montoIVA);
    let mensajeMontos = 'El monto total de la compra sin IVA es: $' + totalSinIVA;
    mensajeMontos += '\nEl monto total de la compra con IVA (19%) es: $' +totalCompra;

    if (totalCompra < 3000) {
        envioDomicilio = 750;
        alert('El monto total de la compra es $'+ totalCompra + ', por lo que se recargará el monto de envío a domicilio ($750)');
        totalCompra += envioDomicilio;
        mensajeMontos += '\nEl monto total con IVA y envío ($750) es: $'+totalCompra;
    }
    alert(mensajeMontos);
    return totalCompra;
}

alert( 'Las compras con un monto total mayor a $3.000 tienen envío gratuito.\nCompras con monto menor a eso, tienen un recargo de $750 por envío a domicilio' );

while (showMenu){
    
    let opcion = prompt('Indique el producto que quiere comprar:\n 1. Lápiz --> $100\n 2. Goma de Borrar  --> $50\n 3. Destacador  -->$120\n 4. Regla  -->$35\n 5. Libro  --> $500\n 6. Estuche  --> $250\n 7. Clips(5 un)  --> $34');
    opcion = parseInt(opcion);
   
    if (isNaN(opcion) || opcion < 1 || opcion > 7) {
        alert('Ingrese una opción de menú válida [1..7]');
    } else {
        let quantity = prompt('Indique la cantidad de producto ' + obtenerNombreProducto(opcion) + ' a comprar');
        quantity = parseInt(quantity);

        if (isNaN(quantity) || quantity == 0) {
            alert('La cantidad de productos ingresada no es correcta, debe ser un número mayor a 0')
        } else {
            totalSinIVA += obtenerMontoProducto(quantity, opcion); 
            const nuevaCompra = confirm('¿Quiere realizar otra compra?');

            if (nuevaCompra == false){
                showMenu = false;
                let montoIVA = parseInt(calcularIVA(totalSinIVA));
                let totalConIVA = calcularMontoTotal(totalSinIVA, montoIVA);
                mostrarResumenCompra(totalSinIVA, totalConIVA, montoIVA);
            } else {
                showMenu = true;
            }
        }
    }
}













