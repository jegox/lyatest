import { autoInjectable } from "tsyringe"
import { Response, Controller, Post, Body, Delete, Headers } from '@decorators/express'

import { ILogin, IResponse } from '../commons/interfaces'
import { AuthenticationMiddleware } from '../middlewares'
import { Validator } from "../commons/validator"
import { UserService, UtilService } from "../services"

@Controller('/authorization')
@autoInjectable()
export default class Authorization {

  constructor(
    private userService: UserService,
    private utilService: UtilService
  ) {}

  @Post('/')
  @Validator('loginSchema')
  async login(@Body() body: ILogin, @Response() res: IResponse) {
    try {
      const data: any = await this.userService.authenticate(body)
      res.json({ status: true, data });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
  
  @Delete('/', [AuthenticationMiddleware])
  async logout(@Headers('authorization') authorization: string, @Response() res: IResponse) {
    try {
      const data: any = await this.utilService.destroy(authorization.split(' ')[1])
      res.json({ status: true, data });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
}