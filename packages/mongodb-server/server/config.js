const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_database';
const port = process.env.PORT || 9000;

exports.url = url;
exports.port = port;
