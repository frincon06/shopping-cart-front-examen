document.getElementById("formLogin").addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const credentials = { username, password};
    login(credentials)
    
})




function login(credentials){
    fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
    })
    .then(response =>{ console.log("response", response)
        if(response.status === 200){
            console.log('responde bien'+ response)
            response.json()
            .then(data => console.log(data) )            
            setTimeout(() => {
                location.href = 'admin/dashboard.html'
            }, 2000) // 2000 ms = 2 segundos
        }else{
            console.log("error")
        }        
    })
    
}   
       
