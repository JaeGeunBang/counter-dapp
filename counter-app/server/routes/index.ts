import express, { Request, Response } from 'express';

export const indexRouter = express.Router() ;

indexRouter.get('/', async (req: Request, res: Response) => {
    res.status(200).send(req.cookies)
});
