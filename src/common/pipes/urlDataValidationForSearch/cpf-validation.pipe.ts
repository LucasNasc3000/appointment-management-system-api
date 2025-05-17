import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FindByCpfValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const cpf = String(value);

    if (metadata.type !== 'param') {
      throw new BadRequestException('metadata type must be "param"');
    }

    if (cpf.length < 14 || cpf.length > 14) {
      throw new BadRequestException('Formato inválido');
    }

    if (!cpf.includes('-') && !cpf.includes('.')) {
      throw new BadRequestException('Formato inválido');
    }

    return value;
  }
}
