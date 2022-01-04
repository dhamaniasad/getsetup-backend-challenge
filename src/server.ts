import {PORT} from "../config";
import app from "./app";
import connectDB from "../config/database";

connectDB();

app.listen(PORT, () => {
    console.log(`The application is running on port ${PORT}`);
});
