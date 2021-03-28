const { MongoClient } = require('mongodb');

let _db;

const mongoconnect = (callback) => {
  const url = 'mongodb://127.0.0.1:27017';
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err, client) => {
    if (err) {
      return console.log(err);
    }
    // console.log(client)
    // Specify database you want to access
    _db = client.db('shop');
    callback();
    console.log(`MongoDB Connected: ${url}`);
  });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'not connected yet'
};

exports.mongoconnect = mongoconnect;
exports.getDb = getDb;
