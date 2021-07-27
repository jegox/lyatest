import { Request, Response, NextFunction } from 'express-serve-static-core'

export interface IRequest extends Request{ }
export interface IResponse extends Response { }
export interface INext extends NextFunction { }

export * from './IUser'