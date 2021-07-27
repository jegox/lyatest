import * as DTOSchemas from '../dto'

const types = ['string', 'boolean', 'number']
export function Validator(...params: any){

  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any) {
      const schemas: any = DTOSchemas
      const parameters = args.slice(0, params.length)
      try {
        for(let i = 0; i < parameters.length; i++)
          await schemas[params[i]].validate(parameters[i])

        const result = originalMethod.apply(this, args)
        return result
      } catch (err) {
        throw err.errors
      }
    };
  
    return descriptor
  }
}