import * as mongoose from 'mongoose'
import User from './user'

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('链接成功')
});

export {
  User
}
