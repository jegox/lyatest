import { injectable } from "tsyringe"
// import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import redis from 'redis'
import JWTR from 'jwt-redis'

const client = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: parseInt(process.env.REDIS_PORT || '0'),
  password: process.env.REDIS_PASSWORD
})
const jwtr = new JWTR(client)
const blackList: Array<string> = []

@injectable()
export class UtilService {

  
  constructor(){}

  async sign(data: any, expire?: string) {
    return await jwtr.sign(data, process.env.PRIVATE_KEY || 'S3cr3t4U@', { expiresIn: expire || '30d' })
  }

  async verify(token: any) {
    if(blackList.includes(token)) throw 'Token expired'
    return await jwtr.verify(token, process.env.PRIVATE_KEY || 'S3cr3t4U@')
  }

  async destroy(token: string) {
    blackList.push(token)
    return await jwtr.destroy(token)
  }

  async compare(pass: string, hash: string){
    try{
      return await bcrypt.compare(pass, hash)
    }catch(e){
      throw `Error al validar el password ${e.message}`
    }
  }

  async encrypt(pass: any) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hashSync(pass, salt)
  }
}