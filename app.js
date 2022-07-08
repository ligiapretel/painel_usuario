const express = require('express');
const app = express();
const port = 3000;
//Importando pacote method-override.Esse pacote serve para sobrescrever/alterar um método. Num form só conseguimos usar GET ou POST, e esse pacote permite que a gente use PUT, DELETE, etc
const methodOverride = require("method-override");
const indexRoute = require("./src/routes/indexRoute");
const userRoute = require("./src/routes/userRoute");


// Configurando pasta estática para acesso externo (onde ficam as imagens e css)
app.use(express.static(__dirname+"/public"));
// Configurando a view engine para ejs
app.set("view engine","ejs");
// indicando o caminho das nossas views
app.set("views",__dirname+"/src/views");
//Configurando o methodOverride no express
app.use(methodOverride("_method"));
// Convertendo corpo da requisição (body) em objeto literal
app.use(express.json());
//url encoded serve para a gente converter a carga da requisição em um formato que o json aceite
app.use(express.urlencoded({extended:false}));
// Middleware global - vai ser executado sempre que qualquer rota for chamada
app.use((req,res,next)=>{
    // console.log("Entrou no middleware");
    // console.log(req);
    //Todo middleware tem que ter obrigatoriamente o next no final, para chamar a próxima execução
    next();
});

app.use("/",indexRoute);
app.use("/user/",userRoute);

// Middleware para página não encontrada - deve vir depois de todas as rotas para não dar erro
app.use((req,res,next)=>{
    res.status(404).render("error",{
        title: "Ops!",
        message: "Página não encontrada",
    });
});

//Outra forma de fazer essa página não encontrada
// app.get("*",(req,res,next)=>{
//     res.status(404).render("error",{
//         title: "Ops!",
//         message: "Página não encontrada",
//     });
// });


app.listen(port, ()=>{
    console.log(`Estamos rodando na porta ${port}`)
})