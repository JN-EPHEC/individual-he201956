import type { Request, Response, NextFunction } from "express";


export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    // Vérifie que id est entier positif
    if (!Number.isInteger(id)  || id <= 0) {
        return res.status(400).json({message: "ID invalide. L'ID doit être un nombre entier positif."});
    }

    next(); //OK -> on passe au controller
};