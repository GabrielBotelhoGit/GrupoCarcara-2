const baseURL = getBaseUrl();

$(document).ready(function(){
      let nav = montarNavBar();
      document.getElementById('navbanco').innerHTML = nav;
      let flagKeepCon = document.getElementById('manterConectado');
     

      document.getElementById('submit_login').addEventListener('click', () => {
            let usuario = document.getElementById('usuario').value,
            senha = document.getElementById('senha').value
            
            if( usuario.length >= 4 && senha.length >= 4 ){
                  loader(true);
                  axios.post(`${baseURL}login`, {
                        usuario: usuario,
                        senha: senha
                  }).then( res => {
                        if (res.status == 200 ){
                              loader(false);
                              /*
                              Por falta de recursos da API, não é possível realmente implementar a funcionalidade
                              de manter a conexão, pois o token possui uma validade limitada e não há como 
                              reautenticar o usuário sem manter a senha salva, o que seria uma grave falha de segurança
                              */
                             if(flagKeepCon.checked){
                                   localStorage.setItem('@token', res.data.token)
                                   localStorage.setItem('userDataAccount', JSON.stringify(res.data))
                              }else{
                                    sessionStorage.setItem('@token', res.data.token)
                                    sessionStorage.setItem('userDataAccount', JSON.stringify(res.data))
                              }
                              window.location.replace('Dashboard.html')
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
                        loader(false);
                  })
                  
                  
            } else {
                  alert('Confira sua senha!')
            }
      })
});

