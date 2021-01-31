const baseURL = getBaseUrl();

$(document).ready(function(){
      let nav = montarNavBar();
      document.getElementById('navbanco').innerHTML = nav;

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
                              window.location.replace('Dashboard.html')
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
                        loader(false);
                  })
                  
                  
            } else {
                  alert('Confira sua senha!')
            }
      })
});

