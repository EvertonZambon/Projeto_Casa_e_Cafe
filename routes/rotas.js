//pasta routes
var express = require('express');
var router = express.Router();

var produtoController = require('../controllers/produtoController');
var pagamentoController = require('../controllers/pagamentoController');

//rota get para renderizar a homePage.
router.get('/', function(requisicao, resposta, next) {
    resposta.render('homePage', {titulo: 'Home Page'});
});

//rota get para buscar produtos.
router.get('/plans', function(requisicao, resposta, next){
    produto = new produtoController();
    produto.buscarProdutos(requisicao, resposta);
});

//rota get para a tela de pagamentos.
router.get('/prepayment', function(requisicao, resposta, next){
    pagamento = new pagamentoController();
    pagamento.buscarProdutos(requisicao, resposta);
});

//rota post que confirma o pagamento..
router.post('/payment', function(requisicao, resposta, next){
    pagamento = new pagamentoController();
    pagamento.cadastrarPagamento(requisicao, resposta);
});

module.exports = router;
