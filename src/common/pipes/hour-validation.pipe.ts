import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { hourRegex } from '../constants/hour-regex';

@Injectable()
export class ParseToHourPipe implements PipeTransform {
  // Ver como validar url de updates
  transform(value: any) {
    const { workday_begin } = value;
    const { workday_end } = value;
    const { hour_to } = value;
    const { hour_from } = value;

    if (workday_begin && workday_end) {
      if (!hourRegex.test(workday_begin) || !hourRegex.test(workday_end)) {
        throw new BadRequestException(
          'horas em "inicio da jornada de trabalho" e "fim da jornada de trabalho" precisam estar no formato HH:MM:SS',
        );
      }
    }

    if (hour_to && hour_from) {
      if (!hourRegex.test(hour_to) || !hourRegex.test(hour_from)) {
        throw new BadRequestException(
          'horas em "desde" e "até" precisam estar no formato HH:MM:SS',
        );
      }
    }

    return value;
  }
}
