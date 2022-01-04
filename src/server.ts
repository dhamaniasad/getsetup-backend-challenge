import {PORT} from "../config";
import app from "./app";
import connectDB from "../config/database";

console.log("process.env: ", process.env.NODE_ENV);
connectDB();

app.listen(PORT, () => {
    console.log(`The application is running on port ${PORT}`);
});

// // To make sure the PORT is released when Nodemon restarts the server
// // https://stackoverflow.com/questions/61181302/nodemon-error-listen-eaddrinuse-address-already-in-use-5000
// process.once('SIGUSR2', function () {
//     process.kill(process.pid, 'SIGUSR2');
// });
//
// process.on('SIGINT', function () {
//     // this is only called on ctrl+c, not restart
//     process.kill(process.pid, 'SIGINT');
// });
