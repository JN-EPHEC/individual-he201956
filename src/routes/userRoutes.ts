import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response)=> {
    const users = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob"},
    ];

    res.json(users);

});

export default router;