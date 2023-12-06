const { connect, connection } = require('mongoose');
require("dotenv").config();

const connectionString = process.env.MONGODB_URI || process.env.DB_NAME;

connect(connectionString);

module.exports = connection;