const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let listaProdutos = [];

//add produtos
app.post('/produtos',(req,res) => {
    const novoProduto = {
        id: listaProdutos.length+1,
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        qtdEstoque: req.body.qtdEstoque,
        categoria: req.body.categoria,
    }
    listaProdutos.push(novoProduto);
    res.status(201).json({message: 'Produto cadastrado com sucesso'})

});

//consulta id
app.get('/produtos/:id',(req,res) => {
  const produtoEncontrado = listaProdutos.find((produto) => produto.id === parseInt(req.params.id));
  if (!produtoEncontrado) {
    res.status(404).json({message: "Produto nao encontrado"})
  } else {
    res.json(produtoEncontrado);
  }
});

//listar todos os produtos cadastrados
app.get('/produtos', (req,res) => {
  res.json(listaProdutos);
});

//atualizar as informações de um produto existente.
app.put('/produtos/:id', (req,res) => {
  const produtoId = parseInt(req.params.id);
  const dadosAtualizados = req.body;

  //vai encontra o produto na lista (findIndex)
  const index = listaProdutos.findIndex((produto) => produto.id === produtoId); 
  if (index === -1) {
    res.status(404).json({message: "Produto nao encontrado."})
  } else {
    listaProdutos[index] = {...listaProdutos[index], ...dadosAtualizados};
    res.json({message: "Dados do produto atualizado com sucesso!"});
  }
});

//excluir um produto do sistema
app.delete('/produtos/:id', (req,res) => {
  const produtoId = parseInt(req.params.id);
  listaProdutos = listaProdutos.filter((produto) => produto.id !== produtoId);
  res.json({message: "Produto deletado com sucesso!"});
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});