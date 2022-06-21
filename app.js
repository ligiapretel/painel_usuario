const express = require('express');
const app = express();
const port = 3000;

// Configurando pasta estática para acesso externo (onde ficam as imagens e css)
app.use(express.static(__dirname+"/public"));
// Configurando a view engine para ejs
app.set("view engine","ejs");
// indicando o caminho das nossas views
app.set("views",__dirname+"/src/views");

app.listen(port, ()=>{
    console.log(`Estamos rodando na porta ${port}`)
})