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

  @Put('/:id', [AuthenticationMiddleware])
  @Validator('idSchema', 'updateSchema')
  async update(@Params('id') id: string, @Body() body: IUserUpdate, @Response() res: IResponse) {
    try {
      const { nModified, ok } = await this.userService.update(id, body)
      res.json({ 
        status: true, 
        data: !!nModified && !!ok
      })
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
  
  @Delete('/:id', [AuthenticationMiddleware])
  @Validator('idSchema')
  async remove(@Params('id') id: string, @Response() res: IResponse) {
    try {
      const { ok, deletedCount } = await this.userService.destroy(id)
      res.json({ 
        status: true, 
        data: !!ok && !!deletedCount
      });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
  
  @Patch('/:id/active', [AuthenticationMiddleware])
  @Validator('idSchema')
  async active(@Params('id') id: string, @Response() res: IResponse) {
    try {
      const { nModified, ok } = await this.userService.update(id, { active: true })
      res.json({ 
        status: true, 
        data: !!nModified && !!ok
      })
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
  
  @Get('/:id', [AuthenticationMiddleware])
  @Validator('idSchema')
  async getUser(@Params('id') id: string, @Response() res: IResponse) {
    try {
      const data = await this.userService.findUser(id)
      res.json({ status: true, data });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }
}