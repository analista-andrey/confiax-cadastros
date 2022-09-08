//declara a Função GET

function makeGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

//Cria as linhas da tabela de acordo com a resposta requisição GET

function createLine(feriados) {
    linha = document.createElement("tr");
    tdName = document.createElement("td");
    tdDate = document.createElement("td");
    tdType = document.createElement("td");
    tdName.innerHTML = feriados.name   
    tdDate.innerHTML = feriados.date
    tdType.innerHTML = feriados.type

    linha.appendChild(tdName);
    linha.appendChild(tdDate);
    linha.appendChild(tdType);

    return linha
}

function main() {
   let data = makeGet("https://brasilapi.com.br/api/feriados/v1/2022");
   let feriados = JSON.parse(data);
   let tabela = document.getElementById("tabela");

    feriados.forEach(element => {
        let linha = createLine(element);
        tabela.appendChild(linha);
    }

    );
}

main()