const db = require("./db")
const express = require("express")

const port = 3000
const server = express()

server.use(express.json())

// Teste
server.get("/", (req,res)=>{
    res.send("API funcionado")
})

// Leitura todos usuários
server.get("/users", (req,res)=>{
    const query = "SELECT * FROM usuarios"
    db.query(query, (err,result)=>{
        if(err){
            console.error("Erro ao buscar os usuários:" + err)
            res.status(500).send("Erro ao buscar usuários")
            return
        }
        res.json(result)
    })
})

// Leitura um usuário
server.get("/users/:id", (req,res)=>{
    const query = "SELECT * FROM usuarios WHERE id = ?"
    const { id } = req.params
    db.query(query, [id], (err, result)=>{
        if(err){
            console.error("Erro ao buscar usuário:" + err)
            res.status(500).send("Erro ao buscar usuário")
            return
        }
        if(result.length === 0){
            res.status(404).send("Usuário não encontrado")
            return
        }
        res.json(result[0])
    })
})

// Criação novo usuário
server.post("/users", (req,res)=>{
    const { nome, email, telefone, data_nascimento } = req.body
    const query = "INSERT INTO usuarios (nome, email, telefone, data_nascimento) VALUES (?, ?, ?, ?)"
    db.query(query, [nome, email, telefone, data_nascimento], (err, result)=>{
        if(err){
            console.error("Erro ao buscar os usuários:" + err)
            res.status(500).send("Erro ao buscar usuários")
            return
        }
        res.status(201).send("Usuário criado com sucesso")
    })
})

// Atualização de usuário
server.put("/users/:id", (req,res)=>{
    const { nome, email, telefone, data_nascimento } = req.body
    const { id } = req.params
    const query = "UPDATE usuarios SET nome = ?, email = ?, telefone = ?, data_nascimento = ? WHERE id = ?"
    db.query(query, [nome, email, telefone, data_nascimento, id], (err, result)=>{
        if(err){
            console.error("Erro ao atualizar os usuários:" + err)
            res.status(500).send("Erro ao buscar usuários")
            return
        }
        if(result.affectedRows === 0){
            res.status(404).send("Usuário não encontrado")
            return
        }
        res.send("Usuário atualizado com sucesso")
    })
})

// Deletar usuário
server.delete("/users/:id", (req,res)=>{
    const { id } = req.params
    const query = "DELETE FROM usuarios WHERE id = ?"
    db.query(query, [id], (err,result)=>{
        if(err){
            console.log("Erro ao deletar o usuário: " + err)
            res.status(500).send("Erro ao deletar usuário")
            return
        }
        if(result.affectedRows === 0){
            res.status(404).send("Usuário não encontrado")
            return
        }
        res.send("Usuário deletado com sucesso")
    })
})


server.listen(port, ()=>{
    console.log("Servidor rodando em http://localhost:"+port)
})