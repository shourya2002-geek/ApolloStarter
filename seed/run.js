if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const db = require('../config/db');
const User = require('../src/user/user-model');
const userData = require('./data/users');

// Clean up database.
const cleanup = async () => {
  console.log('Removing old data');
  await Promise.all([User.deleteMany({})]);
};

// Create records.
const create = async () => {
  console.log('Creating users...');
  await User.create(userData);
};

// Run seeds.
(async function run() {
  try {
    await cleanup();
    await create();
    db.disconnect();
  } catch (e) {
    console.log('ERROR: ', e);
  } finally {
    console.log('Done');
  }
})();