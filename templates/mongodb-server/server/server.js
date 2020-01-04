import { connect } from 'mongoose';
import app from './app';
import { port, url } from './config';

(async () => {
  await connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();
