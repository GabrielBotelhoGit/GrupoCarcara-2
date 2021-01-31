// importa a URL base do backend
const baseURL = getBaseUrl();

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

// começa a renderização dos objetos da página
$(document).ready(function(){
    let nav = montarNavBar();
    // carrega o navbar para dentro da página
    document.getElementById('navbanco').innerHTML = nav;

    // configura um listener para ouvir o clique do boão 'cadastrar' da página
    document.getElementById('submit_new_register').addEventListener('click', () => {
        // carrega os valores dos campos do formulário para dentro do script
        let userName = document.getElementById('username').value,
            userCpf = document.getElementById('cpf').value.replace(/[^\d]/g, ""),
            userEmail = document.getElementById('email').value,
            userPassword = document.getElementById('password').value,
            userRepassword = document.getElementById('re_password').value;
        
            // se os dois campos para senha são iguais, continuar com o envio dos
        // dados para o backend
        if (userPassword === userRepassword) {
            // carrega o loader para dentro da página
            loader(true);
            // realiza um post através do axios passando os dados de cadastro
            axios.post(`${baseURL}usuarios`, {
                cpf: userCpf,
                login: userEmail,
                nome: userName,
                senha: userPassword
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                // caro a resposta seja OK (200)
                if (res.status === 200) {
                    // finaliza o loader
                    loader(false);
                    console.log('Status: ', res.status);
                    // redireciona o usuário para a página de login
                    window.location.replace('login.html');
                }
            }).catch(function (err) {
                let resp = err.response;
                let msg = resp.data.error;
                console.log('Erro: ', err);
                console.log('Response: ', res);
                console.log('Response.data: ', res.data);
                alert(`Não foi possível finalizar cadastro: ${msg}. `);
                loader(false);
            });
        } else {
            alert('As senhas não correspondem. Confira os dados digitados!');
            // console.log('As senhas não correspondem! Confira os dados digitados');
        }
    });
});