import express, { Request, Response, Router } from 'express';

export const router: Router = express.Router();

router.get('/home', (req: Request, res: Response) => {
    logging.log('Incoming /home');
    res.status(200).json({message: "Home"});
});