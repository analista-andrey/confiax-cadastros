//declara a Função GET

function makeGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

//Cria as linhas da tabela de acordo com a resposta requisição GET

function searchCnpj() {

    var cnpj = document.getElementById('cCnpj').value;
    var cnpjLenght = parseInt(cnpj.length);
    console.log(cnpjLenght);
}
