import * as DTOSchemas from '../dto'

export function Validator(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value

  descriptor.value = async function (...args: any) {
    const schemas: any = DTOSchemas
    try {
      await schemas[propertyKey+'Schema'].validate(args[0])
      const result = originalMethod.apply(this, args)
      return result
    } catch (err) {
      throw err.errors
    }
  };

  return descriptor
}