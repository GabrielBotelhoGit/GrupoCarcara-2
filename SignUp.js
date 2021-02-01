// importa a URL base do backend
const baseURL = getBaseUrl();

// começa a renderização dos objetos da página
$(document).ready(function(){
    if (getIsAuth()){
        window.location.replace('dashboard.html')
    }
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