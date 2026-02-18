import { Router } from "express";
import type { Request, Response } from "express";
import User from "../models/User.js";
import { Op } from "sequelize";

const router = Router();

//récupère tous les users de la DB
router.get("/", async(req: Request, res: Response)=> {
    try {
        const { search } = req.query;
        let users;

        if (search) {
            users = await User.findAll({
                where: {
                    [Op.or]: [
                        { nom: {[Op.like]: `%${search}%`} },
                        { prenom: {[Op.like]: `%${search}%`}}
                    ]
                }
            });
        } else {
            users = await User.findAll();
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur"});
    }

});


/*router.get("/:id", async(req: Request, res: Response) => {
    try {
        const user = await User.findByPk(Number(req.params.id));

        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé"});

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur"});
    }
});*/

//créer un nouvel utilisateur
router.post("/", async(req: Request, res: Response) => {
    try {
        const { nom, prenom } = req.body;
        const newUser = await User.create({ nom, prenom});

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Erreur création utilisateur "});
    }
});



router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(Number(req.params.id));

        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        await user.destroy();

        res.json({ message: "Utilisateur supprimé "});
    } catch (error) {
        res.status(500).json({message: "Erreur suppression" }) ;
    }
});



//modifier un utilisateur
router.put("/:id", async(req: Request, res: Response) => {
    try {
        const { nom, prenom } = req.body;
        const id = Number(req.params.id);


        //validation
        if (!nom || !prenom) {
            return res.status(400).json({ message: "Nom et prénom requis" });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non troué" });
        }

        await user.update({ nom, prenom });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur mise à jour" });
    }
});


export default router;



/* commande pour afficher dans curl :

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