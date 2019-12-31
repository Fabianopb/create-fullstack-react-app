const mongoose = require('mongoose');
const chalk = require('chalk');
const Item = require('../server/items/item.model');
const User = require('../server/users/user.model');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_database';

(async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    const users = await User.find({});
    const items = await Item.find({});
    if (users.length === 0 && items.length === 0) {
      console.log(chalk.yellow('No users or items in the database, creating sample data...'));
      const user = new User({ name: 'John Doe', age: 34 });
      await user.save();
      console.log(chalk.green('Sample user successfuly created!'));
      const newItems = [
        { name: 'Paper clip', value: 0.1 },
        { name: 'Colorful pen', value: 1.2 },
        { name: 'Notebook', value: 2.5 },
        { name: 'Soft eraser', value: 0.5 },
        { name: 'Table lamp', value: 5.1 },
      ];
      await Item.insertMany(newItems);
      console.log(chalk.green(`${newItems.length} item(s) successfuly created!`));
    } else {
      console.log(chalk.yellow('Database already initiated, skipping populating script'));
    }
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    await mongoose.disconnect();
  }
})();
