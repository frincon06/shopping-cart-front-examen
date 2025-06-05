function getProducts() {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de productos</h4>';
    fetch("https://fakestoreapi.com/products", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
        .then((result) => {
            return result.json().then(
                data => ({
                    status: result.status,
                    body: data
                })
            )
        })
        .then((response) => {
            if (response.status === 200) {
                let listProducts = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tittle</th>
                            <th scope="col">Price</th>
                            <th scope="col">category</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                `;

                response.body.forEach(product => {
                    listProducts += `
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.tittle}</td>
                            <td>${product.price}</td>
                            
                            <td>${product.category}</td>
                            <td><button type="button" class="btn btn-outline-info btn-sm" onclick="showProductInfo(${product.id})">Ver</button></td>
                            <td><button type="button" class="btn btn-outline-info" onclick="showModalNewProduct('')">Agregar</button></td>

                        </tr>
                    `;
                });

                listProducts += `
                    </tbody>
                </table>
                
                `;

                document.getElementById('info').innerHTML = listProducts;
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontraron productos</h3>';
            }
        });
}

function showProductInfo(productId) {
    fetch('https://fakestoreapi.com/products/1'+ productId, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
        .then((result) => {
            return result.json().then(
                data => ({
                    status: result.status,
                    body: data
                })
            )
        })
        .then((response) => {
            if (response.status === 200) {
                showModalProduct(response.body);
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontró el producto</h3>';
            }
        });
}

function showModalProduct(product) {
    const modalContent = `
    <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="modalProductLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalProductLabel">Producto</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                    <p class="card-text"><strong><img src="${product.image}" alt="Logo" width="100" height="100"
                                class="d-inline-block align-text-top"></p>
                        <div class="card-body">
                            <h5 class="card-title">${product.tittle}</h5>
                            <p class="card-text"><strong>ID: ${product.id}</p>
                            <p class="card-text"><strong>Precio: ${product.price}</p>
                            <p class="card-text"><strong>Precio: ${product.category}</p>
                            <p class="card-text"><strong>Descripcion: ${product.description}</p>
                            
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById('showModal').innerHTML = modalContent;
    const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
    modal.show();
}



function agregarProducto(){
    const NewProductoId = document.getElementById("newId").value;
    const NewTittle = document.getElementById("newTittle").value;
    const NewPrice = document.getElementById("newPrice").value;
    const NewDescription = document.getElementById("newDescription").value;
    const NewCategory = document.getElementById("newCategory").value;

    const product = { NewProductoId, NewTittle, NewPrice, NewDescription, NewCategory};

    fetch('https://fakestoreapi.com/products/0', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
    })
    .then((response) => { 
            if (response.status === 200) {
                document.getElementById('info').innerHTML = '<h3>Producto Agregado correctamente</h3>', console.log("funciona" + product + response);
                return response.json()
            } else {
                document.getElementById('info').innerHTML = '<h3>Error al agregar el producto</h3>';
            }
    }).then(data => console.log("funciona" + data));

}


function showModalNewProduct() {
    const modalContent = `
    <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="modalProductLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalProductLabel">Producto</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                    <div class="card-body ">
                        <h5 class="card-title">Nuevo Producto</h5>
                        <form>
                                <div class="mb-3">
                                    <label for="newId" class="form-label">id</label>
                                    <input type="number" class="form-control" id="newId" aria-describedby="emailHelp" required>
                                </div>
                                <div class="mb-3">
                                    <label for="newTittle" class="form-label">Tittle</label>
                                    <input type="text" class="form-control" id="newTittle" aria-describedby="emailHelp">
                                </div>
                                <div class="mb-3">
                                <div class="mb-3">
                                    <label for="newPrice" class="form-label">Price</label>
                                    <input type="number" class="form-control" id="newPrice" aria-describedby="emailHelp" required>
                                </div>
                                    <label for="newDescription" class="form-label">description</label>
                                    <input type="text" class="form-control" id="newDescription" aria-describedby="emailHelp">
                                </div>
                                <div class="mb-3">
                                    <label for="newCategory" class="form-label">Category</label>
                                    <input type="text" class="form-control" id="newCategory">
                                </div>
                                <button type="submit" class="btn btn-primary" onclick="agregarProducto()">Submit</button>
                            </form>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById('showModal1').innerHTML = modalContent;
    const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
    modal.show();
}
