import mongoose from 'mongoose'

export default async (fn: Function) => {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env

  const URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME || '127.0.0.1'}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
  try{
    await mongoose.connect(URL, { 
      useNewUrlParser: true ,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    fn()
  }catch(e){
    console.log({ e })
    throw `Error Database ${e.message}`
  }
}