import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Error handling middleware (must be after all routes)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(5000, ()=> {
    console.log("server running on localhost:5000");
});

