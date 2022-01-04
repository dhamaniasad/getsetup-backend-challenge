"use strict";
exports.__esModule = true;
exports.PORT = exports.MONGO_URI = void 0;
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/getsetup-backend';
exports.PORT = Number(process.env.PORT) || 3000;
