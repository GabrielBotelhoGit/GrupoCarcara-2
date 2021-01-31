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

function getAuthToken(){
    return localStorage.getItem("@token");
}

function getAuthLogin(){
    let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    return usuarioLogado.login;
}

function getNomeUsuario(){
    let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    return usuarioLogado.nome.split(' ')[0];
}