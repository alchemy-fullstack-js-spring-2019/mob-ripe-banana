const mongoose = require('mongoose');
const { parse } = require('url');

const mongooseEvent = (event, dbUri) => {
  mongoose.connection.on(event, () => {
    console.log(`connection to MongoDB ${event} at ${dbUri}`);
  });
};
const redact = dbUri => {
  const parsedDbUri = parse(dbUri);
  const authPart = parsedDbUri.auth ? '***:***@' : '';

  return `${parsedDbUri.protocol}//${authPart}${parsedDbUri.hostname}:${parsedDbUri.port}${parsedDbUri.pathname}`;
};

module.exports = (dbUri = process.env.MONGODB_URI) => {
  const redactedDbUri = redact(dbUri);
  ['open', 'error', 'disconnected', 'reconnected'].forEach(event => mongooseEvent(event, redactedDbUri));

  return mongoose.connect(dbUri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
  });
};
