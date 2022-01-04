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

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}
