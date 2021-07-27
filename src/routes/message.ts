import { autoInjectable } from "tsyringe"
import { Response, Controller, Post, Body, Delete } from '@decorators/express'

import { IResponse } from '../commons/interfaces'
import { AuthenticationMiddleware } from '../middlewares'

@Controller('/messages', [AuthenticationMiddleware])
@autoInjectable()
export default class Message {

  constructor() {}

  @Post('/send')
  async pub(@Body() body: any, @Response() res: IResponse) {
    try {
      const data: any = []
      res.json({ status: true, data });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
}