# 📝 Historias de Usuario - Frontend

Este documento detalla las funcionalidades implementadas en la interfaz de usuario de **Tienda Central**.

---

## HU-01: Visualizar catálogo de productos
**Como** cliente,  
**quiero** ver un catálogo de productos disponibles,  
**para** explorar lo que puedo comprar.

### Criterios de Aceptación:
* [ ] Se muestra una lista de productos con nombre, precio, imagen y stock.
* [ ] Solo se muestran productos con estado "disponible".
* [ ] Si no hay productos disponibles, se muestra un mensaje informativo.

---

## HU-02: Buscar y filtrar productos
**Como** cliente,  
**quiero** buscar productos por nombre y filtrarlos por categoría,  
**para** encontrar más rápido lo que necesito.

### Criterios de Aceptación:
* [ ] Existe una barra de búsqueda por nombre.
* [ ] Existe un selector de filtro por categoría.
* [ ] La lista de productos se actualiza dinámicamente sin recargar la página.

---

## HU-03: Ver detalle de producto
**Como** cliente,  
**quiero** abrir el detalle de un producto,  
**para** revisar su información antes de agregarlo al carrito.

### Criterios de Aceptación:
* [ ] Se visualiza descripción detallada, precio, stock e imagen ampliada.
* [ ] Permite agregar el producto al carrito desde esta vista.
* [ ] Si el stock es 0, el botón de agregar aparece deshabilitado.

---

## HU-04: Gestionar carrito de compras
**Como** cliente,  
**quiero** agregar, quitar y modificar cantidades en mi carrito,  
**para** organizar mi compra antes del checkout.

### Criterios de Aceptación:
* [ ] Permite añadir productos desde el catálogo o detalle.
* [ ] Permite aumentar/disminuir cantidades o eliminar ítems.
* [ ] El total de la compra se recalcula automáticamente ante cualquier cambio.

---

## HU-05: Confirmar compra desde checkout
**Como** cliente,  
**quiero** confirmar mi pedido desde una pantalla de checkout,  
**para** finalizar la compra de mis productos.

### Criterios de Aceptación:
* [ ] Se visualiza un resumen detallado con subtotal, total y cantidad de productos.
* [ ] El sistema procesa la confirmación y genera el pedido.
* [ ] Se informa claramente al usuario si la operación fue exitosa o si ocurrió un error.
