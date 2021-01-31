function loader(mostrar){
    if(mostrar){
        if(!document.getElementById("modalLoader")){
            let corpo = document.getElementsByTagName("body")[0];
            let modalLoader = `
                <div class="modal fade" id="modalLoader" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-sm ">
                        <div class="modal-content">
                            <div class="modal-header modalLoaderHeader">
                                <h5 class="modal-title" id="exampleModalLongTitle">Carregando...</h5>                                                               
                            </div>
                            <div class="modal-body centralizado">
                                <div class="spinner-border" role="status">                            
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>`;
            corpo.innerHTML += modalLoader;
        }        
        $("#modalLoader").modal("show");
    }    
    else{
        setTimeout(()=>{
            $("#modalLoader").modal("hide");        
        },200)        
    }
}

function getBaseUrl(){
    return "https://accenture-java-desafio.herokuapp.com/";
}

function getIsAuth(){
    let token = localStorage.getItem('@token') || sessionStorage.getItem('@token');
    return !!token;
}

function getAuthToken(){
    return localStorage.getItem("@token") || sessionStorage.getItem("@token");
}

function getAuthLogin(){
    let usuarioLogado = JSON.parse(localStorage.getItem("userDataAccount")|| sessionStorage.getItem("userDataAccount"));
    return usuarioLogado.usuario.login;
}

function getAuthNomeUsuario(){
    let usuarioLogado = JSON.parse(localStorage.getItem("userDataAccount") || sessionStorage.getItem("userDataAccount"));
    return usuarioLogado.usuario.nome.split(' ')[0];
}

function getAuthUserData(){
    let usuarioLogado = JSON.parse(localStorage.getItem("userDataAccount") || sessionStorage.getItem("userDataAccount") );
    return usuarioLogado;
}

function getAuthConta(){
    let usuarioLogado = getAuthUserData();
    const {conta} = usuarioLogado;
    return conta;
}

function clearAuth(){
    localStorage.clear();
}

function formataData(strData){
    let aData = strData.split('-');
    return aData[2] + "/" + aData[1] + "/" + aData[0];
}

function formatarDinheiro(dinheiro){
    dinheiro = dinheiro.toLocaleString ('pt-br', {style:'currency', currency:'BRL'});
    return dinheiro;
}

function fazerLogout(){
    clearAuth();
    window.location.replace("Login.html")
}

function montarNavBar(){
    let IsAuth = getIsAuth();
    let conta = undefined;
    if(IsAuth){
        conta = getAuthConta();
    }
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
                                    <a class="nav-link" aria-current="page" href="Index.html">Home</a>
                                </li>
                                ${!IsAuth?(`
                                    <li class="nav-item">
                                        <a class="nav-link" href="Login.html">Login</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="Signup.html">SignUp</a>
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
                                <li class="nav-item">
                                    <a class="nav-link" href="Dashboard.html">Dashboard</a>
                                </li>
                            </ul>
                            <div class="d-flex flex-row-reverse bd-highlight">
                                <div class="p-2 bd-highlight">
                                    <button id="destroy_session" onclick="fazerLogout()" type="button" class="btn btn-secondary" >
                                        Sair
                                    </button>
                                </div>                                
                            </div>
                                `):''}
                        </div>
                    </div>
                </nav>
            </header>
    `;
    return nav;
}

// função para chamar toda vez que um tecla é pressionada do teclado
function fMasc (objeto,mascara) {
    obj = objeto;
    masc = mascara;
    // configura time out para chamar a função 
    // que determina o tipo de máscara de acordo com o objeto passado
    setTimeout("fMascEx()",1);
}

// função que trata a máscara de acordo com o tipo de entrada
function fMascEx () {
    obj.value = masc(obj.value);
}

// função que mascara o cpf através de RegEx
function mCPF (cpf) {
    cpf = cpf.replace(/\D/g,"");
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    return cpf;
}