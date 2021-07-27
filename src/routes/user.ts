import { autoInjectable } from "tsyringe"
import { Response, Controller, Get, Post, Body, Params, Put, Delete, Patch } from '@decorators/express'

import { IResponse } from '../commons/interfaces'
import { AuthenticationMiddleware } from '../middlewares'

@Controller('/users')
@autoInjectable()
export default class User {

  constructor(
  ) {}

  @Post('/')
  async signup(@Response() res: IResponse, @Body() body: any) {
    try {
      const data: any = []
      res.json({ status: true, data });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }

  @Put('/:id', [AuthenticationMiddleware])
  async update(@Response() res: IResponse, @Params('id') id: string) {
    try {
      const data: any = [id]
      res.json({ status: true, data });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
  
  @Delete('/:id', [AuthenticationMiddleware])
  async remove(@Response() res: IResponse, @Params('id') id: string) {
    try {
      const data: any = [id]
      res.json({ status: true, data });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
  
  @Patch('/:id/active', [AuthenticationMiddleware])
  async active(@Response() res: IResponse, @Params('id') id: string) {
    try {
      const data: any = [id]
      res.json({ status: true, data });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
  
  @Get('/:id', [AuthenticationMiddleware])
  async getUser(@Response() res: IResponse, @Params('id') id: string) {
    try {
      const data: any = [id]
      res.json({ status: true, data });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
}