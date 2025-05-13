import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FindByPhoneNumberValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const phoneNumber = String(value);

    if (metadata.type !== 'param') {
      throw new BadRequestException('metadata type must be "param"');
    }

    if (phoneNumber.length < 15 || phoneNumber.length > 15) {
      throw new BadRequestException('Formato inválido');
    }

    if (
      !phoneNumber.includes('(') &&
      !phoneNumber.includes(')') &&
      !phoneNumber.includes(' ')
    ) {
      throw new BadRequestException('Formato inválido');
    }

    return value;
  }
}
