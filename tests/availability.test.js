const app = require("../dist/src/app").default;
const db = require("./db");
const supertest = require("supertest");
const Availability = require("../dist/src/models/Availability").default;
const User = require("../dist/src/models/User").default;

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

test("GET /api/availability/user/<userId>", async () => {
   const user = await User.create({
      email: "test@example.com",
      password: "password"
   })
   const availability = await Availability.create({
      year: 2022,
      week: 1,
      userId: user._id,
      availability: [[], [], [], [], [], [], []]
   });

   await supertest(app).get(`/api/availability/user/${user._id}`)
       .expect(200)
       .then(response => {
          expect(response.body.status).toEqual(0);
          expect(response.body.data.length).toBe(1);
          expect(response.body.data[0].availability.length).toBe(7);
          expect(response.body.data[0].availability).toEqual([
              [],
              [],
              [],
              [],
              [],
              [],
              []
          ]);
       })
});


test("PUT /api/availability/user/<userId>", async () => {
   const user = await User.create({
      email: "test@example.com",
      password: "password"
   });

   const testData = {
      "year": 2021,
      "week": 3,
      "availability": [
         [],
         ["08:00", "09:00", "10:00", "13:00", "15:00", "18:00"],
         [],
         [],
         [],
         ["08:00", "09:00", "10:00", "13:00", "15:00", "18:00"],
         []
      ]
   };

   await supertest(app).put(`/api/availability/user/${user._id}`)
       .send(testData)
       .expect(200)
       .then(response => {
          expect(response.body.status).toEqual(0);
          expect(response.body.data).toMatchObject(testData);
       })
});

