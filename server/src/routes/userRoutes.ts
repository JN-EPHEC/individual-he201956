import { Router } from "express";
import type { Request, Response } from "express";
import User from "../models/User.js";
import * as userController from "../controllers/userController";
import { checkIdParam } from "../middlewares/checkIdParam";

const router = Router();


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à récupérer
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: ID invalide (non entier ou <= 0)
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:id", checkIdParam, userController.getUserById);

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Récupère la liste de tout les utilisateurs
 *      tags: [Users]
 *      parameters:
  *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *              type: string
 *         description: Mot-clé pour rechercher par nom ou prénom
 *      responses:
 *          200:
 *              description: Liste des utilisateurs récupérée avec succès
 *          500:
 *              description: Erreur interne du serveur
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
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nom:
 *                              type: string
 *                          prenom:
 *                              type: string
 *      responses:
 *          201:
 *              description: Utilisateur créé avec succès
 *          400:
 *              description: Données invalide
 *          500:
 *              description: Erreur interne du serveur
 *      
 */
router.post("/", userController.postUsers);



/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: supprime un utilisateur
 *      tags: [Users]
 *      parameters:
  *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *              type: integer
 *         description: ID de l'utilisateur
 *      responses:
 *          200:
 *              description: Utilisateur supprimé avec succès
 *          400:
 *              description: ID invalide
 *          404:
 *              description: Utilisateur non trouvé
 *          500:
 *              description: Erreur interne du serveur
 */
router.delete("/:id", checkIdParam, userController.deleteUsers);




/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      summary: modifie un utilisateur
 *      tags: [Users]
 *      parameters:
  *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *              type: integer
 *         description: ID de l'utilisateur
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nom:
 *                              type: string
 *                          prenom:
 *                              type: string
 *      responses:
 *          200:
 *              description: Utilisateur mis à jour avec succès
 *          400:
 *              description: Données invalides ou ID invalide
 *          404:
 *              description: Utilisateur non trouvé
 *          500:
 *              description: Erreur interne du serveur
 */
router.put("/:id", checkIdParam, userController.putUsers);


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