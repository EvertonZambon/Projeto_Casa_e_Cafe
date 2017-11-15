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

        if( conexaoBD.query("INSERT INTO Pagamentos(codProduct, payment_date, payment_type, discount, price) VALUES('"+pagamento.codProduct+"', '"+pagamento.payment_date+"', '"+pagamento.payment_type+"', '"+pagamento.discount+"', '"+pagamento.price+"')") ){
            resposta.render('payment', {titulo: 'Pagamento concluído', produto: pagamento});
        }   else{
                console.log("Erro ao cadastrar o pagamento no banco de dados.");
                resposta.redirect('/');
            }
              /*
        conexaoBD.query("INSERT INTO Pagamentos(codProduct, payment_date, payment_type, discount, price) VALUES('"+pagamento.codProduct+"', '"+pagamento.payment_date+"', '"+pagamento.payment_type+"', '"+pagamento.discount+"', '"+pagamento.price+"')", function(erro, pagamento){
            if(!erro){
                console.log("nao deu erro na insercao e vai chamar a paginar payent com os dados do post");
                resposta.render('payment', {titulo: 'Pagamento concluído', pagamento: pagamento.body});
            }   else{
                    console.log("Erro ao cadastrar o pagamento no banco de dados.");
                }
        });           */
    };
                                        //funcao de callback
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
}

module.exports = Pagamento;
