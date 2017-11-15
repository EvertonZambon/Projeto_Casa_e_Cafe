var produtoModel = require('../model/produtoModel');

ProdutoController = function(){

    this.buscarProdutos = function(requisicao, resposta){
        var produto = new produtoModel();

        produto.buscarProdutosBD(function(retornoDosProdutosCadastradosNoBD){
            resposta.render('plans', {titulo: 'Listagem', produtos: retornoDosProdutosCadastradosNoBD});
        });
    }

    /*
    this.cadastrarPessoa = function(requisicao, resposta){
        var pessoa = new pessoaModel();
        pessoa.nome      = requisicao.body.nome;
        pessoa.sobrenome = requisicao.body.sobrenome;
        pessoa.cpf       = requisicao.body.cpf;
        pessoa.telefone  = requisicao.body.telefone;
        pessoa.endereco  = requisicao.body.endereco;

        pessoa.salvarPessoaBD(pessoa);
                                                   //callback
        pessoa.buscarPessoasBD(function(retornoDasPessoasCadastradasNoBD){
            resposta.redirect('/');
        });
    }                                               */

    this.buscarPessoas = function(requisicao, resposta){
        var pessoa = new pessoaModel();

        pessoa.buscarPessoasBD(function(retornoDasPessoasCadastradasNoBD){
            resposta.render('index', {titulo: 'HomePage', pessoas: retornoDasPessoasCadastradasNoBD});
        });
    }

    this.buscarPorNome = function(requisicao, resposta){
        var pessoa = new pessoaModel();
        var nome = requisicao.query.nome;

        pessoa.buscarPorNomeBD(nome, function(nomeBuscado){
            // Quando ele renderiza a página,  ele não troca a rota, apenas irá
            // renderizar a página que você está pedindo e irá manter a mesma rota.
            resposta.render('index', {titulo: "HomePage", pessoas: nomeBuscado});
        });
    }

}
/*
PessoaController.buscarPorNome = function(requisicao, resposta){
    var pessoa = new pessoaModel();
    var nome = requisicao.query.nome;

    pessoa.buscarPorNomeBD(nome, function(nomeBuscado){
        console.log('chegou aqui');
        resposta.redirect('/');
        //resposta.render('index', {titulo: "HomePage", pessoas: nomeBuscado});
    });
}       */

module.exports = ProdutoController;
