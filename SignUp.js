const baseURL = getBaseUrl();

$(document).ready(function(){
    let nav = montarNavBar();
    document.getElementById('navbanco').innerHTML = nav;
});