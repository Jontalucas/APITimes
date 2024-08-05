import express from "express";
import mongoose from "mongoose";
import TimeModel from "./models/TimeModel.js";
import ProdutoModel from "./models/ProdutoModel.js";

mongoose.connect("mongodb+srv://jontalucas:12345@cluster0.z1j0az3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const app = express();
app.listen(3333);
app.use(express.json())

app.get("/times", async (req, res) => {
    try {
        const response = await TimeModel.find()
        return res.json(response)
    } catch (error) {
        return res.status(500).json({ message: "Erro ao recuperar os dados. "+ error})
    }
})

app.get("/times/:id", async (req, res) => {
    try {
        const id = req.params.id
        const response = await TimeModel.findById(id)

        if (!response){
            return res.status(404).json({message: "Não existe time com esse id"})
        }

        return res.json(response)
        
    } catch (error) {
        return res.status(500).json({ message: "Erro ao recuperar os dados. "+ error})
    }
})

app.post("/times", async (req, res) => {
    try {
        const body = req.body
        await TimeModel.create({nome: body.nome, URLimagem: body.URLimagem})
        return res.status(201).json({message: "ok"});
    } catch (error) {
        return res.status(500).json({message:"Erro ao cadastrar o time! "+ error})
    }
})

app.put("/times/:id", async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id
        const time = await TimeModel.findOneAndUpdate({_id: id}, {nome: body.nome, URLimagem: body.URLimagem})
        

        if (!time){
            return res.status(404).json({message: "Não existe time com esse id"})
        }

        return res.json({message: "ok"})

        
    } catch (error) {
        return res.status(500).json({ message: "Erro ao recuperar os dados. "+ error})
    }
})

app.delete("/times/:id", async (req, res) => {
    try {
        const id = req.params.id
        const time = await TimeModel.findOneAndDelete({_id: id})
        

        if (!time){
            return res.status(404).json({message: "Não existe time com esse id"})
        }

        return res.json({message: "ok"})

        
    } catch (error) {
        return res.status(500).json({ message: "Erro ao recuperar os dados. "+ error})
    }
})

app.post("/produtos", async (req, res)=>{
    const body = req.body
    try {
        await ProdutoModel.create(body)
        return res.status(201).json({message: "ok"})
    } catch (error) {
        return res.status(500).json({message:"Erro ao cadastrar o produto! "+ error})
    }
})

app.get("/produtos", async (req, res) => {
    try {
        const response = await ProdutoModel.find()
        return res.json(response)
    } catch (error) {
        return res.status(500).json({ message: "Erro ao recuperar os dados. "+ error})
    }
})

app.get("/produtos-time/:id", async (req, res) => {
    const idTime = req.params.id
    try {
        const response = await ProdutoModel.find({time: idTime})
        return res.json(response)
    } catch (error) {
        return res.status(500).json({ message: "Erro ao recuperar os dados. "+ error})
    }
})

app.get("/produtos/:id", async (req, res) => {
    const id = req.params.id
    try {
        const response = await ProdutoModel.findById(id)
        if (!response){
            return res.status(404).json({message: "Não existe produto com esse id"})
        }
        return res.json(response)
    } catch (error) {
        return res.status(500).json({ message: "Erro ao recuperar os dados. "+ error})
    }
})

app.put("/produtos/:id", async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id
        const produto = await ProdutoModel.findOneAndUpdate({_id: id}, body)
        

        if (!produto){
            return res.status(404).json({message: "Não existe produto com esse id"})
        }

        return res.json({message: "ok"})

        
    } catch (error) {
        return res.status(500).json({ message: "Erro ao recuperar os dados. "+ error})
    }
})

app.delete("/produtos/:id", async (req, res) => {
    try {
        const id = req.params.id
        const produto = await ProdutoModel.findOneAndDelete({_id: id})
        

        if (!produto){
            return res.status(404).json({message: "Não existe produto com esse id"})
        }

        return res.json({message: "ok"})

        
    } catch (error) {
        return res.status(500).json({ message: "Erro ao recuperar os dados. "+ error})
    }
})