# Venta de Productos de Escritorio! 

La primera pre-entrega contempla una página html muy sencilla que contiene el link a un archivo javascript con la funcionalidad de este sitio de ventas de productos de escritorio.

Esta página mostrará un mensaje al usuario, similar a un menú que contiene los productos que vende junto con un número que los identifica y su precio. El usuario deberá ingresar el producto a comprar y luego la cantidad de ese producto que quiere comprar. 
El sistema le consultará si desea ingresar más productos al "carrito de compras", en el caso de seleccionar "aceptar", se repetirá lo descrito en el párrafo anterior, en el caso de que el usuario no quiera ingresar más productos, éste debe seleccionar la opción "cancelar" y con esto se comienzan a realizar los cálculos internos para entregar los totales de la compra al usuario. Además se le solicitará datos como dirección y ciudad para realizar el envío de los productos comprados a su domicilio.

## Funcionalidades

Entre las funcionalidades disponibles en esta entrega se tiene:

* _Cálculo del IVA de la compra a realizar:_ en este caso el % de IVA aplicado en Chile es el 19%.
* _Cálculo del total de la compra:_ que será el valor total de los productos (sumatoria del precio * cantidad de productos) sumado al IVA aplicado a este monto y en el caso de que este total no alcancen los $3000 (que es el monto mínimo para el envío gratuito a domicilio), se sumará este costo al total de la compra; el costo de envío es $750.
* _Obtención del monto total de un producto:_ acá se calcula el monto a cobrar al usuario realizando la multiplicación del valor del producto por la cantidad ingresada.
* _Obtención del nombre del producto:_ función muy básica que entrega el nombre del producto seleccionado por el usuario.
* _Resumen:_ método que permite obtener del usuario su dirección y ciudad para el envío de los productos y finalmente mostrar en la página un pequeño resumen con la compra realizada.
* **NOTA:** Los valores de los productos, así como el valor a cobrar por el envío a domicilio son ficticios y usados solo para crear esta pre-entrega.


## Consideraciones

En esta pre-entrega se tomaron en consideración los siguientes temas:

- Se entrega un html básico sólo con el link al archivo javascript a revisar. Debiera ser una página interactiva que simula la resolución de un problema, que en este caso sería un carrito de compras de productos de escritorio.
- Este js debe contener por lo menos lo visto en las 4 primeras clases: condicionales (if, else, switch), funciones (arrow functions por ejemplo), ciclos (do-while, while, while-do), variables.
- Pedir datos al usuario mediante _prompts_
- Mostrar mensajes al usuario
- Realizar validaciones de los datos ingresados por el usuario
- Enviar mensajes al usuario mediante _alerts_

## ¿Cómo probar esta pre-entrega?

Para poder probar este ejemplo, es necesario realizar lo siguiente:

1. Clonar este proyecto en algún directorio de tu computador
2. Luego puedes hacer dos cosas:
    - en la carpeta en donde clonaste el proyecto dar doble clic al archivo _index.html_ y eso hará que se te abra una página de navegador en donde puedes comenzar a probar la funcionalidad
    - abrir el proyecto clonado con el IDE que utilizas a diario, hacer clic derecho sobre el archivo _index.html_ y elegir la opción _abrir con Live Server_, eso abrirá una página de navegador en donde podrás comenzar a probar la funcionalidad, además de poder visualizar los componentes de esta primera entrega, el html y el js desarrollados.