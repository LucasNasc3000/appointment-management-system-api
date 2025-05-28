import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FindByCrmValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const crm = String(value);

    if (metadata.type !== 'param') {
      throw new BadRequestException('metadata type must be "param"');
    }

    if (crm.length < 13 || crm.length > 13) {
      throw new BadRequestException('Formato inválido');
    }

    if (crm[3] !== '-' || crm[6] !== ' ') {
      throw new BadRequestException('Formato inválido');
    }

    const correctFormat = crm.replace('-', '/');

    value = correctFormat;

    return value;
  }
}
