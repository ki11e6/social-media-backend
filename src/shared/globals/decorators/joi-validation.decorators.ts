/* eslint-disable @typescript-eslint/no-explicit-any */
import { JoiRequestValidationError } from '@global/helpers/error-handler';
import { Request } from 'express';
import { ObjectSchema } from 'joi';

//decorator type
type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;

//decorator factory function
export function joiValidation(schema: ObjectSchema): IJoiDecorator {
  //property descriptor is an object that provides information about a property of an object
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    //passing (req,res,next)
    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      //validate using joi and store error if any in error
      const { error } = await Promise.resolve(schema.validate(req.body));
      if (error?.details) {
        throw new JoiRequestValidationError(error.details[0].message);
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
