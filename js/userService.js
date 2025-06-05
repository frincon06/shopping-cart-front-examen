function getUsers() {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de usuarios</h4>'
    fetch('https://fakestoreapi.com/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        
    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status,
                        body: data
                    }
                }   
            )
        })
        .then((response) => {
            if (response.status === 200) { console.log("users", response)
                let listUsers = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">email</th>
                        <th scope="col">username</th>
                        <th scope="col">phone</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
            `
                response.body.forEach(user => {
                    listUsers = listUsers.concat(`
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td>${user.username}</td>
                        <td>${user.phone}</td>
                        <td><button type="button" class="btn btn-outline-info" onclick="showInfoUser('${user.id}')">View</button></td>
                        <td><button type="button" class="btn btn-outline-info" onclick="showModalNewUser('')">Agregar</button></td>
                    </tr>                    
                    `)
                })
                listUsers = listUsers.concat(`
                </tbody>
            </table>   
            `)
                document.getElementById('info').innerHTML = listUsers
            }
            else {
                document.getElementById('info')
                    .innerHTML = '<h3>No se encontraron usuarios</h3>'
            }
        })

}



function showInfoUser(userId) {
    fetch('https://fakestoreapi.com/users/' + userId, {
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
                showModalUser(response.body);
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontró el usuario</h3>';
            }
        });
}

function showModalUser(user) {
    const modalContent = `
    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="modalUserLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalUserLabel">Usuario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">User info</h5>
                        <p class="card-text">Id : ${user.id}</p>
                        <p class="card-text">Email :${user.email} </p>
                        <p class="card-text">Username : ${user.username} </p>
                        <p class="card-text">Phone :${user.phone} </p>
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
    const modal = new bootstrap.Modal(document.getElementById('modalUser'));
    modal.show();
}


function agregarUsuario(){
    const Newusername = document.getElementById("newUsername").value;
    const NewEmail = document.getElementById("newUserEmail").value;
    const Newpassword = document.getElementById("exampleInputPassword1").value;
    const NewuserId = document.getElementById("newUserId").value;
    const user = { NewuserId, Newusername, NewEmail, Newpassword};

    fetch('https://fakestoreapi.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
    })
    .then(response => response.json(), console.log("funciona" + user))
    .then(data => console.log("funciona" + data));
}


function showModalNewUser() {
    const modalContent = `
    <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="modalProductLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalProductLabel">Usuario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                    <div class="card-body ">
                        <h5 class="card-title">Nuevo Usuario</h5>
                        <form>
                                <div class="mb-3">
                                    <label for="newUserId" class="form-label">id</label>
                                    <input type="number" class="form-control" id="newUserId" aria-describedby="emailHelp" required>
                                </div>
                                <div class="mb-3">
                                    <label for="newUsername" class="form-label">username</label>
                                    <input type="text" class="form-control" id="newUsername" aria-describedby="emailHelp">
                                </div>
                                <div class="mb-3">
                                    <label for="newUserEmail" class="form-label">email</label>
                                    <input type="email" class="form-control" id="newUserEmail" aria-describedby="emailHelp">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1">
                                </div>
                                <button type="submit" class="btn btn-primary" onclick="agregarUsuario()">Submit</button>
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

