import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FindByEmailValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const email = String(value);

    if (metadata.type !== 'param') {
      throw new BadRequestException('metadata type must be "param"');
    }

    if (email.length > 50) {
      throw new BadRequestException('Formato inválido');
    }

    if (
      !email.includes('@mail.com') &&
      !email.includes('@gmail.com') &&
      !email.includes('@outlook.com')
    ) {
      throw new BadRequestException('Formato inválido');
    }

    return value;
  }
}
