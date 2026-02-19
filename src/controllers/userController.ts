import type { Request, Response } from "express";
import User from "../models/User";

//GET Users
export const getAllUsers =  async(req: Request, res: Response)=> {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur"});
    }

};

//POST Users
export const postUsers = async(req: Request, res: Response) => {
    try {
        const { nom, prenom } = req.body;
        const newUser = await User.create({ nom, prenom});

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Erreur création utilisateur "});
    }
};


//DELETE Users
export const deleteUsers =  async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(Number(req.params.id));

        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        await user.destroy();

        res.json({ message: "Utilisateur supprimé "});
    } catch (error) {
        res.status(500).json({message: "Erreur suppression" }) ;
    }
};
