const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

//middleware para configurar a sessao
app.use(session({
    secret: 'meusegredoseguro',
    resave: false, 
    saveUninitialized: true,//nao renovar a sessao a cade req

    cookie: { secure: false,
       maxAge: 60 * 1000 //  1 minuto 
    }
}));

//middleware para ler o corpo da req em JSON
app.use(express.json());

app.get('/',( req, res )=>{
    if(req.session.usuario){

        if(req.session.visitas){            
            req.session.visitas++
        }else{
            req.session.visitas = 1
        }  
        res.send(`
            Olá ${req.session.usuario},
            Você visitou esta página
             ${req.session.visitas} vezes.
        `);       

    }else{
        res.send(' Você visitou esta'+
            ' página 1 vez. Faça o login!');
    }
});

//rota para logar
app.post('/login', (req, res)=>{

    const { username, password } = req.body;

    if(username === 'marcos' && password === '123'){

        req.session.usuario = username;
        res.send('Login bem sucedido!');
    }
    else if(username === 'Admin' && password === 'Admin'){

        req.session.usuario = username;
        res.send('Login bem sucedido!');
    }else{
        res.send('Credenciais inválidas!')
    }
});


app.get('/perfil', (req, res)=>{
    if(req.session.usuario){
        res.send(`Bem vindo ao seu perfil , ${req.session.usuario}`);
    }else{
        res.send('Faça o login primeiro');
    }
});

//rota do logout
app.get('/logout', (req, res)=>{
    req.session.destroy( (err) =>{

        if(err){
            return res.send('Erro ao sair')
        }
        res.send('Logout realizado!')
    });
});






app.listen(PORT, ()=>{
    console.log(`Servidor rodando http://localhost:${PORT}`);
});


