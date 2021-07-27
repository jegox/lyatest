import { autoInjectable } from "tsyringe"
import { Response, Controller, Get, Post, Body, Params, Put, Delete, Patch } from '@decorators/express'

import { IResponse, ISignup, IUserUpdate } from '../commons/interfaces'
import { Validator } from '../commons/validator'
import { AuthenticationMiddleware } from '../middlewares'
import { UserService } from "../services"

@Controller('/users')
@autoInjectable()
export default class User {

  constructor(
    private userService: UserService
  ) {}

  @Post('/')
  @Validator('signupSchema')
  async signup(@Body() body: ISignup, @Response() res: IResponse) {
    try {
      const data: any = await this.userService.create(body)
      res.json({ status: true, data });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }

  @Put('/:id')
  @Validator('idSchema', 'updateSchema')
  async update(@Params('id') id: string, @Body() body: IUserUpdate, @Response() res: IResponse) {
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