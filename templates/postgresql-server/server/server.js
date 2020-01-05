import db from './models';
import app from './app';

const PORT = process.env.PORT || 9000;
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`App is up and running. Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
