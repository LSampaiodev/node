const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let listaPedidos = [];



app.post('/pedidos', (req,res) => {
   const novoPedido = {
        id: listaPedidos.length+1,
        produto: req.body.produto,
        quantidade: req.body.quantidade,
        enderecoDeEntrega: req.body.enderecoDeEntrega,
        complementos: req.body.complementos,
        status: req.body.status,
    }
    listaPedidos.push(novoPedido);
    res.status(201).json({message: "Pedido novo cadastrado"});
});

//consulta id
app.get('/pedidos/:id',(req,res) => {
    const pedidosEncontrado = listaPedidos.find((pedidos) => pedidos.id === parseInt(req.params.id));
    if (!pedidosEncontrado) {
      res.status(404).json({message: "Pedido nao encontrado"})
    } else {
      res.json(pedidosEncontrado);
    }
  });

  app.get('/pedidos', (req, res) => {
    const statusPedido = req.query.status;
    if (statusPedido) {
        const pedidosFiltrados = listaPedidos.filter((pedido) => pedido.status === statusPedido);
        res.json(pedidosFiltrados);
    } else {
        res.status(404).json({message: "Status do pedido nao encontrado"})
    }
});

//atualizar as informações de um pedido existente.
app.put('/pedidos/:id', (req,res) => {
    const pedidoId = parseInt(req.params.id);
    const dadosAtualizados = req.body;
  
    //vai encontra o pedido na lista (findIndex)
    const index = listaPedidos.findIndex((pedido) => pedido.id === pedidoId); 
    if (index === -1) {
      res.status(404).json({message: "Pedido nao encontrado."})
    } else {
      listaPedidos[index] = {...listaPedidos[index], ...dadosAtualizados};
      res.json({message: "Status do pedido atualizado com sucesso!"});
    }
  });

//excluir um pedido do sistema de dados
app.delete('/pedidos/:id', (req,res) => {
    const pedidoId = parseInt(req.params.id);
    listaPedidos = listaPedidos.filter((pedido) => pedido.id !== pedidoId);
    res.json({message: "Pedido deletado com sucesso!"});
  });


//PORTA PARA ACESSAR
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});