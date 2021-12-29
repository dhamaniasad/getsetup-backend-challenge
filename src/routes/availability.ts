import {Request, Response, Router} from 'express';
import User from "../models/User";
import Availability, {IAvailability} from "../models/Availability";
import {check, validationResult} from "express-validator";
import {StatusCodes} from "http-status-codes";

const router: Router = Router();

router.get('/user/:userId', async (req: Request, res: Response) => {
    const response: { status: number, message: string, data: null | any } = {status: 0, message: '', data: null};

    const {userId} = req.params;
    const user = await User.findOne({_id: userId});

    if (!user) {
        response.status = -1;
        response.message = "No such user";
        return res.json(response);
    }

    const availabilityData = await Availability.find({userId}).sort({week: 'asc'}).exec();

    response.data = availabilityData.map(av => ({week: av.week, year: av.year, availability: av.availability}))
    res.json(response);
});

router.put('/user/:userId',
    check('week').isInt({min: 1, max: 52}).withMessage("Week should be between 1 and 52"),
    check('availability').custom((value) => {
       if (value.length !== 7) {
           throw new Error("availability field should be an array of length 7 (for 7 days).")
       }
       return true
    }),
    async (req: Request, res: Response) => {
        const response: { status: number, message: string, data: null | any, errors: any[] | undefined } = {
            status: 0,
            message: '',
            data: null,
            errors: []
        };

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            response.errors = errors.array();
            return res.status(StatusCodes.BAD_REQUEST).json(response);
        }
        const {week, availability, year} = req.body;
        const {userId} = req.params;
        const user = await User.findOne({_id: userId});

        if (!user) {
            response.status = -1;
            response.message = "No such user";
            return res.json(response);
        }

        const currentTimeHours = new Date().getHours();

        // Limit submissions to be between 7AM and 10PM
        if (currentTimeHours >= 7 && currentTimeHours <= 22) {
            let availabilityData = await Availability.findOne({userId, week, year});

            if (availabilityData) {
                availabilityData.availability = availability;
                await availabilityData.save();
            } else {
                availabilityData = await Availability.create({
                    userId,
                    week,
                    year,
                    availability
                })
            }

            response.data = availabilityData;

            res.json(response);
        } else {
            response.status = -1;
            response.message = "Availability can only be submitted between 7AM to 10PM. Please try again later."
            res.json(response)
        }

    });

export default router;
