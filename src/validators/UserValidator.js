const userValidator = {
    storeValidator: (req,res,next)=>{
        const {nome,email,idade,sobrenome} = req.body;
        if(!nome || !sobrenome || !idade || !email){
            return res.render("user-create",{
              title:"Cadastrar usuário",
              // Criando a chave erro como um valor opcional
              error: {
                message:"Preencha todos os campos."
              }
            });
          };
          next();
    }
};

module.exports = userValidator;