import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { hourRegex } from '../constants/hour-regex';

@Injectable()
export class ParseToHourPipe implements PipeTransform {
  // Ver como validar url de updates
  transform(value: any) {
    const { workday_begin, workday_end, hour_from, hour_to } = value;

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
