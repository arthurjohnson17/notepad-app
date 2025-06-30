import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Define a basic route for the root path
app.get('/', (req, res) => {
  res.send('Notepad API is running');
});

// API route for getting notes (placeholder)
app.get('/api/notes', (req, res) => {
  res.json([]);
});

// API route for creating a note (placeholder)
app.post('/api/notes', (req, res) => {
  const note = req.body;
  res.status(201).json(note);
});

app.listen(5000, ()=> {
    console.log("server running on localhost:5000");
})

