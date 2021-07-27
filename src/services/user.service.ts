import { injectable } from "tsyringe"
import { ISignup } from "../commons/IUser"
import { UserModel } from '../models'
import { UtilService } from "./util.service"

@injectable()
export class UserService {

  constructor(private utilService: UtilService){}

  async create({ email, nickname, fullname, password }: ISignup){
    password = await this.utilService.encrypt(password)

    const { _id } = await UserModel.create({ email, nickname, fullname, password })

    return _id
  }

  async authenticate(nick: string, password: string){
    const user = await UserModel.find({ $or: [{ nickname: nick }, { email: nick }] })
    if(!user) throw 'Usuario y Contraseña incorrectos'

    if(!await this.utilService.compare(password, user.password)) throw 'Usuario y/o contraseña incorrectos'

    return await this.utilService.sign({ userId: user._id })
  }
}