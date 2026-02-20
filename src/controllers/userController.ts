import type { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { Op } from "sequelize";

//GET Users
export const getAllUsers =  async(req: Request, res: Response, next: NextFunction) => {
    try {
        const search = req.query.search as string;

        const whereClause = search
            ? {
                [Op.or]: [
                    { nom: { [Op.like]: `%${search}%` } },
                    { prenom: { [Op.like]: `%${search}%` } }
                ]
            }
            : {};

        const users = await User.findAll( { where: whereClause });
        
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



//PUT Users
 export const putUsers = async(req: Request, res: Response, next: NextFunction) => {
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
        next(error);
    }
};