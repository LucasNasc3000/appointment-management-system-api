import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { hourRegex } from '../constants/hour-regex';

@Injectable()
export class ParseToHourPipeUpdate implements PipeTransform {
  transform(value: any) {
    const hourFields = ['workday_begin', 'workday_end', 'hour_from', 'hour_to'];

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
