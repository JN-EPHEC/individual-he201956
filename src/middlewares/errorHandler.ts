import type { Request, Response, NextFunction } from 'express';

export const requestErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Erreur capturée :", err);
    
    res.status(500).json({
        message: "Erreur interne du serveur"
    });
};