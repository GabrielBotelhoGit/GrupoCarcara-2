const baseURL = "https://accenture-java-desafio.herokuapp.com/"

function disparar(){
    document.getElementById('submit_login').addEventListener('click', () => {
        let usuario = document.getElementById('usuario').value,
        senha = document.getElementById('senha').value

        if( usuario.length >= 4 && senha.length >= 4 ){
         axios.post(`${baseURL}login`, {
             usuario: usuario,
             senha: senha
         }).then( res => {
             if (res.status == 200 ){
                 window.location.replace('./dashboard')
                 localStorage.setItem('@token', res.data.token)
                 localStorage.setItem('userDataAccount', JSON.stringify(res.data))
             }
             

         }).catch( function(err){
             let res = err.response
             let message = res.data.error
             console.log('Erro: ', err)
             console.log('Response: ', res)
             console.log('Response.data: ', res.data)
             alert(`
                     Não foi possível realizar o login:
                     -> ${message}

                     Verifique os dados e tente novamente.`)
         })


     } else {
         alert('confira sua senha!')
     }
 })
}

// if(localStorage.getItem('userDataAccount')){
//     window.location.replace('./dashboard.html')
// }

let IsAuth = localStorage.getItem('@token')
let userData = IsAuth ? JSON.parse(localStorage.getItem('userDataAccount')) : ''
const {conta} = userData

let nav = `
        <header class="align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
              <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container m-auto" width="100%">
                          <a class="navbar-brand" href="#">
                                <img src="img/logo.png" class="img-fluid" width="200px" alt="">
                          </a>
                          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                                <span class="navbar-toggler-icon"></span>
                          </button>
                          <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                                      <li class="nav-item">
                                            <a class="nav-link" aria-current="page" href="#">Home</a>
                                      </li>
                          ${!IsAuth?(`
                                      <li class="nav-item">
                                            <a class="nav-link" href="#/login">Login</a>
                                      </li>
                                      <li class="nav-item">
                                            <a class="nav-link" href="#/signup">SignUp</a>
                                      </li>
                                      </ul>
                                      <div class="d-flex flex-row-reverse bd-highlight">
                                          <div class="p-2 bd-highlight">
                                                <a href="./LogIn.html" class="linkSair">
                                                <button id="start_session" class="btn btn-secondary">
                                                      Login
                                                </button>
                                                </a>
                                          </div>
                                      </div>
                          `):''}
                          ${IsAuth?(`
                                      </ul>
                                      <div class="d-flex flex-row-reverse bd-highlight">
                                            <div class="p-2 bd-highlight"> <button id="destroy_session" class="btn btn-secondary" ">
                                                  Sair
                                            </button></div>
                                            <div class="p-3 bd-highlight">
                                                  <p>Saldo: R$${conta.saldo}</p>
                                            </div>
                                      </div>
                          `):''}
                            </div>
                    </div>
              </nav>
        </header>
`

$(document).ready(function(){
    document.getElementById('navbanco').innerHTML = nav;
       
    });