import { injectable } from "tsyringe"
import Axios from 'axios'

@injectable()
export class FactService {

  constructor(){}

  async getFact(){
    try {
      const { data } = await Axios.get('https://catfact.ninja/fact')
      return data.fact
    } catch (error) {
      throw error
    }
  }
}