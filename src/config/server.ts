import express, { Application, Router } from "express";
import { attachControllers } from '@decorators/express';
import glob from 'glob';
import morgan from 'morgan';
import cors from 'cors';
import Database from './database'

class Server {
  private app: Application;
  private port: string;
  private router: Router;

  constructor(){
    this.app = express()
    this.port = process.env.PORT || '3000'
    this.router = Router()

    this.middlewares()
    this.routes()
  }

  async listen(){
    this.app.listen(this.port, () => console.log(`Server HTTP running in port ${this.port}`))
    await Database(() => console.log('MongoDB server is running in port 27017'))
  }

  async routes(){
    const files = glob.sync('./src/routes/*.ts')
    const routers: any = files.map(async file => {
      const filename = file.split('/')[3].replace('.ts', '')
      return (await import(`../routes/${filename}`)).default
    })

    attachControllers(this.router, await Promise.all(routers))
    this.app.use('/api', this.router)

    this.app.use('*', (req, res) => res.status(404).json({ status: false, message: `Route ${req.originalUrl} is not found` }))
    
    this.app.use((err: any, req: any, res: any, next: any) => {
      console.error({err});
      res.status(500).json({ status: false, message: err });
    })
  }

  middlewares(){
    const whitelist = ['http://localhost:3000']
    const corsOptions: any = { origin: whitelist }
    this.app.use(cors(corsOptions))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
  }
}

export default Server;