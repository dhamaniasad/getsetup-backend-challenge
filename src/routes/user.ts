import { Request, Response, Router } from 'express';
import { body, validationResult, checkSchema, ValidationSchema } from "express-validator";
import {StatusCodes} from 'http-status-codes';
import User, { IUser } from "../models/User";
import { Error } from "mongoose";
// import {ValidationSchema} from "express-validator";

const router: Router = Router();

const UserRegistrationValidationSchema: ValidationSchema = {
    email: {
        in: ["body"],
        isEmail: {
            errorMessage: "Email invalid",
        }
    },
    password: {
        in: ["body"],
        isString: true,
        isLength: {
            errorMessage: "Password should be at least 8 characters",
            options: { min: 8 }
        }
    }
}

router.post(
    '/register',
    checkSchema(UserRegistrationValidationSchema),
    async (req: Request, res: Response) => {
        const response: { status: number, message: string, data: null | IUser } = { status: 0, message: "", data: null };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const existingUser = await User.findOne({
          email
        });
        if (existingUser) {
            response.status = -1;
            response.message = "User with specified email address already exists";
            res.json(response);
        } else {
            try {
                const newUser = await User.create({
                    email,
                    password
                });
                response.message = "User created successfully!";
                response.data = newUser;
                res.json(response);
            } catch (err) {
                console.error(err);
                response.status = -1;
                response.message = "Error creating new user";
                res.json(response);
            }
        }
});

export default router;
