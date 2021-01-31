const baseURL = getBaseUrl();

$(document).ready(function(){
    let nav = montarNavBar();
    document.getElementById('navbanco').innerHTML = nav;

    document.getElementById('submit_new_register').addEventListener('click', () => {
        let userName = document.getElementById('username').value,
            userEmail = document.getElementById('email').value,
            userPassword = document.getElementById('password').value,
            userRepassword = document.getElementById('re_password').value,
            userCpf = document.getElementById('cpf').value.replace(/[^\d]/g, "");
        
        if (userPassword === userRepassword) {
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
                
                if (res.status === 200) {
                    window.location.replace('#/login');
                }
            })
        } else {
            console.log('Confira a sua senha!');
        }
    });
});