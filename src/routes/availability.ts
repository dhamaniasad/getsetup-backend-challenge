import { Request, Response, Router } from 'express';
import User, {IUser} from "../models/User";
import Availability, {IAvailability} from "../models/Availability";

const router: Router = Router();

router.get('/user/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  const availabilityData = await Availability.find({ userId }).sort({ week: 'asc' }).exec();

  console.log(availabilityData);
  const responseData = availabilityData.map(av => ({ week: av.week, year: av.year, availability: av.availability }))
  res.json(responseData);
});

router.put('/user/:userId', async (req: Request, res: Response) => {
  const { week, availability, year } = req.body;
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  const response: { status: number, message: string, data: null | IAvailability } = { status: 0, message: '', data: null };

  const currentTimeHours = new Date().getHours();

  if (currentTimeHours >= 7 && currentTimeHours <= 22) {
    let availabilityData = await Availability.findOne({ userId, week, year });

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
    res.json(response )
  }

});

export default router;
