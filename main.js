function makeGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function createLine(feriados) {

}

function main() {
    data = makeGet("https://brasilapi.com.br/api/feriados/v1/2022")
    feriados = JSON.parse(data) 
    console.log(feriados)
}

main()