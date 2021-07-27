import { Types } from "mongoose"
import { injectable } from "tsyringe"
import { ILogin, ISignup, IUserActive, IUserUpdate } from "../commons/IUser"
import { UserModel } from '../models'
import { UtilService } from "./util.service"

@injectable()
export class UserService {

  constructor(private utilService: UtilService){}

  async create({ email, nickname, fullname, password }: ISignup){
    try {
      password = await this.utilService.encrypt(password)
      const { _id } = await UserModel.create({ email, nickname, fullname, password })
  
      return { id: _id }
    } catch (error) {
      return error
    }
  }

  async authenticate({ email, password }: ILogin){
    try {
      const user = await UserModel.findOne({ email })
      if(!user) throw 'Usuario y Contraseña incorrectos'
  
      if(!await this.utilService.compare(password, user.password)) throw 'Usuario y/o contraseña incorrectos'
  
      return await this.utilService.sign({ userId: user._id })
    } catch (error) {
      return error
    }
  }

  async update(id: string, fields: IUserUpdate | IUserActive) {
    try {
      return await UserModel.updateOne({ _id: Types.ObjectId(id) }, { $set: fields })
    } catch (error) {
      return error
    }
  }

  async destroy(id: string) {
    try {
      return await UserModel.deleteOne({ _id: Types.ObjectId(id) })
    } catch (error) {
      return error
    }
  }

  async findUser(id: string) {
    try {
      return await UserModel.findOne({ _id: Types.ObjectId(id), active: true }, { password: 0 })
    } catch (error) {
      return error
    }
  }
}