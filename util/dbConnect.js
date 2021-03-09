import mongoose from 'mongoose'

let MONGODB_URI = process.env.LOCAL_MONGOOSE_URI;
if (process.env.NODE_ENV === 'production') {
  MONGODB_URI = process.env.ATLAS_MONGOOSE_URI;
}

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return
  }

  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
}

export default dbConnect