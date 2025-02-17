document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("product-form");
    const productList = document.getElementById("product-list");
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function renderProducts() {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${product.image}" width="50">
                <strong>${product.name}</strong> - $${product.price} - ${product.quantity} unidades
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            `;
            productList.appendChild(li);
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const quantity = document.getElementById("quantity").value;
        const image = document.getElementById("image").value;

        products.push({ name, price, quantity, image });
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
        form.reset();
    });

    window.deleteProduct = (index) => {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
    };

    window.editProduct = (index) => {
        const product = products[index];
        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("quantity").value = product.quantity;
        document.getElementById("image").value = product.image;

        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
    };

    renderProducts();
});
