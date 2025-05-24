import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { hourRegex } from '../constants/hour-regex';

@Injectable()
export class ParseToHourPipeUpdate implements PipeTransform {
  transform(value: any) {
    const hourFields = ['workday_begin', 'workday_end', 'hour_from', 'hour_to'];
    const uuidCheck =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (typeof value === 'string') {
      if (!uuidCheck.test(value)) {
        throw new BadRequestException('Formato inválido na url');
      }
    }

    if (typeof value === 'object') {
      hourFields.forEach((element) => {
        if (!Object.keys(value).includes(element)) return value;

        const test = hourRegex.test(value[element]);
        if (!test) {
          throw new BadRequestException(
            'Formato inválido para os campos de horas. Use HH:MM:SS',
          );
        }
      });
    }

    return value;
  }
}
