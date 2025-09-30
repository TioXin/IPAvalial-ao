const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use(express.json());

app.use(session({
    secret: 'meusegredoseguro',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 1000 } // 1 minuto
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if ((username === 'marcos' && password === '123') ||
        (username === 'Admin' && password === 'Admin')) {
        req.session.usuario = username;
        res.send('Login bem sucedido!');
    } else {
        res.send('Credenciais inválidas!');
    }
});

app.get('/perfil', (req, res) => {
    if (req.session.usuario) {
        res.send(`Bem vindo ao seu perfil, ${req.session.usuario}`);
    } else {
        res.send('Faça o login primeiro');
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Erro ao sair');
        res.send('Logout realizado!');
    });
});

// Rotas de teste de status

// 200 - Sucesso
app.get('/sucesso', (req, res) => {
    res.status(200).send('Requisição bem sucedida!');
});

// 201 - Criar
app.post('/criar', (req, res) => {
    res.status(201).send('Recurso criado com sucesso!');
});

// 404 - Não encontrado
app.get('/nao-encontrado', (req, res) => {
    res.status(404).send('Recurso não encontrado!');
});

// 401 - Não autorizado
app.get('/nao-autorizado', (req, res) => {
    res.status(401).send('Você não está autorizado!');
});

// 403 - Proibido
app.get('/proibido', (req, res) => {
    res.status(403).send('Acesso proibido!');
});

// 405 - Método não permitido
app.get('/somente-get', (req, res) => {
    res.status(200).send('Esta rota só aceita GET');
});
app.post('/somente-get', (req, res) => {
    res.status(405).send('Método POST não permitido!');
});

// 409 - Conflito
app.post('/usuario', (req, res) => {
    res.status(409).send('Conflito ao criar usuário!');
});

// 429 - Muitas requisições
app.get('/limite', (req, res) => {
    res.status(429).send('Muitas requisições, tente novamente mais tarde!');
});

// 503 - Servidor indisponível
app.get('/manutencao', (req, res) => {
    res.status(503).send('Servidor em manutenção!');
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
