import { Request, Response, Router } from 'express';
import {
  body, validationResult, checkSchema, Schema,
} from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Error } from 'mongoose';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';

const router: Router = Router();

const UserRegistrationValidationSchema: Schema = {
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Email invalid',
    },
  },
  password: {
    in: ['body'],
    isString: true,
    isLength: {
      errorMessage: 'Password should be at least 8 characters',
      options: { min: 8 },
    },
  },
};

const UserLoginValidationSchema: Schema = {
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Email invalid',
    },
  },
  password: {
    in: ['body'],
    isString: true,
    isLength: {
      errorMessage: 'Password should be at least 8 characters',
      options: { min: 8 },
    },
  },
};

router.post(
  '/register',
  checkSchema(UserRegistrationValidationSchema),
  async (req: Request, res: Response) => {
    const response: { status: number, message: string, data: null | IUser } = { status: 0, message: '', data: null };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      response.status = -1;
      response.message = 'User with specified email address already exists';
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const newUser = await User.create({
          email,
          password: hashed,
        });
        response.message = 'User created successfully!';
        response.data = newUser;
      } catch (err) {
        console.error(err);
        response.status = -1;
        response.message = 'Error creating new user';
      }
    }
    res.json(response);
  },
);

router.post(
  '/login',
  checkSchema(UserRegistrationValidationSchema),
  async (req: Request, res: Response) => {
    const response: { status: number, message: string, data: null | IUser } = { status: 0, message: '', data: null };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    if (!existingUser) {
      response.status = -1;
      response.message = 'User with specified email address does not exist';
    } else {
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        response.status = -1;
        response.message = 'Invalid password';
        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }
      response.message = 'Logged in successfully!';
      response.data = existingUser;
      res.json(response);
    }
    res.json(response);
  },
);

export default router;
