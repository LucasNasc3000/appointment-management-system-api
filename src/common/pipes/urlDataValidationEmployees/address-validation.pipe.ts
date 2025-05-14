import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FindByAddressValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const address = String(value);

    if (metadata.type !== 'param') {
      throw new BadRequestException('metadata type must be "param"');
    }

    if (address.length > 100) {
      throw new BadRequestException('Formato inválido');
    }

    return value;
  }
}
