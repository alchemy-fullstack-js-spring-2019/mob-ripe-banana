require('dotenv').config();
const app = require('./lib/app');


const PORT = process.env.PORT || 6666;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

