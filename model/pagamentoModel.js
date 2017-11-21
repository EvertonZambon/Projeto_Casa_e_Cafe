// aqui eu tenho a conexao com o banco de dados.
var dbConfig = require('../configuracaoBanco');
var mysql = require('mysql');

Pagamento = function(){
    this.codProduct   = "";
    this.payment_date = "";
    this.payment_type = "";
    this.discount     = "";
    this.price        = "";

    this.cadastrarPagamentoBD = function(pagamento, resposta){
        var conexaoBD = mysql.createConnection(dbConfig);
        var arrayPagamentos = [];
                //inserir uma string errada para força o erro e redirecionar para outra página.
        conexaoBD.query("INSERT INTO Pagamentos(codProduct, payment_date, payment_type, discount, price) VALUES('"+pagamento.codProduct+"', '"+pagamento.payment_date+"', '"+pagamento.payment_type+"', '"+pagamento.discount+"', '"+pagamento.price+"')", function(erro){
            if(!erro){
                buscarDadosUltimoPagamentoBD(function(ultimoPag){
                    resposta.render('payment', {titulo: 'Pagamento concluído', produto: pagamento, transID: ultimoPag[0].transaction_id, nomeProd: ultimoPag[0].product});

                });

            }   else{
                    console.log("Erro ao cadastrar o pagamento no banco de dados.");
                    resposta.redirect('error');
                }
        });
    };

    this.buscarProdutosBD = function(produtosCadastradosNoBD){

        var conexaoBD = mysql.createConnection(dbConfig);
        var arrayProdutos = [];

        conexaoBD.query("SELECT * FROM Produtos", function(erro, produtos){
            if(!erro){
                arrayProdutos = produtos;
                produtosCadastradosNoBD(arrayProdutos);
                conexaoBD.end();
            }   else{
                    console.log("Erro ao buscar os produtos no banco de dados.");
                    conexaoBD.end();
                }
        });
    }

    function buscarDadosUltimoPagamentoBD(ultimoPag){
        var conexaoBD = mysql.createConnection(dbConfig);

        conexaoBD.query("SELECT PA.transaction_id, PR.product FROM Pagamentos PA JOIN Produtos PR ON PA.codProduct = PR.cod WHERE transaction_id = (SELECT MAX(transaction_id) FROM Pagamentos)", function(erro, dados){
            if(!erro){
                ultimoPag(dados);
                conexaoBD.end();
            }   else{
                    console.log("Erro ao buscar os dados do pagamento no banco de dados.");
                    conexaoBD.end();
                }
        });
    }
}

module.exports = Pagamento;
