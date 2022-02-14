import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform, ValidationError } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToInstance(metadata.metatype, value)
        const errors = await validate(obj)

        if (errors.length) {
            throw new HttpException(this.formatErrors(errors), HttpStatus.BAD_REQUEST)
        }
        return value
    }
    
    private formatErrors = (errors: ValidationError[]): string[] => {
        const messages = errors.map(error => {
            return `${error.property} - ${Object.values(error.constraints).join(', ')}`
        })
        return messages
    }
}