import { Router } from "express";
import type { Request, Response } from "express";
import User from "../models/User.js";
import * as userController from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Récupère la liste des utilisateurs
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Succès
 */
router.get("/", userController.getAllUsers);

/*router.get("/:id", async(req: Request, res: Response) => {
    try {
        const user = await User.findByPk(Number(req.params.id));

        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé"});

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur"});
    }
});*/


/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: crée un nouvel utilisateur
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Succès
 */
router.post("/", userController.postUsers);



/**
 * @swagger
 * /api/users:
 *  delete:
 *      summary: supprime un utilisateur
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Succès
 */
router.delete("/:id", userController.deleteUsers);




/**
 * @swagger
 * /api/users:
 *  put:
 *      summary: modifie un utilisateur
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Succès
 */
router.put("/:id", userController.putUsers);


export default router;



/* commande pour afficher dans terminal :

POST :

Invoke-RestMethod -Uri "http://localhost:3000/api/users" `
    -Method POST `
    -Body '{"nom":"Bond","prenom":"James"}' `
    -ContentType "application/json"

GET :

Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method GET

DELETE

Invoke-RestMethod -Uri "http://localhost:3000/api/users/1" -Method DELETE

*/