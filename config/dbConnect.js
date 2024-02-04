const { default: mongoose } = require('mongoose');

const dbConnect = () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB_URL);
    console.log('database connected');
  } catch (error) {
    console.log('database error', error);
    throw (error);
  }
}

module.exports = dbConnect;