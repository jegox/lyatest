import mongoose from 'mongoose'

export default async (fn: Function) => {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_DB
  } = process.env

  const URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`
  try{
    await mongoose.connect(URL, { 
      useNewUrlParser: true ,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      useCreateIndex: true
    })
    fn()
  }catch(e){
    console.log({ e })
    throw `Error Database ${e.message}`
  }
}