import { Request, Response, Router } from 'express';
import User from "../models/User";

const router: Router = Router();

router.get('/user/:userId', async (req: Request, res: Response) => {
  res.json([
    {
      userId: req.params.userId,
      weekNumber: 1,
      availability: [[], [], [], [], [], [], ['08:00', '09:00', '10:00', '13:00', '15:00', '18:00']],
    },
    {
      userId: req.params.userId,
      weekNumber: 2,
      availability: true,
    },
    {
      userId: req.params.userId,
      weekNumber: 3,
      availability: false,
    },
  ]);
});

router.get('/test', async (req: Request, res: Response) => {
  const user = await User.findOne();
  res.json(user);
});

router.put('/user/:userId', async (req: Request, res: Response) => {
  const { userId } = req.body;
  const user = await User.findOne({ _id: userId });
  res.json(user);
});

export default router;
