const app = require("../dist/src/app").default;
// const mongoose = require("mongoose");
const db = require("./db");
const supertest = require("supertest");
const Availability = require("../dist/src/models/Availability").default;
const User = require("../dist/src/models/User").default;

beforeAll(async () => await db.connect());
afterAll(async () => await db.closeDatabase());

// beforeEach((done) => {
//
// });

// afterEach((done) => {
//    // mongoose.connection.db.dropDatabase(() => {
//    //    mongoose.connection.close(() => done());
//    // });
// });

test("GET /api/availability/user/<userId>", async () => {
   console.log('user: ', User);
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
          console.log(response.body);
          expect(response.body.status).toEqual(0);
       })
});


