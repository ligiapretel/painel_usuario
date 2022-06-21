const express = require('express');
const app = express();
const port = 3000;
//Importando pacote method-override.Esse pacote serve para sobrescrever/alterar um método. Num form só conseguimos usar GET ou POST, e esse pacote permite que a gente use PUT, DELETE, etc
const methodOverride = require("method-override");

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
app.use(expree.urlencoded({extended:false}));


app.listen(port, ()=>{
    console.log(`Estamos rodando na porta ${port}`)
})