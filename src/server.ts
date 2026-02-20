import express from "express";
import type { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import sequelize from "./config/database";
import "./models/User";
import path from "path";
import { requestLogger } from "./middlewares/logger";
import { requestErrorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();
const port = 3000;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use(requestLogger);

const publicPath = path.resolve("./public");
app.use(express.static(publicPath));


app.get('/', (req: Request, res: Response) => {
    res.send('Bienvenue sur mon serveur API');
});

app.use("/api/users", userRoutes);


app.use((req, res, next) => {
    const error: any = new Error(`Route ${req.originalUrl} non trouvée`);
    error.status = 404;
    next(error);
});
app.use(requestErrorHandler);

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



