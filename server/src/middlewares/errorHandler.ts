import type { Request, Response, NextFunction } from 'express';

export const requestErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Erreur capturée :", err);

    const statusCode = err.status || 500;
    
    res.status(statusCode).json({
        success: false,
        message: statusCode === 500
            ? "Erreur interne du serveur"
            : err.message
    });
};