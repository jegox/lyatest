import { autoInjectable } from "tsyringe"
import { Response, Controller, Post, Request } from '@decorators/express'

import { IRequest, IResponse } from '../commons/interfaces'
import { AuthenticationMiddleware } from '../middlewares'
import { FactService, MQTTService} from "../services"

@Controller('/messages', [AuthenticationMiddleware])
@autoInjectable()
export default class Message {

  constructor(
    private factService: FactService,
    private mqttService: MQTTService
  ) {}

  @Post('/send')
  async pub(@Request() req: IRequest, @Response() res: IResponse) {
    try {
      const message = await this.factService.getFact()
      await this.mqttService.publish({ message, user_id: req.userId })
      res.json({ status: true, data: { message, user_id: req.userId } });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
}