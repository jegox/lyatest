import dotenv from 'dotenv'
import Server from './config/server'

dotenv.config({path: process.cwd()+"/.env"})

const server = new Server()
server.listen()