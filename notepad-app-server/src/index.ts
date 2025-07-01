import express from "express";
import cors from "cors";
import { PrismaClient } from './generated/prisma'

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
    try{
        const notes = await prisma.note.findMany();
        res.json(notes);
    } catch (error)
    {
        res.status(500).send("Something went wrong: faield to find");
    }
});

app.post("/api/notes", async (req, res) => {
    const { title, content } = req.body;

    if(!title || !content){
        res.status(400).send("title and content fields required");
        return;
    }

    try{
        const note = await prisma.note.create({
            data: { title, content},
        });
        res.json(note);
    } catch (error)
    {
        res.status(500).send("Something went wrong: faield to create");
    }
});

app.put("/api/notes/:id", async (req, res) => {
    const {title, content} = req.body;
    const id = parseInt(req.params.id);

    if(!id || isNaN(id)) {
        res.status(400).send("ID must be a valid number");
        return;
    }

    if(!title || !content){
        res.status(400).send("title and content fields required");
        return;
    }

    try {
        const updateNote = await prisma.note.update({
            where: { id },
            data: {title, content},
        });
        res.json(updateNote);
    }  catch (error)
    {
        res.status(500).send("Something went wrong: failed to update");
    }
});

app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if(!id || isNaN(id)) {
        res.status(400).send("ID must be a valid number");
        return;
    }

    try {
        await prisma.note.delete({
            where: { id },
        });
        res.status(204).send();
    }  catch (error)
    {
        res.status(500).send("Something went wrong: failed to delete");
    }

});

app.listen(5000, ()=> {
    console.log("server running on localhost:5000");
});

