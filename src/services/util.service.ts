import { injectable } from "tsyringe"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import redis from 'redis'
import JWTR from 'jwt-redis'

const client = redis.createClient()
const jwtr = new JWTR(client)

@injectable()
export class UtilService {
  constructor(){}

  async sign(data: any, expire?: string) {
    return await jwtr.sign(data, process.env.PRIVATE_KEY || 'S3cr3t4U@', { expiresIn: expire || '30d' })
  }

  async verify(token: any) {
    return await jwtr.verify(token, process.env.PRIVATE_KEY || 'S3cr3t4U@')
  }

  async destroy(token: string) {
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