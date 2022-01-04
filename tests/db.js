const mongoose = require("mongoose");

module.exports.connect = async () => {
    const uri = "mongodb://localhost:27017/getsetup-backend-tests";
    const mongooseOpts = {
        autoCreate: true,
        serverSelectionTimeoutMS: 1000,
    };
    await mongoose.connect(uri, mongooseOpts);
}

module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}
