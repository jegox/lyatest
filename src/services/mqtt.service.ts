import { injectable } from "tsyringe"
import mqtt from 'async-mqtt'

// const client = mqtt.connect('mqtt://mqtt.lyaelectronic.com:4010')

@injectable()
export class MQTTService {

  constructor(){}

  async publish(message: any){
    try {
      const client = mqtt.connect("mqtt://broker.emqx.io:1883")
      await client.publish('testtopic/jeferson', JSON.stringify(message))
      await client.end()
    } catch (error){
      return error
    }
  }
}