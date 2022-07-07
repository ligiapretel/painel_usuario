// Importando módulo do File System
const fs = require('fs');

// Importando o arquivo files, que trata a imagem do avatar - base64
const files = require('../helpers/files');

const users = [
  {
    id: 1,
    nome: "Roberto",
    sobrenome: "Silva",
    email: "robertinho123@email.com",
    idade: 27,
    avatar: "user1.jpeg",
  },
  {
    id: 2,
    nome: "Ana",
    sobrenome: "Monteiro",
    email: "aninha123@email.com",
    idade: 22,
    avatar: "user2.jpeg",
  },
  {
    id: 3,
    nome: "Juliana",
    sobrenome: "Rios",
    email: "ju123@email.com",
    idade: 18,
    avatar: "user3.jpeg",
  },
  {
    id: 4,
    nome: "João",
    sobrenome: "Oliveira",
    email: "joaozinho123@email.com",
    idade: 45,
    avatar: "user4.jpeg",
  },
  {
    id: 5,
    nome: "Roberto",
    sobrenome: "Carlos",
    email: "robertinho123@email.com",
    idade: 70,
    avatar: "user5.jpeg",
  },
  {
    id: 6,
    nome: "Pedro",
    sobrenome: "Santos",
    email: "pedrinho123@email.com",
    idade: 20,
    avatar: "user6.jpeg",
  },
  {
    id: 7,
    nome: "Lucas",
    sobrenome: "Morais",
    email: "luquinhas123@email.com",
    idade: 30,
    avatar: "user7.jpeg",
  },
  {
    id: 8,
    nome: "Hélder",
    sobrenome: "Santos",
    email: "helder123@email.com",
    idade: 25,
    avatar: "user8.jpeg",
  },
  {
    id: 9,
    nome: "Marcos",
    sobrenome: "Souza",
    email: "marquinhos123@email.com",
    idade: 40,
    avatar: "user9.jpeg",
  },
];

const userController = {
    index: (req,res)=>{
        return res.render("users",{title:"Lista de usuários", users});
        //Quando a chave tem o mesmo nome do valor, podemos omitir no código. Ex.: 
        // return res.render("users",{title:"Lista de usuários", users:users});
    },
    show:(req,res)=>{
        //Pegando o id que virá via url - GET
        const {id} = req.params;
        //Verificando se o id existe
        const userResult = users.find((user)=>user.id===parseInt(id));
        if(!userResult){
            return res.render("error",{
                title:"Ops!",
                message:"Usuário não encontrado"
            });
        };
        const user = {
          // Spread Operator
          ...userResult,
          avatar: files.base64Encode(__dirname+"/../../uploads/"+userResult.avatar),
        };
        return res.render("user",{
            title:"Visualizar usuário",
            user,
        });
    },
    create:(req,res)=>{
        return res.render("user-create",{title:"Cadastrar usuário"});
    },
    store:(req,res)=>{
      const {nome, sobrenome, idade, email, avatar} = req.body;
      //Criando um arquivo padrão que será enviado caso o usuário não suba nenhuma imagem
      let filename = "user-default.jpeg";
      // Caso a imagem tenha sido enviada, ele armazena na variável filename o arquivo enviado pelo usuário
      if(req.file){
        filename = req.file.filename;
      }
      if(!nome || !sobrenome || !idade || !email){
        return res.render("user-create",{
          title:"Cadastrar usuário",
          // Criando a chave erro como um valor opcional
          error: {
            message:"Preencha todos os campos."
          }
        });
      };
      const newUser = {
        id: users.length + 1,
        nome, //como chave e valor tem o mesmo identificador, posso colocar dessa forma
        sobrenome, 
        idade, 
        email, 
        avatar: filename,
      };
      users.push(newUser);
      return res.render("success",{
        title:"Sucesso",
        message:"Usuário criado com sucesso!"
      });
    },
    edit:(req,res)=>{
      const {id} = req.params;
      const userResult = users.find((user)=> user.id===parseInt(id));
      if(!userResult){
        return res.render("error",{
          title: "Ops!",
          message:"Nenhum usuário encontrado."
        });
      }
      return res.render("user-edit",{
        title: "Editar usuário",
        user: userResult
      });
    },
    update:(req,res)=>{
      const {id} = req.params;
      const {nome, sobrenome, idade, email} = req.body;
      const userResult = users.find((user)=> user.id===parseInt(id));
      let filename;
      if(req.file){
        filename = req.file.filename;
      }
      if(!userResult){
        return res.render("error",{
          title: "Ops!",
          message:"Nenhum usuário encontrado."
        });
      }
      const updateUser = userResult;
      if(nome) updateUser.nome = nome;
      if(sobrenome) updateUser.sobrenome = sobrenome;
      if(email) updateUser.email = email;
      if(idade) updateUser.idade = idade;
      if(filename) {
        //Apagar a imagem de usuário anterior
        let avatarTmp = updateUser.avatar;
        fs.unlinkSync(__dirname + "/../../uploads" + avatarTmp);
        updateUser.avatar = filename;
      }
    return res.render("success",{
        title: "Usuário atualizado",
        message:`Usuário ${updateUser.nome} foi atualizado.`
      });
    },
    delete:(req,res)=>{
      const {id} = req.params;
      const userResult = users.find((user)=> user.id===parseInt(id));
      if(!userResult){
        return res.render("error",{
          title: "Ops!",
          message:"Nenhum usuário encontrado."
        });
      }
      const user = {
        //Recebendo a chave do userResult
        ...userResult,
        avatar: files.base64Encode(
          __dirname + "/../../uploads/" + userResult.avatar
        ),
      };
      return res.render("user-delete",{
        title:"Deletar usuário",
        user: userResult
      })
    },
    destroy:(req,res)=>{
      const {id} = req.params;
      const result = users.findIndex((user)=>user.id===parseInt(id));
      if(result===-1){
        return res.render("error",{
          title: "Ops!",
          message:"Nenhum usuário encontrado."
        });
      };
      // Para apagar a imagem do avatar tb da pasta uploads
      fs.unlinkSync(__dirname+"/../../uploads"+users[result].avatar);
      users.splice(result,1);
      return res.render("success",{
        title: "Usuário deletado",
        message:`Usuário deletado com sucesso.`
      });
    }
};

module.exports = userController;