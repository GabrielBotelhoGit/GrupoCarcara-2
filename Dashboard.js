const baseURL = getBaseUrl();
var dataInicio = "";
var dataFim = "";
var tipoMovimentacao = "3";

window.onload = function () {
    let dataAtual = new Date(),
        dataAux = dataAtual.getFullYear().toString() + "-" + ((dataAtual.getMonth() + 1).toString().length == 1 ? "0" + (dataAtual.getMonth() + 1).toString() : (dataAtual.getMonth() + 1).toString()) + "-" + (dataAtual.getDate().toString().length == 1 ? "0" + dataAtual.getDate().toString() : dataAtual.getDate().toString());
        dataInicio = dataAux;
        dataFim = dataAux;

    let params = {
        dataInicio: dataAux,
        dataFim: dataAux,
        login: getAuthLogin(),
        token: getAuthToken()
    }
    atualizarDados(params);

    let nomeUsuario = getAuthNomeUsuario();
    document.getElementById("mensagemTitulo").innerHTML = "Bem-vindo, " + nomeUsuario + "!";

    let nav = montarNavBar();
    document.getElementById('navbanco').innerHTML = nav;
}

function onClickAutalizarDados(){
    let params = {
        dataInicio: dataInicio,
        dataFim: dataFim,
        login: getAuthLogin(),
        token: getAuthToken()
    };
    atualizarDados(params);
}

function onClickAbrirModalFiltro(){
    $("#dataInicio").val(dataInicio);
    $("#dataFim").val(dataFim);
    $("#tipoConta").val(tipoMovimentacao);
    $("#modalFiltro").modal("show");
}

function salvarFiltro(){
    let dataInicioInput = $("#dataInicio").val(),
        dataFimInput = $("#dataFim").val(),
        tipoConta = $("#tipoConta").val();
    let dataInicioAux = new Date(dataInicioInput + "T00:00:00"),
        dataFimAux = new Date(dataFimInput + "T00:00:00");
    if(dataInicioAux <= dataFimAux){
        //Aqui está certo
        $("#avisoData").toggleClass("escondido", true);
        dataInicio = dataInicioInput;
        dataFim = dataFimInput;
        tipoMovimentacao = tipoConta;
        $("#modalFiltro").modal("hide");
        onClickAutalizarDados();
    }
    else{
        //Aqui devemos informar que há um erro
        $("#avisoData").toggleClass("escondido", false);
    }
}


function atualizarDados(params){
    loader(true);
    let dataInicio = "?inicio=" + params.dataInicio,
        dataFim = "&fim=" + params.dataFim,
        login = "&login=" + params.login;
    axios.get(baseURL + "dashboard" + dataInicio + dataFim + login, {
        headers:{
            Authorization: params.token
        }
    })
        .then((res) => {
            montarPagina(res.data);            
        })
        .catch((Err) => {
            console.log(Err);
            loader(false);
            alert("Ops, algo deu errado");            
        })
}

function montarPagina(data){
    //Preencher saldo das contas
    document.getElementById("saldoContaDebito").innerHTML = "Saldo: " + formatarDinheiro(data.contaBanco.saldo);
    document.getElementById("saldoContaCredito").innerHTML = "Saldo: " + formatarDinheiro(data.contaCredito.saldo);    

    //Preencher tipoMovimentacao
    let textoMovimentacao = "";
    switch (tipoMovimentacao){
        case "1":
            textoMovimentacao = "Crédito"
            break;
        case "2":
            textoMovimentacao = "Débito"
            break;
        case "3":
            textoMovimentacao = "Todas"
            break;
    }
    document.getElementById("lblTipoConta").innerHTML = "Tipo: " + textoMovimentacao;

    //Preencher as datas filtradas
    let dataInicioFormatada = formataData(dataInicio),
        dataFimFormatada = formataData(dataFim),
        textoData = "";
    if(dataInicio == dataFim){
        textoData = "Data: " + dataInicioFormatada;
    }
    else{
        textoData = "Data Inicio: " + dataInicioFormatada + "<br>" + "Data Fim: " + dataFimFormatada;
    }
    document.getElementById("Data").innerHTML = textoData;


    //Prencher as movimentações
    data = prepararMovimentacoes(data);
    let aMovimentacao;    
    if(tipoMovimentacao == "3"){
        aMovimentacao = data.contaBanco.lancamentos.concat(data.contaCredito.lancamentos);
    }
    else if(tipoMovimentacao == "2"){
        aMovimentacao = data.contaBanco.lancamentos;
    }
    else{
        aMovimentacao = data.contaCredito.lancamentos
    }

    //Ordenando os lançamentos em ordem decrescente, do mais novo para o mais antigo
    aMovimentacao = aMovimentacao.sort((a,b) => {
        let dataAAux = new Date(a.data + "T00:00:00"),
            dataBAux = new Date(a.data + "T00:00:00");
        if(dataAAux > dataBAux ){
            return 1;
        }
        else if(dataAAux == dataBAux){
            return 0;
        }
        else{
            return -1;
        }
    })

    let corpoMovimentacoes = document.getElementById("corpoMovimentacoes");  
    corpoMovimentacoes.innerHTML = "";  
    let i = 0;
    for (let movimentacao of aMovimentacao) {
        let strMovimentacao = `
            <div class="movimentacao">
                <h5 class="card-subtitle mb-3 tipoConta">
                    <strong>${movimentacao.tipoConta}</strong>
                </h5>                                                                                       
                <h6 class="card-subtitle mb-2">
                    Valor: ${formatarDinheiro(movimentacao.valor)}
                </h6>               
                <h6 class="card-subtitle mb-2 ">
                    Tipo de Movimentação: ${movimentacao.tipo}
                </h6>                                                                                                                                 
                <h6 class="card-subtitle mb-2 ">
                    Data: ${formataData(movimentacao.data)}
                </h6>   
            </div>
        `;
        corpoMovimentacoes.innerHTML += strMovimentacao;
        if(i < aMovimentacao.length){
            corpoMovimentacoes.innerHTML += `
                <div class="separador">
                </div>
            `;
        }
        i++;
    }
    //Se não tiver nenhuma movimentação na range de data informada.
    if(!corpoMovimentacoes.innerHTML.length){
        let strMovimentacaoFake = `
            <div class="movimentacao">
                <h5 class="card-subtitle tipoConta">
                    <strong>Não há movimentações com os filtros informados</strong>
                </h5>                                                                                                         
            </div>
        `;
        corpoMovimentacoes.innerHTML += strMovimentacaoFake;
    }
    loader(false);
}

function prepararMovimentacoes(data){
    for (let movimentacao of data.contaBanco.lancamentos) {
        movimentacao.tipoConta = "Débito";
    }
    for (let movimentacao of data.contaCredito.lancamentos) {
        movimentacao.tipoConta = "Crédito";
    }
    return data;
}

function formataData(strData){
    let aData = strData.split('-');
    return aData[2] + "/" + aData[1] + "/" + aData[0];
}

function formatarDinheiro(dinheiro){
    dinheiro = dinheiro.toLocaleString ('pt-br', {style:'currency', currency:'BRL'});
    return dinheiro;
}