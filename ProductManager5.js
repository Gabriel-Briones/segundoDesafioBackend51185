const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.idActual = 1;
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            this.idActual = this.products[this.products.length - 1].id + 1;
        } catch (err) {
            console.log("Archivo no encontrado o vacío. Se creará uno nuevo.");
        }
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }

        // title (nombre del producto)
        // description (descripción del producto)
        // price (precio)
        // thumbnail (ruta de imagen)
        // code (código identificador)
        // stock (número de piezas disponibles)

        product.id = this.idActual++;
        this.products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (err) {
            console.log("Error al leer el archivo.");
        }
        return this.products;
    }

    getProductById(id) {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            const product = this.products.find(p => p.id === id);
            if (!product) {
                console.log(`Error al buscar producto, id: ${id} no encontrado`);
                return;
            }
        } catch (err) {
            console.log("Error al leer el archivo.");
        }
    }

    updateProduct(id, updatedProduct) {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                console.log(`Error al actualizar, id: ${id} no encontrado`);
                return;
            }
            updatedProduct.id = id;
            this.products[index] = updatedProduct;
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } catch (err) {
            console.log("Error al leer o escribir el archivo.");
        }
    }

    deleteProduct(id) {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                console.log(`Error id: ${id} no encontrado`);
                return;
            }
            this.products.splice(index, 1);
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log(`Producto id: ${id} borrado`);
        } catch (err) {
            console.log("Error al leer o escribir el archivo.");
        }
    }
}

// Testing:
// Se creará una instancia de la clase “ProductManager”
// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

const productos = new ProductManager("productos.json");
console.log(productos.getProducts());

productos.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
});

console.log(productos.getProducts());

// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.

productos.updateProduct(1, {
    title: "producto prueba actualizado",
    description: "Este es un producto prueba actualizado",
    price: 300,
    thumbnail: "Sin imagen actualizada",
    code: "abc123",
    stock: 30
});

console.log(productos.getProducts());

// Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
console.log(productos.getProductById(1));
console.log(productos.getProductById(8));

// Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
productos.deleteProduct(1);
console.log(productos.getProductById(1));
console.log(productos.getProducts());

