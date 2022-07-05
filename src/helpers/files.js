// Arquivo que vai auxiliar na manipulação de arquivos
//  Importando o módulo fs - file system, para gerenciarmos arquivos
var fs = require('fs');

// Para converter as imagens em base64 - binário 
const files = {
    base64Encode:(file)=>{
        return "data:image/gif;base64," + fs.readFileSync(file,"base64");
    }
};

module.exports = files;