// aqui eu tenho a conexao com o banco de dados.
var dbConfig = require('../configuracaoBanco');
var mysql = require('mysql');

Produto = function(){
    this.codigo      = "";
    this.product     = "";
    this.price       = "";
    this.description = "";

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

module.exports = Produto;
