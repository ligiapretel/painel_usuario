const indexController = {
    home: (req,res)=>{
return res.render("index",{title:"Painel Administrativo"});
    }
};

module.exports = indexController;