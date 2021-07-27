import { injectable } from "tsyringe"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

@injectable()
export class UtilService {
  constructor(){}

  async sign(data: any, expire?: string) {
    return new Promise((resolve, reject) => {
      jwt.sign(data, process.env.PRIVATE_KEY || 'S3cr3t4U@', { expiresIn: expire || '30d' }, (err, token) => {
        if(!err) resolve(token)
        else reject(err)
      })
    })
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

  async verify(token: any) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.PRIVATE_KEY || 'S3cr3t4U@', (err: any, decode: any) => {
        if(!err) resolve(decode)
        else reject(err)
      })
    })
  }
}