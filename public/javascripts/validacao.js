window.onload = function(){
    var data = new Date();
    ano = data.getFullYear();
    mes = data.getMonth();
    mes++;
    dia = data.getDate(); //retorna o dia

    document.getElementById("dataPag").value = dia+"/"+mes+"/"+ano; //seta uma data string.
    desabilitarCampos();
    document.getElementById("dataPag").disabled = true; //Desabilitando

    var botaoConfirmar = document.getElementById("btnDesconto");
    var botaoDesfazer = document.getElementById("desfazer");
    var btnCadastrar = document.getElementById("btnCadastrar");
    btnCadastrar.disabled = true;

    //evento do botao confirmar
    botaoConfirmar.onclick = function confirmarDesconto(){
        var codigoProd = document.getElementById("cod");
        codigoProd.disabled = false;
        codigoProd = codigoProd.value;

        if(codigoProd != ""){ //verifica se o input nao está vazio.
            var radios = document.getElementsByName('tipoPag');
            var selecionado = "";

            for (var i=0; i < radios.length; i++){   //recupera o radiobtn do tipo
                if (radios[i].checked) {             //de pagamento selecionado
                    selecionado = radios[i].value;
                }
            }

            if(selecionado != ""){
                var valorDeDesconto = parseInt(document.getElementById("desconto").value);

                if(isNaN(valorDeDesconto) || valorDeDesconto < 0){
                    var codigoProd = document.getElementById("cod");
                    codigoProd.disabled = true;
                    alert("Preencha o valor de desconto corretamente.");

                }   else{
                        var codigoProd = document.getElementById("cod");
                        codigoProd.disabled = true;
                        var precoProduto  = parseFloat(document.getElementById("precoProduto").value);
                        var desconto = (valorDeDesconto/100) * precoProduto;

                        var precoDesconto = document.getElementById("precoDesconto");
                        var calculo = parseFloat(precoProduto-desconto);

                        var arredondado = parseFloat(calculo.toFixed(2));

                        precoDesconto.value = arredondado;

                        document.getElementById("btnCadastrar").disabled = false;
                    }

            }   else{
                    var codigoProd = document.getElementById("cod");
                    codigoProd.disabled = true;
                    alert("Selecione o tipo de pagamento antes de confirmar.");
                }

        }   else{
                var codigoProd = document.getElementById("cod");
                codigoProd.disabled = true;
                alert("Selecione um produto antes de confirmar.");
            }
                //fim
    }

    //evento do botao desfazer.
    botaoDesfazer.onclick = function desfazerDesconto(){
        document.getElementById("desconto").value = "";
        document.getElementById("precoDesconto").value = "";
        //valor.value = "";
        //valorDeDesconto.value = "";
        var btnCadastrar = document.getElementById("btnCadastrar");
        btnCadastrar.disabled = true;
    }

    //evento do botao cadastrar
    btnCadastrar.onclick = cadastrarPagamento;

    function cadastrarPagamento(){
        habilitarCampos();  //habilita os campos para passar os parametros via post.
    }
};

function preencherCampos(radio){
    var linha   = radio.parentNode.parentNode;
    var colunas = linha.children;

    if(colunas[0].id > 0){
        var codigo  = colunas[0].id;
        var nome    = colunas[1].id;

        document.getElementById("cod").value = colunas[0].id;
        document.getElementById("produto").value = colunas[1].innerHTML;
        document.getElementById("precoProduto").value = colunas[2].innerHTML;
        desabilitarCampos();
    }
}

function desabilitarCampos(){
  document.getElementById("cod").disabled = true; //Desabilitando
  document.getElementById("produto").disabled = true; //Desabilitando
  document.getElementById("precoProduto").disabled = true; //Desabilitando
  document.getElementById("precoDesconto").disabled = true;
}

function habilitarCampos(){
  document.getElementById("cod").disabled = false; //Desabilitando
  document.getElementById("dataPag").disabled = false; //Desabilitando
  document.getElementById("produto").disabled = false; //Desabilitando
  document.getElementById("precoProduto").disabled = false; //Desabilitando
}
