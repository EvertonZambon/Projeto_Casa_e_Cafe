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

    /*
    this.salvarPessoaBD = function(pessoa){
        var conexaoBD = mysql.createConnection(dbConfig);
        var arrayPessoas = [];
        conexaoBD.query("INSERT INTO Pessoa(nome, sobrenome, cpf, telefone, endereco) VALUES('"+pessoa.nome+"', '"+pessoa.sobrenome+"', '"+pessoa.cpf+"', '"+pessoa.telefone+"', '"+pessoa.endereco+"')");
    };      */    /*
                                        //funcao de callback
    this.buscarPessoasBD = function(pessoasCadastradasNoBD){
        var conexaoBD = mysql.createConnection(dbConfig);
        var arrayPessoas = [];

        conexaoBD.query("SELECT * FROM Pessoa", function(erro, pessoas){
            if(!erro){
                arrayPessoas = pessoas;
                pessoasCadastradasNoBD(arrayPessoas);
                conexaoBD.end();
            }   else{
                    console.log("Erro ao buscar as pessoas no banco de dados.");
                    conexaoBD.end();
                }
         });
    }

    this.buscarPorNomeBD = function(nome, callback){
        var conexaoBD = mysql.createConnection(dbConfig);
        var arrayPessoas = [];

        conexaoBD.query("SELECT * FROM Pessoa WHERE nome = '"+nome+"'", function(erro, nomesEncontradosBD){
            if(!erro){
                if(nomesEncontradosBD.length > 0){
                    arrayPessoas = nomesEncontradosBD;
                }   else{
                        console.log("Não encontrou nenhuma pessoa com o nome especificado no banco de dados.");
                    }

                callback(arrayPessoas);
                conexaoBD.end();
            }   else{
                    console.log("Erro ao buscar as pessoas no banco de dados.");
                    conexaoBD.end();
                }
        });
    }                                                                                         */
}

module.exports = Produto;
