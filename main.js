//declara a Função GET

function makeGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false);
    request.send();
    return request.responseText;
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

function searchBank() {

}
