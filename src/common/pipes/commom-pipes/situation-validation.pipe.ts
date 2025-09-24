import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SituationValidation implements PipeTransform {
  transform(value: any) {
    if (value.situation) {
      const situation = String(value.situation);
      if (
        situation !== 'empregado' &&
        situation !== 'demitido' &&
        situation !== 'afastado' &&
        situation !== 'sob aviso'
      ) {
        throw new BadRequestException('Formato inválido');
      }
    }

    return value;
  }
}
