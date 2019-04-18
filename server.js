

const app = require('./lib/app');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/Warehouses', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
}); 

app.listen(3355, () => {
  console.log('Connected to 3355');
});
