const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

db.connect( err => {
    if(err){
        console.error("Erro ao conectar ao banco de dados" + err)
    }
    console.log("Conectado ao banco de dados MySQL")
})

module.exports = db