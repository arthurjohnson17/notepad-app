import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.listen(5000, ()=> {
    console.log("server running on localhost:5000");
})

