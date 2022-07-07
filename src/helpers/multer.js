const crypto = require('crypto');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,uploadConfig.path);
    },
    filename: (req,file,cb)=>{
        // Pegando extensão do arquivo
        const extension = file.originalname.split(".")[1];
        // Gerando um valor randômico e gerando um valor hexadecimal para gerar uma string
        const newName = crypto.randomBytes(10).toString("hex");
        // Altera o nome do arquivo para a string randômica
        cb(null,`${newName}.${extension}`);

    },
});

// const upload = multer({ dest: __dirname+'/../../uploads'});
const upload = multer({ storage });

module.exports = upload;