import { Request, Response, Router } from 'express';
const { body, validationResult } = require('express-validator');
import User from "../models/User";

const router: Router = Router();

router.post(
    '/register',
    body('username').isAlphanumeric().exists(),
    async (req: Request, res: Response) => {

});

export default router;
