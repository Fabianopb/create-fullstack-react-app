const mongoose = require('mongoose');
const app = require('./app');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_database';
const port = process.env.PORT || 9000;

(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();
