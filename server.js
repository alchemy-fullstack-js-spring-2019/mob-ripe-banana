require('dotenv').config();
const app = require('./lib/app');
const connect = require('./lib/utils/connect');

connect();

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}.`);
});
