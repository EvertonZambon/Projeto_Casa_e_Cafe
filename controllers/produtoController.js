var produtoModel = require('../model/produtoModel');

ProdutoController = function(){

    this.buscarProdutos = function(requisicao, resposta){
        var produto = new produtoModel();

        produto.buscarProdutosBD(function(retornoDosProdutosCadastradosNoBD){
            resposta.render('plans', {titulo: 'Listagem', produtos: retornoDosProdutosCadastradosNoBD});
        });
    }
}

module.exports = ProdutoController;
