const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

(async () => {
  await mongoose.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(config.port);
  console.log(`App listening on port ${config.port}...`);
})();
