//declara a Função GET

function makeGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false);
    request.send();
    return request.responseText;
};

function izeeLogin(url) {
    var data = "username=andrey.goncalves@redevistorias.com.br&password=Minhasupersenha@123";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);

    return getAllResponseHeaders();
};

function formatarCNPJ(e){

    var v= e.target.value.replace(/\D/g,"");

    v=v.replace(/^(\d{2})(\d)/,"$1.$2");

    v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");

    v=v.replace(/\.(\d{3})(\d)/,".$1/$2");

    v=v.replace(/(\d{4})(\d)/,"$1-$2");  

    e.target.value = v;

};


function formatarCep(e){

    var v= e.target.value.replace(/\D/g,"");             

    v=v.replace(/^(\d{5})(\d)/,"$1-$2");

    e.target.value = v;

};

function formatarTelefone(e){

    var v=e.target.value.replace(/\D/g,"");

    v=v.replace(/^(\d\d)(\d)/g,"($1)$2"); 

    v=v.replace(/(\d{5})(\d)/,"$1-$2");    

    e.target.value = v;
};

function formatarCPF(e){

    var v=e.target.value.replace(/\D/g,"");

    v=v.replace(/(\d{3})(\d)/,"$1.$2");

    v=v.replace(/(\d{3})(\d)/,"$1.$2");

    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");

    e.target.value = v;

};

function searchCnpj() {
    
    const inputCnpj = document.getElementById("cCnpj");
    inputCnpj.addEventListener("keyup", formatarCNPJ);

    const inputCep = document.getElementById("cCep");
    inputCep.addEventListener("keyup", formatarCep);

    const inputTel = document.getElementById("cPhone");
    inputTel.addEventListener("keyup", formatarTelefone);

    const inputCpf = document.getElementById("cAdmCpf");
    inputCpf.addEventListener("keyup", formatarCPF);

    var cnpj = document.getElementById("cCnpj").value;
    var cnpjLenght = parseInt(cnpj.length);

    if(cnpjLenght == 18 || cnpjLenght == 14) {
        //Com ajuste de CNPJ
        if(cnpjLenght == 18){
            
            let cnpjF = cnpj.replace(".", "").replace(".","").replace("/","").replace("-","");
            let data = makeGet("https://brasilapi.com.br/api/cnpj/v1/"+cnpjF);
            const estateInfos = JSON.parse(data);
            
            var razao = estateInfos.razao_social;
            var fantasia = estateInfos.nome_fantasia ;
            var logradouro = estateInfos.descricao_tipo_de_logradouro+" "+estateInfos.logradouro;
            var numero = estateInfos.numero;
            var complemento = estateInfos.complemento;
            var bairro = estateInfos.bairro;
            var city = estateInfos.municipio;
            var uf = estateInfos.uf;
            var cep = estateInfos.cep.substring(0,5)+"-"+estateInfos.cep.substring(5,8);
            var tel = estateInfos.ddd_telefone_1
            var email = estateInfos.email;
            var socioAdm = estateInfos.qsa[0].nome_socio

            document.getElementById("cRazao").value = razao;
            document.getElementById("cLogra").value = logradouro;
            document.getElementById("cNum").value = numero;
            document.getElementById("cComple").value = complemento;
            document.getElementById("cBairro").value = bairro;
            document.getElementById("cCity").value = city;
            document.getElementById("cUf").value = uf;
            document.getElementById("cCep").value = cep;
            document.getElementById("cPhone").value = tel;
            document.getElementById("cEmail").value = email;
            document.getElementById("cAdmName").value = socioAdm;

            if(fantasia == "") {
                document.getElementById("cFantasia").value = razao;
            } else {
                document.getElementById("cFantasia").value = fantasia;
            };
            
            if(tel != "") {
                document.getElementById("cPhone").value = "("+tel.substring(0,2)+")"+tel.substring(2,6)+"-"+tel.substring(6,tel.legth);
            }
            

            console.log(estateInfos);
        };


        //Sem ajuste de CNPJ -----------------

        if(cnpjLenght == 14){
            let data = makeGet("https://brasilapi.com.br/api/cnpj/v1/"+cnpj);
            let estateInfos = JSON.parse(data);
            
            var razao = estateInfos.razao_social;
            var fantasia = estateInfos.nome_fantasia ;
            var logradouro = estateInfos.descricao_tipo_de_logradouro+" "+estateInfos.logradouro;
            var numero = estateInfos.numero;
            var complemento = estateInfos.complemento;
            var bairro = estateInfos.bairro;
            var city = estateInfos.municipio;
            var uf = estateInfos.uf;
            var cep = estateInfos.cep.substring(0,5)+"-"+estateInfos.cep.substring(5,8);
            var tel = estateInfos.ddd_telefone_1
            var email = estateInfos.email;
            var socioAdm = estateInfos.qsa[0].nome_socio

            document.getElementById("cRazao").value = razao;
            document.getElementById("cLogra").value = logradouro;
            document.getElementById("cNum").value = numero;
            document.getElementById("cComple").value = complemento;
            document.getElementById("cBairro").value = bairro;
            document.getElementById("cCity").value = city;
            document.getElementById("cUf").value = uf;
            document.getElementById("cCep").value = cep;
            document.getElementById("cPhone").value = tel;
            document.getElementById("cEmail").value = email;
            document.getElementById("cAdmName").value = socioAdm;

            if(fantasia == "") {
                document.getElementById("cFantasia").value = razao;
            } else {
                document.getElementById("cFantasia").value = fantasia;
            };
            
            if(tel != "") {
                document.getElementById("cPhone").value = "("+tel.substring(0,2)+")"+tel.substring(2,6)+"-"+tel.substring(6,tel.legth);
            };
            

            console.log(estateInfos);
        };
    } else {
        alert("Por favor, verifique o CNPJ digitado")
    }
};

function createBankOption(banks) {

    let inHtml = banks.fullName

    option = document.createElement("option");
    
    option.innerHTML = inHtml;

    //option.setAttribute("value", inHtml)

    return option;
    
};

function searchBox() {

    let data = makeGet("https://brasilapi.com.br/api/banks/v1");
    let banks = JSON.parse(data);
    let orderedList = document.getElementById("cBanks");


    banks.forEach(element => {
        let option = createBankOption(element);
        orderedList.appendChild(option);
        option.classList.add("banks");
        
    }

    );
};

function jobEsteira() {
    
    let request = izeeLogin("https://auth.redevistorias.com.br/login?response_type=token&redirect_uri=https://app.izee.com.br/auth&client_id=redeizee&scope=order:*%20client:*%20device:*%20financial:*%20package:*%20entity:*%20integration:*");

    let response = JSON.parse(request);

    console.log(response);


};
