//declara a Função GET

function makeGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

//Cria as linhas da tabela de acordo com a resposta requisição GET

function searchCnpj() {
    var cnpj = toString(document.getElementById("cCnpj").value)
    if(cnpj != "") {
        let data = makeGet("https://brasilapi.com.br/api/cnpj/v1/"+cnpj);
        let receitaInfos = JSON.parse(data);
        console.log(receitaInfos);
    }
}
