import express from "express";
import type { Request, Response } from "express";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/database.js";
import "./models/User.js";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());

const publicPath = path.resolve("./public");
app.use(express.static(publicPath));


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

(async () => {
    try {
        await sequelize.sync({ alter: true }); //mettre force:true pour supprimer les DB à chaque fois qu'on démarre le serveur
        console.log("Base de données SQLite synchronisée");


        app.listen(port, () => {
            console.log((`Serveur lancé sur http://localhost:${port}`))
        });
    } catch (error) {
        console.error("Erreur lors de la synchronisation de la DB", error);

    }
})();

