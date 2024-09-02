const express = require('express');
const bodyParser = require('body-parser');
const User = require('./classes/user');
const Task = require('./classes/task');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let users = [];
let tasks = [];

app.post('/users',(req,res) => {
    const {name} = req.body;
    const newUser = new User(users.length + 1,name);
    users.push(newUser);
    res.json(newUser);
});
app.post('/users/:userId/tasks',(req,res) => {
    const {userId} = req.params;
    const {description} = req.body;
    const user = users.find(user => user.id === parseInt(userId));
    if (!user) return res.status(404).json({ error:'Usuario não encontrado'});
    const newTask = new Task(tasks.length + 1, description, user.id);
    tasks.push(newTask);
    user.tasks.push(newTask);
    res.json(newTask);
});
app.get('/users/:userId/tasks', (req, res) => {
    const { userId } = req.params;
    const user = users.find(user => user.id === parseInt(userId));
    if (!user) 
    return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user.tasks);
});

app.put('/users/:userId/tasks/:taskId', (req, res) => {
    const { userId, taskId } = req.params;
    const user = users.find(user => user.id === parseInt(userId));
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    const task = user.tasks.find(task => task.id === parseInt(taskId));
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    task.completed = true;
    res.json(task);
});

app.delete('/users/:userId/tasks/:taskId', (req,res) => {
    const {userId,taskId} = req.params;
    const user = users.find(user => user.id === parseInt(userId));
    if(!user) return res.status(404).json({error:'Usuario não encontrado'});
    const taskIndex = user.tasks.findIndex(task => task.id === parseInt(taskId));
    if(taskIndex === -1) return res.status(404).json({error:'Tarefa não encontrada'});
    user.tasks.splice(taskIndex, 1);
    tasks = tasks.filter(task => task.id !== parseInt(taskId));
    res.json({message: 'Tarefa excluída com sucesso'});
});


app.listen(PORT,() => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
