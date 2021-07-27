import { Middleware } from '@decorators/express'
import { autoInjectable } from "tsyringe"
import { INext, IRequest, IResponse } from '../commons/interfaces'
import { UtilService } from '../services'

@autoInjectable()
export class AuthenticationMiddleware implements Middleware {

  constructor(private utilService: UtilService) {}

  public async use(request: IRequest, response: IResponse, next: INext) {
    const headers = request.headers
    if(!headers.authorization) response.status(403).json({ status: false, message: 'Token is missed' })
    else{
      const token = this.getToken(headers.authorization)
      try {
        const decode: any = await this.utilService.verify(token)
        if(typeof decode === 'object'){ 
          request.userId = decode.userId
          next()
        }else response.status(403).json({ status: false, message: decode })
      } catch(e) { response.status(403).json({ status: false, ...e }) }
    }
  }

  private getToken(authorization: string) {
    return (authorization && authorization.split(' ')[0] === 'Bearer') ? authorization.split(' ')[1] : ''
  }
}