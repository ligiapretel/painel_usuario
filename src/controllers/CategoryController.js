// Atividade categorias - fazer o mesmo que fizemos com users, configurar rota, controladores, criar views

const categories = [
    {
        id: 1,
        nome: "Bebidas",
        descricao: "Tudo que se pode beber",
        codigo: "RFK4471",
        img: "https://random.imagecdn.app/300/300"
    },
    {
        id: 2,
        nome: "Comida",
        descricao: "Tudo que se pode comer",
        codigo: "MAM2122",
        img: "https://random.imagecdn.app/300/300"
    },
];

const categoryController = {
    index:(req,res)=>{},
    show:(req,res)=>{},
    create:(req,res)=>{},
    store:(req,res)=>{},
    edit:(req,res)=>{},
    update:(req,res)=>{},
    delete:(req,res)=>{},
    destroy:(req,res)=>{}
}

module.exports = categoryController;