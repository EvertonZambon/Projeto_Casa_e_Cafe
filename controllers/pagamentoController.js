var produtoModel = require('../model/produtoModel');
var pagamentoModel = require('../model/pagamentoModel');

PagamentoController = function(){

    this.buscarProdutos = function(requisicao, resposta){
        var pagamento = new pagamentoModel();

        pagamento.buscarProdutosBD(function(retornoDosProdutosCadastradosNoBD){
            resposta.render('prepayment', {titulo: 'Pagamento', produtos: retornoDosProdutosCadastradosNoBD});
        });
    }


    this.cadastrarPagamento = function(requisicao, resposta){
        var pagamento = new pagamentoModel();
        pagamento.codProduct     = requisicao.body.cod;
        pagamento.payment_date   = requisicao.body.dataPag;
        pagamento.payment_type   = requisicao.body.tipoPag;
        pagamento.discount       = requisicao.body.desconto;
        pagamento.price          = requisicao.body.precoProduto;

        pagamento.cadastrarPagamentoBD(pagamento, resposta);
    }
}

module.exports = PagamentoController;
