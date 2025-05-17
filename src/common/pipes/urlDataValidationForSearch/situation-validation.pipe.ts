import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FindBySituationValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const situation = String(value.value);

    if (metadata.type !== 'query') {
      throw new BadRequestException('metadata type must be "query"');
    }

    if (
      situation !== 'empregado' &&
      situation !== 'demitido' &&
      situation !== 'afastado' &&
      situation !== 'sob aviso'
    ) {
      throw new BadRequestException('Formato inválido');
    }

    return value;
  }
}
