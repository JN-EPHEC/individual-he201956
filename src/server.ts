import express from "express";
import type { Request, Response } from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('Bienvenue sur mon serveur API');
});

app.use("/api/users", userRoutes);

/*app.get('/api/data', (req: Request, res: Response) => {
    const etudiants = [
        { id: 1, nom: "Dupont", prenom: "Jean" },
        { id: 2, nom: "Martin", prenom: "Sophie" },
        { id: 3, nom: "Doe", prenom: "John" },
    ];
    res.json(etudiants);
});

app.get('/api/hello/:name', (req: Request<{ name: string }>, res: Response) => {
    const { name } = req.params;

    const now = new Date();

    res.json({
        message: `Bonjour ${name} !`,
        timestamp: now.toISOString()
    });
})*/

app.listen(port, () => {
    console.log((`Serveur lancé sur http://localhost:${port}`))
});

