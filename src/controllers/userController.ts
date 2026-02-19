import type { NextFunction, Request, Response } from "express";
import User from "../models/User";

//GET Users
export const getAllUsers =  async(req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }

};

//POST Users
export const postUsers = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { nom, prenom } = req.body;
        const newUser = await User.create({ nom, prenom});

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};


//DELETE Users
export const deleteUsers =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByPk(Number(req.params.id));

        if (!user) return next(new Error("Utilisateur non trouvé" ));

        await user.destroy();

        res.json({ message: "Utilisateur supprimé "});
    } catch (error) {
        next(error);
    }
};
